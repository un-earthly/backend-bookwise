import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../utils/ApiError';
import User from './user.model';
import { IUser } from './user.inteface';

export async function registerUserService(userData: IUser): Promise<IUser> {
    const { email, password, contact, username } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError('Email already registered', StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username, contact });
    return await newUser.save();
}

export async function loginUserService(email: string, password: string): Promise<IUser | null> {
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError('Invalid email or password', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError('Invalid email or password', StatusCodes.UNAUTHORIZED);
    }

    return user;
}
