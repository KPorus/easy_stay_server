import { Schema, model} from 'mongoose';
import { IProduct } from './products.interface';

const productSchema = new Schema<IProduct>({
    roomType: {
        type: String,
        required: [true, "Room type should not be empty!"]
    },
    service: {
        type: [String],
        required: [true, "Services should not be empty!"]
    },
    bed: {
        type: Number,
        required: [true, "Number of beds should not be empty!"]
    },
    roomTitle: {
        type: String,
        required: [true, "Room title should not be empty!"]
    },
    price: {
        type: Number,
        required: [true, "Price should not be empty!"]
    },
    images: {
        type: [String],
        required: [true, "Image should not be empty!"]
    },
    available: {
        type: Boolean,
        required: [true, "Availability status should not be empty!"]
    },
    roomSize: {
        type: String,
        required: [true, "Room size should not be empty!"]
    },
    guests: {
        type: Number,
        required: [true, "Number of guests should not be empty!"]
    },
    description: {
        type: String,
        required: [true, "Description should not be empty!"]
    }
}, { timestamps: true });

export const Products = model<IProduct>('Products', productSchema);
