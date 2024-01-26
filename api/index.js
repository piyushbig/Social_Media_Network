import express  from "express";
const app= express();
app.use(express.json());
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import postsRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)

    next();
})
app.use(cors({
    origin:"http://localhost:3000",
}));
app.use(cookieParser());
//middlewares



const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "../client/public/upload")
        
    },
    filename: function (req, file ,cb){
        cb(null, Date.now()+file.originalname);
    }
})

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req,res)=>{
    const file =req.file;
    res.status(200).json(file.filename)
})



app.use("/api/auth", authRoutes );
app.use("/api/users", userRoutes );
app.use("/api/comments", commentRoutes );
app.use("/api/likes", likesRoutes );
app.use("/api/posts", postsRoutes );

app.listen(8000, ()=>{
    console.log("Api working");
});

