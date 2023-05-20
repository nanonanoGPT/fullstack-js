import express, { Router } from "express";
import {
    getUser, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser
} from "../controllers/Users.js";

// di gunakan untuk bisa mengakses data harus login terlebih dahulu
import {
    verifyUser,
    admin
} from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', verifyUser, admin, getUserById);
router.post('/users',verifyUser, admin, createUser);
router.patch('/users/:id',verifyUser, admin, updateUser);
router.delete('/users/:id',verifyUser, admin, deleteUser);


export default router;
