import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { adminService } from "./admin.service";
import multer from "multer";
import { CustomError } from '../../../utils/errors/customError';
import { CatchAsync } from '../../../Shared/CatchAsync';

// import pick from '../../../Shared/pick';
import sendResponse from '../../../Shared/sendResponse';
// import { IPaginationOptons } from '../../interface/pagination';
const path = require("path");


const storage = multer.memoryStorage()
export const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, })

const signToken = (id: string, email: String) => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d", // Token expiration period
    }
  );
};

const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await adminService.login(req.body);
    if (user) {
      if (user.pass == req.body.pass) {
        const token = signToken(user._id.toString(), user.email.toString());
        return sendResponse(res, {
          success: true,
          statusCode: 200,
          message: "Login succesfull",
          token: token,
          data: user._id
        })
      } else {
        const err = new CustomError(404, "Password not match")
        next(err)
      }
    } else {
      const err = new CustomError(404, "User not found")
      next(err)
    }
  }
);
const register = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await adminService.register(req.body);
    if (user) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Register succesfull"
      })
    } else {
      const err = new CustomError(404, "User not found")
      next(err)
    }
  }
);

const getPersonalInfo = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await adminService.getPersonalInfo(req.body);
    if (user) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Admin information found",
        data: user,
      })
    } else {
      const err = new CustomError(404, "Personal information not found")
      next(err)
    }
  }
);

const updateInfo = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = JSON.parse(req.body.data);
    const id = req.body.id
    if (data.pass == "") {
      delete data.pass;
    }
    const user = await adminService.updateInfo(id, data, req.file);
    if (user) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Admin information updated successfully",
        data: user,
      })
    } else {
      const err = new CustomError(404, "Personal information not found")
      next(err)
    }
  }
);

const deleteUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("delete body",req.body);
    const user = await adminService.deleteUser(req.body);
    if (user) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Admin deleted successfully",
      })
    } else {
      const err = new CustomError(404, "Admin not found")
      next(err)
    }
  }
)

export const adminController = {
  login,
  register,
  getPersonalInfo,
  updateInfo,
  deleteUser
};


