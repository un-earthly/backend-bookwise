import mongoose, { Schema, Document } from 'mongoose';
import { IWishlistItem, IWishlistItemStatus } from './wishlist.inteface';

const wishlistSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        status: {
            type: String,
            enum: IWishlistItemStatus,
            default: 'to-read',
        },
    },
    { timestamps: true }
);
const Wishlist = mongoose.model<IWishlistItem>('Wishlist', wishlistSchema);
export default Wishlist
