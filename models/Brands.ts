import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Brands} from '../entity/Brands';
import removeImage from '../utils/removeImage';

export default class BrandsModel {
    saveBrands(brand_name: string, brand_image_url: string, id: number, shop: number, active: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var brands = null;
                if (id > 0) {
                    brands = await connect.getRepository('Brands').findOne(id);
                    brands.name = brand_name;
                    if (brand_image_url.length > 0)
                        brands.image_url = brand_image_url;
                } else {
                    brands = new Brands();
                }

                brands.name = brand_name;
                brands.id_shop = shop;
                brands.image_url = brand_image_url;
                brands.active = active == 1 ? 1 : 0;
                brands.created_at = new Date();

                await connect.getRepository('Brands').save(brands).then(() => {
                    resolve({
                        success: true
                    });
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getBrandsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let brands = await connect.getRepository('Brands').find(params).catch((error) => {
                    reject(error);
                });
                resolve(brands);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeBrandsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get rmeovoved item
                let brand = await connect.getRepository('Brands').findOne(params);
                //remove item
                await connect.getRepository('Brands').remove(brand);
                //remove image
                removeImage(brand['image_url']);

                resolve(brand);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}