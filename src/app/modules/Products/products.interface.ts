import { ObjectId } from "mongoose";

// Creating an interface
export interface IProduct {
    _id: ObjectId; // Correctly importing ObjectId from mongoose Types
    roomType: string; // Array of strings for room types
    service: string[]; // Array of strings for services
    bed: number; // Number of beds
    roomTitle: string; // Title of the room
    price: number; // Price of the room
    images: string[]; // URL or path to the image
    available: boolean; // Availability status
    roomSize: string; // Size of the room
    guests: number; // Number of guests that can be accommodated
    description: string; // Description of the room
}

