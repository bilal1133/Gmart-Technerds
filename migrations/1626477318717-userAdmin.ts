import {MigrationInterface, QueryRunner} from "typeorm";

export class userAdmin1626477318717 implements MigrationInterface {
    name = 'userAdmin1626477318717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Language` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `short_name` varchar(255) NOT NULL, `image_url` varchar(255) NOT NULL, `active` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ShopsLanguage` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `info` text NOT NULL, `address` varchar(255) NOT NULL, `id_lang` int NOT NULL, `id_shop` int NOT NULL, PRIMARY KEY (`id`, `id_lang`, `id_shop`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Shops` (`id` int NOT NULL AUTO_INCREMENT, `logo_url` varchar(255) NOT NULL, `backimage_url` varchar(255) NOT NULL, `delivery_type` int NOT NULL, `delivery_price` double NOT NULL, `delivery_range` int NOT NULL, `tax` double NOT NULL, `admin_percentage` double NOT NULL, `latitude` decimal(10,4) NOT NULL, `longtitude` decimal(10,4) NOT NULL, `phone` varchar(255) NOT NULL, `mobile` varchar(255) NOT NULL, `show_type` tinyint NOT NULL, `is_closed` tinyint NOT NULL, `active` tinyint NOT NULL, `open_hour` time NOT NULL, `close_hour` time NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Brands` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `image_url` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `id_shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `CategoriesLanguage` (`name` varchar(255) NOT NULL, `id_category` int NOT NULL, `id_lang` int NOT NULL, PRIMARY KEY (`id_category`, `id_lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Categories` (`id` int NOT NULL AUTO_INCREMENT, `parent` int NOT NULL, `image_url` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `UserAddresses` (`id` int NOT NULL AUTO_INCREMENT, `id_user` int NOT NULL, `address` text NOT NULL, `latitude` decimal(10,4) NOT NULL, `longtitude` decimal(10,4) NOT NULL, `default` tinyint NOT NULL, `active` tinyint NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `UsersClient` (`id` int NOT NULL AUTO_INCREMENT, `social_id` varchar(255) NULL, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `phone` varchar(255) NULL, `email` varchar(255) NULL, `image_url` varchar(255) NULL, `auth_type` int NOT NULL, `password` varchar(255) NULL, `token` varchar(255) NOT NULL, `device_type` tinyint NULL DEFAULT 1, `active` tinyint NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductComments` (`id` int NOT NULL AUTO_INCREMENT, `comment_text` text NOT NULL, `star` int NOT NULL, `id_user` int NOT NULL, `id_product` int NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NOT NULL, `product` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductsImages` (`id` int NOT NULL AUTO_INCREMENT, `image_url` varchar(255) NOT NULL, `main` int NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `id_product` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductsLanguage` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `id_product` int NOT NULL, `id_lang` int NOT NULL, PRIMARY KEY (`id`, `id_product`, `id_lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `UnitsLanguage` (`name` varchar(255) NOT NULL, `unit` int NOT NULL, `lang` int NOT NULL, PRIMARY KEY (`unit`, `lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Units` (`id` int NOT NULL AUTO_INCREMENT, `active` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Products` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `pack_quantity` int NOT NULL, `weight` double(22,2) NOT NULL, `price` double(22,2) NOT NULL, `id_unit` int NOT NULL, `discount_price` double(22,2) NOT NULL, `show_type` tinyint NOT NULL, `id_category` int NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `unit` int NULL, `category` int NULL, `shop` int NULL, `brand` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `BannerProducts` (`id_banner` int NOT NULL, `id_product` int NOT NULL, PRIMARY KEY (`id_banner`, `id_product`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Banners` (`id` int NOT NULL AUTO_INCREMENT, `image_url` varchar(255) NOT NULL, `title_color` varchar(255) NOT NULL, `button_color` varchar(255) NOT NULL, `indicator_color` varchar(255) NOT NULL, `background_color` varchar(255) NOT NULL, `position` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `id_shop` int NOT NULL, `shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `BannersLanguage` (`title` varchar(255) NOT NULL, `description` text NOT NULL, `button_text` varchar(255) NOT NULL, `id_banner` int NOT NULL, `id_lang` int NOT NULL, PRIMARY KEY (`id_banner`, `id_lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `CouponLanguage` (`description` text NOT NULL, `coupon` int NULL, `id_lang` int NOT NULL, PRIMARY KEY (`id_lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `CouponProducts` (`id` int NOT NULL AUTO_INCREMENT, `coupon` int NULL, `product` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Coupon` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `discount_type` tinyint NOT NULL, `discount` double(22,2) NOT NULL, `active` tinyint NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `UsersAdmin` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `image_url` varchar(255) NOT NULL, `address` varchar(255) NULL, `email` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `active` tinyint NOT NULL, `id_role` int NOT NULL, `offline` int NULL DEFAULT 1, `id_shop` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `role` int NULL, `shop` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `OrderStatus` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, `class` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `PaymentStatus` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `class` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `PaymentMethod` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `OrderDetails` (`id` int NOT NULL AUTO_INCREMENT, `quantity` int NOT NULL, `discount` double(22,2) NOT NULL DEFAULT 0, `coupon_amount` double(22,2) NULL DEFAULT 0, `price` double(22,2) NOT NULL, `id_product` int NOT NULL, `is_replaced` tinyint NOT NULL, `is_replacement_product` tinyint NOT NULL, `order` int NULL, `coupon` int NULL, `replace_product` int NULL, `product` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Orders` (`id` int NOT NULL AUTO_INCREMENT, `tax` double NOT NULL, `delivery_fee` double NOT NULL, `total_sum` double NOT NULL, `total_discount` double NOT NULL, `id_user` int NOT NULL, `delivery_mark` int NULL, `id_review` int NULL, `id_delivery_address` int NOT NULL, `id_shop` int NOT NULL, `delivery_date` varchar(255) NOT NULL, `comment` text NOT NULL, `active` tinyint NOT NULL, `type` tinyint NOT NULL, `checklist` text NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NOT NULL, `delivery_boy` int NULL, `order_status` int NOT NULL, `payment_status` int NOT NULL, `payment_method` int NOT NULL, `delivery_address` int NULL, `shops` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `DeliveryBoyOrders` (`id` int NOT NULL AUTO_INCREMENT, `comment` varchar(255) NOT NULL, `status` tinyint NOT NULL, `active` tinyint NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NOT NULL, `order` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `DeliveryBoyOrderTrack` (`id` int NOT NULL AUTO_INCREMENT, `latitude` decimal(10,4) NOT NULL, `longtitude` decimal(10,4) NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NOT NULL, `order` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `GlobalSettings` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `key` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, `default` varchar(255) NOT NULL, `shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `MobileParamsLang` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `id_param` int NOT NULL, `id_lang` int NOT NULL, PRIMARY KEY (`id`, `id_param`, `id_lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `MobileParams` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `defaultText` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `OrderComments` (`id` int NOT NULL AUTO_INCREMENT, `comment_text` text NOT NULL, `id_user` int NOT NULL, `id_order` int NOT NULL, `active` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `user` int NULL, `order` int NULL, UNIQUE INDEX `REL_a915c35c5ee0ebf9bba45be05b` (`order`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Permissions` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `type` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductExtraGroupsLanguage` (`name` varchar(255) NOT NULL, `extraGroup` int NOT NULL, `lang` int NOT NULL, PRIMARY KEY (`extraGroup`, `lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductExtraGroups` (`id` int NOT NULL AUTO_INCREMENT, `active` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductExtrasLanguage` (`name` varchar(255) NOT NULL, `description` text NOT NULL, `extras` int NOT NULL, `lang` int NOT NULL, PRIMARY KEY (`extras`, `lang`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ProductExtras` (`id` int NOT NULL AUTO_INCREMENT, `price` double(22,2) NOT NULL, `image_url` varchar(255) NOT NULL, `background_color` varchar(255) NOT NULL, `active` int NOT NULL, `shop` int NOT NULL, `product` int NOT NULL, `extraGroup` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `RolesPermissions` (`created_at` datetime NOT NULL, `updated_at` datetime NULL, `id_role` int NOT NULL, `id_permission` int NOT NULL, PRIMARY KEY (`id_role`, `id_permission`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `TimeUnits` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `active` tinyint NOT NULL, `sort` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NULL, `shop` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ShopsLanguage` ADD CONSTRAINT `FK_5f3eeeb3dbaa9210e7af7b0e1d7` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ShopsLanguage` ADD CONSTRAINT `FK_8d0b12006ff361462e6588e0a00` FOREIGN KEY (`id_shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Brands` ADD CONSTRAINT `FK_6ed00208d60f08e8676ed0be02e` FOREIGN KEY (`id_shop`) REFERENCES `Shops`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CategoriesLanguage` ADD CONSTRAINT `FK_3fcf52977f939dca7eb09d410f9` FOREIGN KEY (`id_category`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CategoriesLanguage` ADD CONSTRAINT `FK_bf02fcc0220f8c424db14ae7d5d` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Categories` ADD CONSTRAINT `FK_a94c1a05e886fca059bf18818f3` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UserAddresses` ADD CONSTRAINT `FK_53d232affbc1b95746f1fd01813` FOREIGN KEY (`user`) REFERENCES `UsersClient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductComments` ADD CONSTRAINT `FK_6d8062efd5e6d5e942b4b713b3a` FOREIGN KEY (`user`) REFERENCES `UsersClient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductComments` ADD CONSTRAINT `FK_3e288c84ee7fe97aa75b6e11e74` FOREIGN KEY (`product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductsImages` ADD CONSTRAINT `FK_d6706dbda0947c8c67f767d5e57` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductsLanguage` ADD CONSTRAINT `FK_c833c5369155e7f8d69a5e7fb1e` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductsLanguage` ADD CONSTRAINT `FK_a823b85fcf93d3ec104c73b89b3` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UnitsLanguage` ADD CONSTRAINT `FK_4493b401314dcfef91a6000e417` FOREIGN KEY (`unit`) REFERENCES `Units`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UnitsLanguage` ADD CONSTRAINT `FK_80da9f013a2d00e164d785f5c5f` FOREIGN KEY (`lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Products` ADD CONSTRAINT `FK_04ff313ee05b8d0e784585529eb` FOREIGN KEY (`unit`) REFERENCES `Units`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Products` ADD CONSTRAINT `FK_f780eacad4a3c31f7a38f0b0b47` FOREIGN KEY (`category`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Products` ADD CONSTRAINT `FK_9cd545f778fc6d70d45feaab9f2` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Products` ADD CONSTRAINT `FK_18e20da132f1a526a2660119f80` FOREIGN KEY (`brand`) REFERENCES `Brands`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `BannerProducts` ADD CONSTRAINT `FK_18d92debf5b930ed98b4d07a478` FOREIGN KEY (`id_banner`) REFERENCES `Banners`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `BannerProducts` ADD CONSTRAINT `FK_6ef3eb78fde47b7c50b1ea30cdb` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Banners` ADD CONSTRAINT `FK_f5dee772368cb183ce86162ea05` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `BannersLanguage` ADD CONSTRAINT `FK_9b86a597b2cd48ac2e0c238e8e9` FOREIGN KEY (`id_banner`) REFERENCES `Banners`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `BannersLanguage` ADD CONSTRAINT `FK_7f007f9893d3c5f37cb204d31f7` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CouponLanguage` ADD CONSTRAINT `FK_3aebcd42eabb6a5b468166cdc36` FOREIGN KEY (`coupon`) REFERENCES `Coupon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CouponLanguage` ADD CONSTRAINT `FK_b5f30bf81d3ba0c6e1ded1766fa` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CouponProducts` ADD CONSTRAINT `FK_d9b77e0a9af5fcb1da52808d21d` FOREIGN KEY (`coupon`) REFERENCES `Coupon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `CouponProducts` ADD CONSTRAINT `FK_0184ec1c6b3d76b3af69448e69e` FOREIGN KEY (`product`) REFERENCES `Products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Coupon` ADD CONSTRAINT `FK_1fca973da811ef9624bb6bd8302` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UsersAdmin` ADD CONSTRAINT `FK_a0ead3d43ff1dd7a7c6b0eebdda` FOREIGN KEY (`role`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UsersAdmin` ADD CONSTRAINT `FK_2075eab23b427e52b3011282e46` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderDetails` ADD CONSTRAINT `FK_6215b6dae3a65b41c98d1bf9152` FOREIGN KEY (`order`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderDetails` ADD CONSTRAINT `FK_fa86dceb8ba7f04fd80dc2d1bfe` FOREIGN KEY (`coupon`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderDetails` ADD CONSTRAINT `FK_5e29ce5a3a9ebdf7f316d36972c` FOREIGN KEY (`replace_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderDetails` ADD CONSTRAINT `FK_0248c3d35645902100c071dcb81` FOREIGN KEY (`product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_11c5a02e75c453582d4b17ac57b` FOREIGN KEY (`user`) REFERENCES `UsersClient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_bbb682a2aa2b9018400d24d1f44` FOREIGN KEY (`delivery_boy`) REFERENCES `UsersAdmin`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_20325cfe7dda0c77597389e9d9d` FOREIGN KEY (`order_status`) REFERENCES `OrderStatus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_32f973f5ad76b44b773fa233610` FOREIGN KEY (`payment_status`) REFERENCES `PaymentStatus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_c8be3811c4a61695a5557da1539` FOREIGN KEY (`payment_method`) REFERENCES `PaymentMethod`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_4dc069ef46248bd63c4861d307d` FOREIGN KEY (`delivery_address`) REFERENCES `UserAddresses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Orders` ADD CONSTRAINT `FK_d48d422d3667b8277483be97216` FOREIGN KEY (`shops`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrders` ADD CONSTRAINT `FK_82306640afb76c0374d84e6c18c` FOREIGN KEY (`user`) REFERENCES `UsersAdmin`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrders` ADD CONSTRAINT `FK_9ce9c7c081384477ea6f1576ad9` FOREIGN KEY (`order`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrderTrack` ADD CONSTRAINT `FK_4202a6cc34afd322b30591f7052` FOREIGN KEY (`user`) REFERENCES `UsersAdmin`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrderTrack` ADD CONSTRAINT `FK_caf79bf3b4bbdef53258a664649` FOREIGN KEY (`order`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `GlobalSettings` ADD CONSTRAINT `FK_547249e0041ad1c1188287bd1d7` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `MobileParamsLang` ADD CONSTRAINT `FK_c7fd94a17cf4900ba58cbc1278a` FOREIGN KEY (`id_param`) REFERENCES `MobileParams`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `MobileParamsLang` ADD CONSTRAINT `FK_4a4a30b0932f3f967e802cf1490` FOREIGN KEY (`id_lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderComments` ADD CONSTRAINT `FK_4dfc617e78bab3461c97a078879` FOREIGN KEY (`user`) REFERENCES `UsersClient`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `OrderComments` ADD CONSTRAINT `FK_a915c35c5ee0ebf9bba45be05ba` FOREIGN KEY (`order`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtraGroupsLanguage` ADD CONSTRAINT `FK_22cef2061249aa23723b7952020` FOREIGN KEY (`extraGroup`) REFERENCES `ProductExtraGroups`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtraGroupsLanguage` ADD CONSTRAINT `FK_4bec2525c3a54a74dd2d65eb047` FOREIGN KEY (`lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtrasLanguage` ADD CONSTRAINT `FK_d30a8d05c7affd95d2e646125cb` FOREIGN KEY (`extras`) REFERENCES `ProductExtras`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtrasLanguage` ADD CONSTRAINT `FK_06826fa72a61741243d367215c2` FOREIGN KEY (`lang`) REFERENCES `Language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtras` ADD CONSTRAINT `FK_8e7e523b6d2faee635ade2f225e` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtras` ADD CONSTRAINT `FK_c3b72bc2b419f6f5c21bedca9c7` FOREIGN KEY (`product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ProductExtras` ADD CONSTRAINT `FK_773e985b3b6107f8cebfd185e53` FOREIGN KEY (`extraGroup`) REFERENCES `ProductExtraGroups`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `RolesPermissions` ADD CONSTRAINT `FK_969b512463c97e9a7f6c3b79de5` FOREIGN KEY (`id_role`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `RolesPermissions` ADD CONSTRAINT `FK_997665b078149d32d02a85b85fe` FOREIGN KEY (`id_permission`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `TimeUnits` ADD CONSTRAINT `FK_ab039627d0776c48e0b3258853b` FOREIGN KEY (`shop`) REFERENCES `Shops`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `TimeUnits` DROP FOREIGN KEY `FK_ab039627d0776c48e0b3258853b`");
        await queryRunner.query("ALTER TABLE `RolesPermissions` DROP FOREIGN KEY `FK_997665b078149d32d02a85b85fe`");
        await queryRunner.query("ALTER TABLE `RolesPermissions` DROP FOREIGN KEY `FK_969b512463c97e9a7f6c3b79de5`");
        await queryRunner.query("ALTER TABLE `ProductExtras` DROP FOREIGN KEY `FK_773e985b3b6107f8cebfd185e53`");
        await queryRunner.query("ALTER TABLE `ProductExtras` DROP FOREIGN KEY `FK_c3b72bc2b419f6f5c21bedca9c7`");
        await queryRunner.query("ALTER TABLE `ProductExtras` DROP FOREIGN KEY `FK_8e7e523b6d2faee635ade2f225e`");
        await queryRunner.query("ALTER TABLE `ProductExtrasLanguage` DROP FOREIGN KEY `FK_06826fa72a61741243d367215c2`");
        await queryRunner.query("ALTER TABLE `ProductExtrasLanguage` DROP FOREIGN KEY `FK_d30a8d05c7affd95d2e646125cb`");
        await queryRunner.query("ALTER TABLE `ProductExtraGroupsLanguage` DROP FOREIGN KEY `FK_4bec2525c3a54a74dd2d65eb047`");
        await queryRunner.query("ALTER TABLE `ProductExtraGroupsLanguage` DROP FOREIGN KEY `FK_22cef2061249aa23723b7952020`");
        await queryRunner.query("ALTER TABLE `OrderComments` DROP FOREIGN KEY `FK_a915c35c5ee0ebf9bba45be05ba`");
        await queryRunner.query("ALTER TABLE `OrderComments` DROP FOREIGN KEY `FK_4dfc617e78bab3461c97a078879`");
        await queryRunner.query("ALTER TABLE `MobileParamsLang` DROP FOREIGN KEY `FK_4a4a30b0932f3f967e802cf1490`");
        await queryRunner.query("ALTER TABLE `MobileParamsLang` DROP FOREIGN KEY `FK_c7fd94a17cf4900ba58cbc1278a`");
        await queryRunner.query("ALTER TABLE `GlobalSettings` DROP FOREIGN KEY `FK_547249e0041ad1c1188287bd1d7`");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrderTrack` DROP FOREIGN KEY `FK_caf79bf3b4bbdef53258a664649`");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrderTrack` DROP FOREIGN KEY `FK_4202a6cc34afd322b30591f7052`");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrders` DROP FOREIGN KEY `FK_9ce9c7c081384477ea6f1576ad9`");
        await queryRunner.query("ALTER TABLE `DeliveryBoyOrders` DROP FOREIGN KEY `FK_82306640afb76c0374d84e6c18c`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_d48d422d3667b8277483be97216`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_4dc069ef46248bd63c4861d307d`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_c8be3811c4a61695a5557da1539`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_32f973f5ad76b44b773fa233610`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_20325cfe7dda0c77597389e9d9d`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_bbb682a2aa2b9018400d24d1f44`");
        await queryRunner.query("ALTER TABLE `Orders` DROP FOREIGN KEY `FK_11c5a02e75c453582d4b17ac57b`");
        await queryRunner.query("ALTER TABLE `OrderDetails` DROP FOREIGN KEY `FK_0248c3d35645902100c071dcb81`");
        await queryRunner.query("ALTER TABLE `OrderDetails` DROP FOREIGN KEY `FK_5e29ce5a3a9ebdf7f316d36972c`");
        await queryRunner.query("ALTER TABLE `OrderDetails` DROP FOREIGN KEY `FK_fa86dceb8ba7f04fd80dc2d1bfe`");
        await queryRunner.query("ALTER TABLE `OrderDetails` DROP FOREIGN KEY `FK_6215b6dae3a65b41c98d1bf9152`");
        await queryRunner.query("ALTER TABLE `UsersAdmin` DROP FOREIGN KEY `FK_2075eab23b427e52b3011282e46`");
        await queryRunner.query("ALTER TABLE `UsersAdmin` DROP FOREIGN KEY `FK_a0ead3d43ff1dd7a7c6b0eebdda`");
        await queryRunner.query("ALTER TABLE `Coupon` DROP FOREIGN KEY `FK_1fca973da811ef9624bb6bd8302`");
        await queryRunner.query("ALTER TABLE `CouponProducts` DROP FOREIGN KEY `FK_0184ec1c6b3d76b3af69448e69e`");
        await queryRunner.query("ALTER TABLE `CouponProducts` DROP FOREIGN KEY `FK_d9b77e0a9af5fcb1da52808d21d`");
        await queryRunner.query("ALTER TABLE `CouponLanguage` DROP FOREIGN KEY `FK_b5f30bf81d3ba0c6e1ded1766fa`");
        await queryRunner.query("ALTER TABLE `CouponLanguage` DROP FOREIGN KEY `FK_3aebcd42eabb6a5b468166cdc36`");
        await queryRunner.query("ALTER TABLE `BannersLanguage` DROP FOREIGN KEY `FK_7f007f9893d3c5f37cb204d31f7`");
        await queryRunner.query("ALTER TABLE `BannersLanguage` DROP FOREIGN KEY `FK_9b86a597b2cd48ac2e0c238e8e9`");
        await queryRunner.query("ALTER TABLE `Banners` DROP FOREIGN KEY `FK_f5dee772368cb183ce86162ea05`");
        await queryRunner.query("ALTER TABLE `BannerProducts` DROP FOREIGN KEY `FK_6ef3eb78fde47b7c50b1ea30cdb`");
        await queryRunner.query("ALTER TABLE `BannerProducts` DROP FOREIGN KEY `FK_18d92debf5b930ed98b4d07a478`");
        await queryRunner.query("ALTER TABLE `Products` DROP FOREIGN KEY `FK_18e20da132f1a526a2660119f80`");
        await queryRunner.query("ALTER TABLE `Products` DROP FOREIGN KEY `FK_9cd545f778fc6d70d45feaab9f2`");
        await queryRunner.query("ALTER TABLE `Products` DROP FOREIGN KEY `FK_f780eacad4a3c31f7a38f0b0b47`");
        await queryRunner.query("ALTER TABLE `Products` DROP FOREIGN KEY `FK_04ff313ee05b8d0e784585529eb`");
        await queryRunner.query("ALTER TABLE `UnitsLanguage` DROP FOREIGN KEY `FK_80da9f013a2d00e164d785f5c5f`");
        await queryRunner.query("ALTER TABLE `UnitsLanguage` DROP FOREIGN KEY `FK_4493b401314dcfef91a6000e417`");
        await queryRunner.query("ALTER TABLE `ProductsLanguage` DROP FOREIGN KEY `FK_a823b85fcf93d3ec104c73b89b3`");
        await queryRunner.query("ALTER TABLE `ProductsLanguage` DROP FOREIGN KEY `FK_c833c5369155e7f8d69a5e7fb1e`");
        await queryRunner.query("ALTER TABLE `ProductsImages` DROP FOREIGN KEY `FK_d6706dbda0947c8c67f767d5e57`");
        await queryRunner.query("ALTER TABLE `ProductComments` DROP FOREIGN KEY `FK_3e288c84ee7fe97aa75b6e11e74`");
        await queryRunner.query("ALTER TABLE `ProductComments` DROP FOREIGN KEY `FK_6d8062efd5e6d5e942b4b713b3a`");
        await queryRunner.query("ALTER TABLE `UserAddresses` DROP FOREIGN KEY `FK_53d232affbc1b95746f1fd01813`");
        await queryRunner.query("ALTER TABLE `Categories` DROP FOREIGN KEY `FK_a94c1a05e886fca059bf18818f3`");
        await queryRunner.query("ALTER TABLE `CategoriesLanguage` DROP FOREIGN KEY `FK_bf02fcc0220f8c424db14ae7d5d`");
        await queryRunner.query("ALTER TABLE `CategoriesLanguage` DROP FOREIGN KEY `FK_3fcf52977f939dca7eb09d410f9`");
        await queryRunner.query("ALTER TABLE `Brands` DROP FOREIGN KEY `FK_6ed00208d60f08e8676ed0be02e`");
        await queryRunner.query("ALTER TABLE `ShopsLanguage` DROP FOREIGN KEY `FK_8d0b12006ff361462e6588e0a00`");
        await queryRunner.query("ALTER TABLE `ShopsLanguage` DROP FOREIGN KEY `FK_5f3eeeb3dbaa9210e7af7b0e1d7`");
        await queryRunner.query("DROP TABLE `TimeUnits`");
        await queryRunner.query("DROP TABLE `RolesPermissions`");
        await queryRunner.query("DROP TABLE `ProductExtras`");
        await queryRunner.query("DROP TABLE `ProductExtrasLanguage`");
        await queryRunner.query("DROP TABLE `ProductExtraGroups`");
        await queryRunner.query("DROP TABLE `ProductExtraGroupsLanguage`");
        await queryRunner.query("DROP TABLE `Permissions`");
        await queryRunner.query("DROP INDEX `REL_a915c35c5ee0ebf9bba45be05b` ON `OrderComments`");
        await queryRunner.query("DROP TABLE `OrderComments`");
        await queryRunner.query("DROP TABLE `MobileParams`");
        await queryRunner.query("DROP TABLE `MobileParamsLang`");
        await queryRunner.query("DROP TABLE `GlobalSettings`");
        await queryRunner.query("DROP TABLE `DeliveryBoyOrderTrack`");
        await queryRunner.query("DROP TABLE `DeliveryBoyOrders`");
        await queryRunner.query("DROP TABLE `Orders`");
        await queryRunner.query("DROP TABLE `OrderDetails`");
        await queryRunner.query("DROP TABLE `PaymentMethod`");
        await queryRunner.query("DROP TABLE `PaymentStatus`");
        await queryRunner.query("DROP TABLE `OrderStatus`");
        await queryRunner.query("DROP TABLE `UsersAdmin`");
        await queryRunner.query("DROP TABLE `Roles`");
        await queryRunner.query("DROP TABLE `Coupon`");
        await queryRunner.query("DROP TABLE `CouponProducts`");
        await queryRunner.query("DROP TABLE `CouponLanguage`");
        await queryRunner.query("DROP TABLE `BannersLanguage`");
        await queryRunner.query("DROP TABLE `Banners`");
        await queryRunner.query("DROP TABLE `BannerProducts`");
        await queryRunner.query("DROP TABLE `Products`");
        await queryRunner.query("DROP TABLE `Units`");
        await queryRunner.query("DROP TABLE `UnitsLanguage`");
        await queryRunner.query("DROP TABLE `ProductsLanguage`");
        await queryRunner.query("DROP TABLE `ProductsImages`");
        await queryRunner.query("DROP TABLE `ProductComments`");
        await queryRunner.query("DROP TABLE `UsersClient`");
        await queryRunner.query("DROP TABLE `UserAddresses`");
        await queryRunner.query("DROP TABLE `Categories`");
        await queryRunner.query("DROP TABLE `CategoriesLanguage`");
        await queryRunner.query("DROP TABLE `Brands`");
        await queryRunner.query("DROP TABLE `Shops`");
        await queryRunner.query("DROP TABLE `ShopsLanguage`");
        await queryRunner.query("DROP TABLE `Language`");
    }

}