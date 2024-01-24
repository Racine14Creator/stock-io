const User = require("../models/User.models.js")

const post = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            profileImage: req.file.filename
        });

        await newUser.save()
            .then(_ => res.json({ data: 'success' }))
            .catch(error => console.log(error))
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
}
const getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}
const getOne = async (req, res) => {
    res.json({ data: "data" })
}
const updateOne = async (req, res) => {
    res.json({ data: "data" })
}
const deleteOne = async (req, res) => {
    res.json({ data: "data" })
}

module.exports = {
    getAll,
    post,
    getOne,
    updateOne,
    deleteOne
}
