const Listing=require("../models/listing.js");
const User=require("../models/user.js");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.addingNewListing=async (req,res)=>{

    
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","new Listing created Succesfully !");
    res.redirect("/listings");
    };
  
module.exports.renderEditForm=async (req,res)=>{
    let{id}=req.params
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist !");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.editListing=async (req,res)=>{
    let { id }=req.params
await Listing.findByIdAndUpdate(id,{...req.body.listing});
req.flash("success","Listing updated Succesfully");

res.redirect(`/listings/${id}`);
}

module.exports.deletelisting=async (req,res)=>{
    let { id }=req.params
await Listing.findByIdAndDelete(id);
req.flash("success","Listing Deleted Succesfully !");
res.redirect("/listings");
}

module.exports.showListings= async(req,res)=>{
    let{id}=req.params
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author"
    },
}).populate("owner") ;
    if(!listing){
        req.flash("error","Listing you requested for does not exist !");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.addToCart=async(req,res)=>{
    
    
    let { id }=req.params;
    // let user= await User.findById(userId);
 let currUser=await User.findById(res.locals.currUser._id);
    currUser.cart.push(id);
     await currUser.save();
     req.flash("success","Added to Cart Succesfully !");
     res.redirect(`/listings/${id}`);
};