import express, { Router } from "express";
import {
    getProduct, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct
} from "../controllers/Products.js";


// di gunakan untuk membuat fungsi hanya bisa di akses oleh admin
import { 
    verifyUser
} from "../middleware/AuthUser.js"; 

const router = express.Router();

router.get('/Products', verifyUser, getProduct);
router.get('/Products/:id',verifyUser, getProductById);
router.post('/Products',verifyUser, createProduct);
router.patch('/Products/:id',verifyUser, updateProduct);
router.delete('/Products/:id',verifyUser, deleteProduct);


export default router;
