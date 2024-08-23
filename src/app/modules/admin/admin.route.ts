import express from "express";
import { adminController, upload} from "./admin.controller";
import { protect } from "../../../middleware/protect";
import { limiter } from "../../../utils/limiter/limiter";
const router = express.Router();

router.post('/login',limiter, adminController.login);
router.post('/register',limiter, adminController.register);
router.post('/get-personal-info',protect.adminMiddleware, adminController.getPersonalInfo);
router.post('/update-personal-info',protect.adminMiddleware, upload.single('image'), adminController.updateInfo);
router.post('/delete-account',protect.adminMiddleware, upload.single('image'), adminController.deleteUser);

export const adminRouter = router;