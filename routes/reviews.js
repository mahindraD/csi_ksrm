const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewValidate,isLoggedIn } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

router.post("/",isLoggedIn,reviewValidate, wrapAsync( reviewController.createReview));

router.delete("/:reviewId", wrapAsync( reviewController.destroy));

module.exports = router; 