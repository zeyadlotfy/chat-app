import jwt from 'jsonwebtoken'
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt', token, {
        maxAge: 15 * 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: 'strict',// 'strict' or 'lax' for production
        secure: process.env.NODE_ENV !== 'development' // true for production
    });
}

export default generateTokenAndSetCookie;