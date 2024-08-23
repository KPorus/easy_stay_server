import { Schema, model, ObjectId } from 'mongoose';
// Creating an interface
export interface Info {
    _id: ObjectId,
    hotelName: string;
    email: string,
    pass: string,
    phoneNo: string,
    address: string,
    imageName: string,
    hotelLogo: string,
    role: string
    description: string,
}

const infoSchema = new Schema<Info>({
    hotelName: {
        type: String,
        required: [true, "Hotel Name should not be empty!"]
    },
    email: {
        type: String,
        required: [true, "email should not be empty!"]
    },

    pass: {
        type: String,
        required: [true, "password should not be empty!"]
    },
    phoneNo: {
        type: String,
        required: [true, "Phone no. should not be empty!"]
    },
    hotelLogo: {
        type: String,
    },
    imageName: {
        type: String,
    },
    address: { type: String },
    description: { type: String },
    role: { type: String }
}, { timestamps: true });

export const AdminInfo = model<Info>('AdminInfo', infoSchema);