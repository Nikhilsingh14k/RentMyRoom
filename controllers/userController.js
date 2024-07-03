const User=require("../models/user.js");

module.exports.rendeeSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser= await User.register(newUser,password);
         
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
    
            req.flash("success","Registered Succesfully!");
            res.redirect("/listings");
        })
    
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    }

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/signup.ejs");
}    

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","User Logged Out Succesfully!");
        res.redirect("/listings");
    }
   )
}