const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync( userController.singup ));


router.route("/login")
.get( userController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local",{failureRedirect : "/login",failureFlash:true}), wrapAsync( userController.login));

router.get("/logout", userController.logout);

module.exports = router;