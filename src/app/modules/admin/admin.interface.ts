import { ObjectId } from "mongoose";

export interface ILoginBody {
    email: string,
    pass: string
}

export interface IDataBody {
    _id?: ObjectId,
    hotelName: string;
    email: string,
    pass: string,
    phoneNo: string,
    address?: string,
    hotelLogo?: string,
    role: string
}


// export interface ISettingRequest {
//     id?: ObjectId,
//     hotelName: string;
//     email: string,
//     pass: string,
//     phoneNo: string,
//     address?: string,
//     hotelLogo?: string,
//     formData?: FormData,
// }


export interface ISettingRequest {
    id?: ObjectId;
    hotelName: string;
    imageName:string;
    email: string;
    pass: string;
    phoneNo: string;
    address?: string;
    hotelLogo?: string;
    description?: string;
  }
  