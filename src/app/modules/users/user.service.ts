import { Info, UserInfo } from "./userinfo.model"
import { Types } from 'mongoose';

interface Body
{
    email: string,
    pass: string,
    voterId:string,
}

const register = async (data: Body): Promise<Info | null> =>
{
    const check = await UserInfo.findOne({
        $or: [
            { email: data.email },
            { voterId: data.voterId }
        ]
    });

    if (check)
    {
        let user = null;
        return user;
    }
    const value = { ...data, role: "user" };
    const user = await UserInfo.create(value);
    return user
}

const login = async (data: Body): Promise<Info | null> =>
{
    const user = await UserInfo.findOne({
        email: data.email
    });
    return user
}
export const userService = {
    login, register
}