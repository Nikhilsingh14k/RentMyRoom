if(process.env.NODE_ENV !="procuction"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const path=require("path");
// const MONGO_URL="mongodb://127.0.0.1:27017/RentMyRoom";
// const dbUrl=process.env.ATLASDB_URL;

const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

const { isLoggedIn } = require("./middleware.js");

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to database');
//     // Your database operations go here
//   } catch (error) {
//     console.error('Database connection error:', error);
//   } finally {
//     await client.close();
//   }
// }

// connectToDatabase();



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(uri);
}

app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));

const store=MongoStore.create({
    mongoUrl:uri,
    crypto:{
        secret:"abcxyz1234",
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("error in MONGO SESSION STORE",err);
});

const sessionOptions={
    store,
    secret:"abcxyz1234",
    resave:false,
    saveUninitialized:true,
    Cookie:{
        expires:Date.now()+ 14*24*60*60*1000,
        maxAge:14*24*60*60*1000,
        httpOnly:true,
    }
};



app.use(session(sessionOptions));
app.use(flash());
  
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})
app.use("",userRouter);
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);

app.get("/cart",isLoggedIn,wrapAsync( async(req,res)=>{
    const currUser=await User.findById(res.locals.currUser._id).populate("cart");
    res.render("listings/cart.ejs",{currUser});
}));
app.delete("/cart/delete/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params; 
    const currUser = await User.findById(res.locals.currUser._id);
    if (!currUser) {
        req.flash("error", "User not found.");
        return res.redirect("/cart");
    }
    currUser.cart = currUser.cart.filter(itemId => itemId.toString() !== id);
    await currUser.save();
    req.flash("success", "Item removed from cart successfully!");
    res.redirect("/cart");
}));


app.all("*",( req , res , next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err , req ,res ,next)=>{
    let {statusCode=500 , message="Something went wrong"}=err;
    res.status(statusCode).render("listings/error.ejs",{err});
    console.log(err);
    // res.status(statusCode).send("message");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
});