require('dotenv').config()
const path = require('path')
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const {checkForAuthenticationCookie} = require("./middlewares/authentication.js")
const Blog = require("./models/blog.js") 


const userRoute =require("./routes/user.js")
const blogRoute =require("./routes/blog.js")

const app= express()
const PORT =process.env.PORT ||8000

// mongoose.connect(process.env.MONGO_URL).then(console.log("MongoDB Connected"))
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Start server ONLY after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server started at Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({ extended: false}));

app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.use(express.static(path.resolve("./public")))



app.get('/', async (req,res)=>{
    // const allBlogs = await Blog.find({})
    // res.render('home',{
    //     user: req.user,
    //     blogs: allBlogs
    // })
    try {
        const allBlogs = await Blog.find({});
        res.render('home', {
          user: req.user,
          blogs: allBlogs
        });
      } catch (err) {
        console.error("❌ Failed to fetch blogs:", err.message);
        res.status(500).send("Error loading blogs.");
      }
})

app.use("/user",userRoute)
app.use("/blog",blogRoute )