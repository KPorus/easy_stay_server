import { ObjectId } from 'mongodb';
import { AdminInfo, Info } from "./admininfo.model";
import { IDataBody, ILoginBody, ISettingRequest } from './admin.interface';
import { CustomError } from '../../../utils/errors/customError';
import { deleteFile, getObjectSignedUrl, uploadFile } from '../../../config/s3';
import crypto from 'crypto'
const random = crypto.randomBytes(32).toString('hex');

const login = async (data: ILoginBody): Promise<Info | null> => {
    console.log(data.email, data.pass);
    const user = await AdminInfo.findOne({
        $and: [
            { email: data.email },
            {
                pass: data.pass
            },
            { role: "admin" }
        ]
    });
    console.log(user);
    return user
}

const register = async (data: IDataBody): Promise<Info | null> => {
    const check = await AdminInfo.findOne({ email: data.email });
    if (check) {
        throw new CustomError(409, "Email already exists!");
    }

    const user = await AdminInfo.create({ ...data, role: "admin" });
    return user
}

const getPersonalInfo = async ({ id }: { id: string }): Promise<Info | null> => {
    const user = await AdminInfo.aggregate([
        {
            $match: {
                $and: [
                    { _id: new ObjectId(id) },
                    { role: 'admin' }
                ]
            }
        }, {
            $project: {
                pass: 0
            }
        }
    ]);

    console.log(user);
    return user[0]
}

const updateInfo = async (id: string, data: ISettingRequest, file: Express.Multer.File | undefined) => {
    let url;
    if (file) {
        // url = await getObjectSignedUrl(file.originalname);
        data.imageName = file.originalname+random
        url = `https://easystayfa.s3.amazonaws.com/${data.imageName}`
        if (!url) {
            throw new CustomError(500, "Error occurred while creating link the file.");
        }
        await uploadFile(file,data.imageName)
    }


    const check = await AdminInfo.aggregate([{
        $match: {
            $and: [
                { email: data.email },
                { _id: { $ne: new ObjectId(id) } }
            ]
        }
    }])
    console.log(data?.imageName);
    if (check.length > 0) {
        throw new CustomError(409, "Email already exists!");
    }
    console.log(file, data);

    const user = await AdminInfo.updateOne({ _id: id }, {
        hotelName: data.hotelName,
        imageName: data.imageName || "",
        email: data.email,
        pass: data.pass,
        phoneNo: data.phoneNo,
        address: data.address,
        description: data.description,
        hotelLogo: url || data.hotelLogo || "",
    });

    console.log(user);
    return user
}
const deleteUser = async (id: string) => {
    const check = await AdminInfo.findOne({
        _id: new ObjectId(id)
    })

    console.log("delele check", check?.hotelLogo);
    if (!check) {
        throw new CustomError(400, "User not found.");
    }

    if (check.hotelLogo) {
        await deleteFile(check?.imageName)
    }
    const user = await AdminInfo.deleteOne({ _id: new ObjectId(id) });
    return user
}


export const adminService = {
    login, register, getPersonalInfo, updateInfo, deleteUser
}