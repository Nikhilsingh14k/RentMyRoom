const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/userController.js");

router.get("/signup",userController.rendeeSignupForm);

router.post("/signup",wrapAsync( userController.signup))

router.get("/login",userController.renderLoginForm);

router.get("/logout",userController.logout);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login" ,failureFlash:true}),async(req,res)=>{
    req.flash("success","User registered succesfully !");
    let redirectUrl=(res.locals.redirectUrl||"/listings");
    res.redirect(redirectUrl);
} )
module.exports=router;
