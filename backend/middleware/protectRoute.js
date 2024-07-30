import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js'
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ error: 'Not authorized, token is missing' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ error: 'Not authorized, token is invalid' })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(404).json({ error: 'User no longer exists' })


        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })

    }
}

export default protectRoute;