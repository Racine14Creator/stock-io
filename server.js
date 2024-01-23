require('dotenv').config()

const express = require("express"),
    path = require("path"),
    mongoose = require("mongoose"),
    app = express(),
    PORT = process.env.PORT || 3000,
    MONGO = process.env.MONGO

// MongoDB Connection
mongoose.connect(MONGO)
    .then(_ => console.log("Connected to mongodb..."))
    .catch(error => console.log(error))




// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use('/users', require('./router/user.routes'))

// Start Server
app.listen(PORT, (err) => {
    if (err)

        return console.log("Server cannot run")

    console.log(`Server is running on http://localhost:${PORT}`);
});
