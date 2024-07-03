const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listingController.js");

//index route
router.get("", wrapAsync(listingController.index)
);


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);
router.post("/",
    validateListing,
    isLoggedIn,
    wrapAsync(listingController.addingNewListing )
);


//Update route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync( listingController.renderEditForm)
);
router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.editListing )
);


//Delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deletelisting )
);

// show route
router.get("/:id",wrapAsync(listingController.showListings)
);
router.post("/:id/cart",
    isLoggedIn,
    wrapAsync(listingController.addToCart )
);

module.exports=router;
