import User from "../Models/user.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js"
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            res.status(400).json({ error: 'password dont match' })
        }
        const user = await User.findOne({ username })
        if (user) {
            res.status(400).json({ error: 'username already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`


        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            // jwt token
            await generateTokenAndSetCookie(newUser._id, res)


            await newUser.save()
            res.status(201).json(
                {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePicture: newUser.profilePicture
                }
            )
        } else {
            res.status(400).json({ error: 'Failed to create user' })
        }

    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}




export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture
        })
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}
