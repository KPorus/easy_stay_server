import express from "express";
import { protect } from "../../../middleware/protect";
import { productsController, upload } from "./products.controller";
const router = express.Router();

router.post('/add-product',protect.adminMiddleware, upload.array('image'), productsController.addProductsInfo);

export const productsRouter = router;