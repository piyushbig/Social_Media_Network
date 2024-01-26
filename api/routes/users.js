import express from "express";
import { getUser,updateUser }   from "../controllers/user.js";


//created routes object to handle different routes and HTTP methods
const router = express.Router();


//takes to parameter one route path and second callback fucntion
router.get("/find/:userId", getUser );
router.put("/", updateUser);

export default router;