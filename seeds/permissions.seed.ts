export const permissionsSeed = [
    {
        name: 'dashboard',
        url: '/',
        type: 1
    },
    //shops
    {
        name: 'shops',
        url: '/shops',
        type: 1
    },
    {
        name: 'shops.shops',
        url: '/shops',
        type: 1
    },
    {
        name: 'shops.shops.add',
        url: '/shops',
        type: 1
    },
    {
        name: 'shops.shops.edit',
        url: '/shops',
        type: 1
    },
    {
        name: 'shops.shops.delete',
        url: '/shops',
        type: 1
    },
    {
        name: 'shops.addresses',
        url: '/shops/addresses',
        type: 1
    },
    {
        name: 'shops.addresses.add',
        url: '/shops/addresses',
        type: 1
    },
    {
        name: 'shops.addresses.edit',
        url: '/shops/addresses',
        type: 1
    },
    {
        name: 'shops.addresses.delete',
        url: '/shops/addresses',
        type: 1
    },
    //brands
    {
        name: 'brands',
        url: '/brands',
        type: 1
    },
    {
        name: 'brands.add',
        url: '/brands/add',
        type: 1
    },
    {
        name: 'brands.edit',
        url: '/brands/edit',
        type: 1
    },
    {
        name: 'brands.delete',
        url: '/brands/removeBrand',
        type: 1
    },
    //categories
    {
        name: 'categories',
        url: '/categories',
        type: 1
    },
    {
        name: 'categories.add',
        url: '/categories/add',
        type: 1
    },
    {
        name: 'categories.edit',
        url: '/categories/edit',
        type: 1
    },
    {
        name: 'categories.delete',
        url: '/categories/removeCategory',
        type: 1
    },
    //products
    {
        name: 'products',
        url: '/products',
        type: 1
    },
    {
        name: 'products.add',
        url: '/products',
        type: 1
    },
    {
        name: 'products.edit',
        url: '/products',
        type: 1
    },
    {
        name: 'products.delete',
        url: '/products',
        type: 1
    },
    //orders
    {
        name: 'orders',
        url: '/orders',
        type: 1
    },
    {
        name: 'orders.orders',
        url: '/orders',
        type: 1
    },
    {
        name: 'orders.orders.edit',
        url: '/orders',
        type: 1
    },
    {
        name: 'orders.orders.delete',
        url: '/orders',
        type: 1
    },
    {
        name: 'orders.orders.show',
        url: '/orders',
        type: 1
    },
    {
        name: 'orders.status',
        url: '/orders/status',
        type: 1
    },
    {
        name: 'orders.status.edit',
        url: '/orders/status',
        type: 1
    },
    //payments
    {
        name: 'payment',
        url: '/payment/status',
        type: 1
    },
    {
        name: 'payment.status',
        url: '/payment/status',
        type: 1
    },
    {
        name: 'payment.status.edit',
        url: '/payment/status/edit',
        type: 1
    },
    {
        name: 'payment.method',
        url: '/payment/method',
        type: 1
    },
    {
        name: 'payment.method.edit',
        url: '/payment/method',
        type: 1
    },
    //comments
    {
        name: 'comments',
        url: '/orders/comment',
        type: 1
    },
    {
        name: 'comments.order.delete',
        url: '/orders/comment/removeOrderComment',
        type: 1
    },
    {
        name: 'comments.order',
        url: '/orders/comment',
        type: 1
    },
    {
        name: 'comments.product.delete',
        url: '/orders/comment/removeProductComment',
        type: 1
    },
    {
        name: 'comments.product',
        url: '/products/comment',
        type: 1
    },
    //users
    {
        name: 'users',
        url: '/users',
        type: 1
    },
    {
        name: 'users.user',
        url: '/users',
        type: 1
    },
    {
        name: 'users.user.add',
        url: '/users',
        type: 1
    },
    {
        name: 'users.user.edit',
        url: '/users',
        type: 1
    },
    {
        name: 'users.user.delete',
        url: '/users',
        type: 1
    },
    {
        name: 'users.client',
        url: '/users',
        type: 1
    },
    {
        name: 'users.client.add',
        url: '/users',
        type: 1
    },
    {
        name: 'users.client.edit',
        url: '/users',
        type: 1
    },
    {
        name: 'users.client.delete',
        url: '/users',
        type: 1
    },
    {
        name: 'users.address',
        url: '/users/addresses',
        type: 1
    },
    {
        name: 'users.address.add',
        url: '/users/addresses',
        type: 1
    },
    {
        name: 'users.address.edit',
        url: '/users/addresses',
        type: 1
    },
    {
        name: 'users.address.delete',
        url: '/users/addresses',
        type: 1
    },
    {
        name: 'users.role',
        url: '/roles',
        type: 1
    },
    {
        name: 'users.permission',
        url: '/permissions',
        type: 1
    },
    //languages
    {
        name: 'languages',
        url: '/languages',
        type: 1
    },
    {
        name: 'languages.add',
        url: '/languages/add',
        type: 1
    },
    {
        name: 'languages.edit',
        url: '/languages/edit',
        type: 1
    },
    {
        name: 'languages.delete',
        url: '/languages/removeLanguage',
        type: 1
    },
    //banners
    {
        name: 'banners',
        url: '/banners',
        type: 1
    },
    {
        name: 'banners.add',
        url: '/banners/add',
        type: 1
    },
    {
        name: 'banners.edit',
        url: '/banners/edit',
        type: 1
    },
    {
        name: 'banners.delete',
        url: '/banners/delete',
        type: 1
    },
    //mobile
    {
        name: 'mobile',
        url: '/mobile/params',
        type: 1
    },
    {
        name: 'mobile.params',
        url: '/mobile/params',
        type: 1
    },
    //coupon
    {
        name: 'coupon',
        url: '/coupon',
        type: 1
    },
    {
        name: 'coupon.add',
        url: '/coupon/add',
        type: 1
    },
    {
        name: 'coupon.edit',
        url: '/coupon/edit',
        type: 1
    },
    {
        name: 'coupon.delete',
        url: '/coupon/delete',
        type: 1
    },
    //settings
    {
        name: 'units',
        url: '/units',
        type: 1
    },
    {
        name: 'units.add',
        url: '/units/add',
        type: 1
    },
    {
        name: 'units.edit',
        url: '/units/edit',
        type: 1
    },
    {
        name: 'units.delete',
        url: '/units/delete',
        type: 1
    },
    {
        name: 'timeUnits',
        url: '/timeUnits',
        type: 1
    },
    {
        name: 'timeUnits.add',
        url: '/timeUnits/add',
        type: 1
    },
    {
        name: 'timeUnits.edit',
        url: '/timeUnits/edit',
        type: 1
    },
    {
        name: 'timeUnits.delete',
        url: '/timeUnits/delete',
        type: 1
    },


    {
        name: 'settings',
        url: '/settings',
        type: 1
    },
    {
        name: 'settings.detail',
        url: '/settings',
        type: 1
    },
    //extraGroup
    {
        name: 'extraGroup',
        url: '/extraGroup',
        type: 1
    },
    {
        name: 'extraGroup.add',
        url: '/extraGroup/add',
        type: 1
    },
    {
        name: 'extraGroup.edit',
        url: '/extraGroup/edit',
        type: 1
    },
    {
        name: 'extraGroup.delete',
        url: '/extraGroup/delete',
        type: 1
    },
    //extras
    {
        name: 'extras',
        url: '/extras',
        type: 1
    },
    {
        name: 'extras.add',
        url: '/extras/add',
        type: 1
    },
    {
        name: 'extras.edit',
        url: '/extras/edit',
        type: 1
    },
    {
        name: 'extras.delete',
        url: '/extras/delete',
        type: 1
    },
    //delivery_boy
    {
        name: 'delivery_boy',
        url: '/delivery_boy',
        type: 1
    },
];