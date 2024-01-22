require('dotenv').config()

const express = require("express"),
    multer = require("multer"),
    bcrypt = require("bcrypt"), path = require("path"), mongoose = require("mongoose");

const app = express(), PORT = process.env.PORT || 3000, MONGO = process.env.MONGO

// MongoDB Connection
mongoose.connect(MONGO)
    .then(_ => console.log("Connected to mongodb..."))
    .catch(error => console.log(error))

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileImage: String
});

const User = mongoose.model("User", userSchema);

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            profileImage: req.file.filename
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
});

// Start Server
app.listen(PORT, (err) => {
    if (err)
        return console.log("Server cannot run")

    console.log(`Server is running on http://localhost:${PORT}`);
});
