const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.addReview=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    //  console.log(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","new Review Added Succesfully !");
     res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview= async (req,res)=>{
    let { id,reviewId }=req.params;
await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success","Review Deleted Succesfully !");
res.redirect(`/listings/${id}`);
};