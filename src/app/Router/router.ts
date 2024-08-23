import express from 'express'
import { userRouter } from '../modules/users/user.route';
import { adminRouter } from '../modules/admin/admin.route';
import { productsRouter } from '../modules/Products/products.route';

const router = express.Router();

const moduleRoute = [
    {
        path: '/user',
        router: userRouter
    },
    {
        path: '/admin',
        router: adminRouter
    },
    {
        path: '/admin_products',
        router: productsRouter
    }
]

moduleRoute.forEach((route) => router.use(route.path, route.router));

export default router;