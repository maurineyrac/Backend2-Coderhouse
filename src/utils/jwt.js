import jwt from 'jsonwebtoken';
import 'dotenv/config';

const PRIVATE_KEY = process.env.JWT_SECRET || 'secretword';

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role
  };

    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1d' });
}



