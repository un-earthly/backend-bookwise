import { Schema } from "mongoose";


export enum IWishlistItemStatus {
    'to-read',
    'currently-reading',
    'finished-reading'
}

export interface IWishlistItem extends Document {
    user: Schema.Types.ObjectId
    book: Schema.Types.ObjectId,
    status: IWishlistItemStatus
}
