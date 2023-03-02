import { Schema, model, Types } from "mongoose";

interface IUser {
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar?: string;
    wallet: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean,required: true },
    avatar: String,
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet'}
})

const User = model<IUser>('User', UserSchema);

export default User;