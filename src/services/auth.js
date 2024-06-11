import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.findOne({ email: payload.email });

  if (user) {
      throw createHttpError(409, 'Email in use');
    }
    
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};