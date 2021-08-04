import {ConnectionOptions, getConnection, getConnectionManager, createConnection} from "typeorm";
import {Roles} from '../entity/Roles';
import {Permissions} from '../entity/Permissions';
import {RolesPermissions} from '../entity/RolePermissions';
import {Shops} from '../entity/Shops';
import {Brands} from '../entity/Brands';
import {Categories} from '../entity/Categories';
import {CategoriesLanguage} from '../entity/CategoriesLanguage';
import {Language} from '../entity/Language';
import {Products} from '../entity/Products';
import {ProductsImages} from '../entity/ProductsImages';
import {ProductsLanguage} from '../entity/ProductsLanguage';
import {OrderComments} from "../entity/OrderComments";
import {Orders} from "../entity/Orders";
import {OrderDetails} from "../entity/OrdersDetail";
import {OrderStatus} from "../entity/OrderStatus";
import {ProductComments} from "../entity/ProductComments";
import {PaymentStatus} from "../entity/PaymentStatus";
import {UserAddresses} from "../entity/UserAddresses";
import {PaymentMethod} from "../entity/PaymentsMethods";
import {ShopsLanguage} from "../entity/ShopsLanguage";
import {Banners} from "../entity/Banners";
import {BannersLanguage} from "../entity/BannerLanguage";
import {BannerProducts} from "../entity/BannerProducts";
import {MobileParams} from "../entity/MobileParams";
import {MobileParamsLang} from "../entity/MobileParamsLang";
import {UsersAdmin} from "../entity/UserAdmin";
import {UsersClient} from "../entity/UserClient";
import {Units} from "../entity/Unit";
import {UnitsLanguage} from "../entity/UnitLanguage";
import {ProductExtraGroups} from "../entity/ProductExtraGroups";
import {ProductExtraGroupsLanguage} from "../entity/ProductExtraGroupsLanguage";
import {ProductExtras} from "../entity/ProductExtras";
import {ProductExtrasLanguage} from "../entity/ProductExtrasLanguage";
import {TimeUnits} from "../entity/TimeUnits";
import {DeliveryBoyOrders} from "../entity/DeliveryBoyOrders";
import {GlobalSettings} from "../entity/GlobalSettings";
import {Coupon} from "../entity/Coupon";
import {CouponProducts} from "../entity/CouponProducts";
import {CouponLanguage} from "../entity/CouponLanguage";
import {DeliveryBoyOrderTrack} from "../entity/DeliveryBoyOrderTrack";

export const options: ConnectionOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
        OrderComments,
        Orders,
        OrderDetails,
        OrderStatus,
        Shops,
        ShopsLanguage,
        Brands,
        Categories,
        CategoriesLanguage,
        Language,
        Products,
        ProductsImages,
        ProductsLanguage,
        ProductComments,
        PaymentStatus,
        PaymentMethod,
        UserAddresses,
        Roles,
        UsersAdmin,
        UsersClient,
        Permissions,
        RolesPermissions,
        Banners,
        BannersLanguage,
        BannerProducts,
        MobileParams,
        MobileParamsLang,
        Units,
        UnitsLanguage,
        ProductExtraGroups,
        ProductExtraGroupsLanguage,
        ProductExtras,
        ProductExtrasLanguage,
        TimeUnits,
        DeliveryBoyOrders,
        DeliveryBoyOrderTrack,
        GlobalSettings,
        Coupon,
        CouponProducts,
        CouponLanguage
    ],
    synchronize: false,
}

//get connection
export const dbConnection = async () => {
    try {
        if (getConnectionManager().connections.length > 0) {
            return getConnections();
        } else {
            await initConnection();
            return getConnections();
        }
    } catch (e) {
        console.log(e);
    }
}

//get connection
const getConnections = async () => {
    let connection = getConnection();

    if (connection.isConnected) {
        return connection;
    } else {
        await connection.connect();
        return connection;
    }
}

//init connection
export const initConnection = async () => {
    await createConnection(options).then(async (connection) => {
        if (connection.driver.database.length == 0)
            await connection.synchronize();
    }).catch(error => console.log(error));
}