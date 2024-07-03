const express=require("express");
const router=express.Router({mergeParams : true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} =require("../middleware.js");
const reviewController=require("../controllers/reviewController.js");

// post route for review
router.post("",isLoggedIn,validateReview,wrapAsync(reviewController.addReview ));

//delete route for review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview)
);

//add to cart


module.exports=router;
