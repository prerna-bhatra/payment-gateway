const express=require("express");
const router=express.Router();

const {addProduct,getProduct}=require('../controller/product')
const {isAdmin,isAuth}=require('../controller/user');
// console.log("ISAUTH",isAuth)

router.post("/addProduct",isAdmin,addProduct);
router.get("/getProduct",getProduct);

module.exports=router;