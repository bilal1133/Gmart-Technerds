import Products from "../../../../models/Products";
import CategoriesModel from "../../../../models/Categories";
import {In} from 'typeorm';
import CouponModel from "../../../../models/Coupon";
import Comments from "../../../../models/Comments";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const id_shop = post['id_shop'];
        const id_category = post['id_category'];
        const id_brand = post['id_brand'];
        const limit = post['limit'];
        const offset = post['offset'];
        const type = post['type'];
        const order = post['order'];
        const data = [];
        var categoryArray = [];

        const categoryModel = new CategoriesModel();
        if (id_category == -1) {
            var categories = await categoryModel.getCategoriesByParams({
                where: {
                    parent: -1,
                    shop: {
                        id: id_shop
                    }
                },
                relations: ["lang"]
            }) as any[];

            for (let i = 0; i < categories.length; i++) {
                let categoriesSub = await categoryModel.getCategoriesByParams({
                    where: {
                        parent: categories[i]["id"],
                    }
                }) as any[];

                categoryArray = [];

                for (let m = 0; m < categoriesSub.length; m++) {
                    categoryArray.push(categoriesSub[m]["id"]);
                }

                let products = await getProducts(id_shop, categoryArray, limit, offset, type, id_brand, order);
                data.push({
                    "category": categories[i],
                    "products": products
                });
            }
        } else if (id_category > 0) {
            var category = await categoryModel.getCategoriesByParams({
                where: {
                    id: id_category,
                    shop: {
                        id: id_shop
                    }
                },
                relations: ["lang"]
            }) as any[];

            if (category) {
                if (category.length > 0 && category[0]["parent"] > 0) {
                    let products = await getProducts(id_shop, parseInt(id_category), limit, offset, type, id_brand, order);
                    data.push({
                        "category": [],
                        "products": products,
                        "id_shop": id_shop, "id_category": id_category, "limit": limit, "offset": offset
                    });
                } else {
                    let categoriesSub = await categoryModel.getCategoriesByParams({
                        where: {
                            parent: id_category,
                        },
                        relations: ["lang"]
                    }) as any[];

                    categoryArray = [];

                    for (let m = 0; m < categoriesSub.length; m++) {
                        categoryArray.push(categoriesSub[m]["id"]);
                    }

                    let products = await getProducts(id_shop, categoryArray, limit, offset, type, id_brand, order);
                    data.push({
                        "category": categoriesSub,
                        "products": products
                    });
                }
            }
        } else {
            let products = await getProducts(id_shop, id_category, limit, offset, type, id_brand, order);
            data.push({
                "category": [],
                "products": products
            });
        }


        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}

async function getProducts(id_shop, id_category, limit, offset, type, id_brand, order) {
    const products = new Products();
    const coupon = new CouponModel();
    var params = {
        where: {
            active: 1,
            shop: {
                id: id_shop
            }
        }, relations: ["lang", "images"]
    };

    if (limit > 0) params["take"] = limit;
    if (offset > 0) params["skip"] = offset;
    if (type == 1) params["where"]["show_type"] = 2;
    if (type == 2) params["where"]["show_type"] = 3;
    if (id_category != 0) params["where"]["id_category"] = typeof id_category == "number" ? id_category : In(id_category);
    if (id_brand > 0) params["where"]["brand"] = {
        id: id_brand
    };

    if (order > 0) {
        params['order'] = {
            price: order == 1 ? 'ASC' : "DESC"
        }
    }

    let data = await products.getProductsByParams(params) as any[];
    var productsArray = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            const commentModel = new Comments();
            let commentsData = await commentModel.getProductCommentsByParams({
                where: {
                    id_product: data[i]['id']
                },
                take: 5,
                relations: ["user"]
            }) as any[];

            var star = 0;
            for (let m = 0; m < commentsData.length; m++) {
                star += commentsData[m]['star'];
            }

            data[i]['comments_count'] = commentsData.length;
            data[i]['star'] = commentsData.length > 0 ? Math.round((star * 10 / commentsData.length)) / 10 : 0;
            data[i]['has_coupon'] = await coupon.hasCoupon(data[i]['id']);
            productsArray.push(data[i]);
        }
    }
    return productsArray;
}