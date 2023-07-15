import { Request, Response } from 'express';
import { sendSuccessResponse } from '../../../utils/responseSender';
import { loginUserService, registerUserService } from './user.service';
import catchAsync from '../../../utils/catchAsync';

export const registerUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await registerUserService(userData);
    sendSuccessResponse(res, newUser);
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await loginUserService(email, password);
    sendSuccessResponse(res, user);
});
