const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const  userRoute = require("./routes/userRoute")
const  productRoute = require("./routes/productRoute")
const  contactRoute = require("./routes/contactRoute")
const path = require("path")
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(
    cors({
      origin: ["https://client-management-app-ten.vercel.app","http://localhost:3002" ],
      credentials: true,
    })
  );

app.use("/uploads", express.static(path.join(__dirname, "uplaods")))

// Routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/contactus", contactRoute)

// Routes
app.get("/",(req,res) => {
    res.send("Home Page")
})

// Error Middleware
app.use(errorHandler)

// Connect to DB and start server
const PORT = process.env.PORT || 5001

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Server Running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))