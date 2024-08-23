import multer from "multer"
import { CatchAsync } from "../../../Shared/CatchAsync";
import { NextFunction, Request, Response } from "express";

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, })

const addProductsInfo = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = JSON.parse(req.body.data);
      console.log(data);
    //   const user = await adminService.updateInfo(id, data, req.file);
    //   if (user) {
    //     return sendResponse(res, {
    //       success: true,
    //       statusCode: 200,
    //       message: "Admin information updated successfully",
    //       data: user,
    //     })
    //   } else {
    //     const err = new CustomError(404, "Personal information not found")
    //     next(err)
    //   }
    }
  );
  
  export const productsController= {
    addProductsInfo,
}