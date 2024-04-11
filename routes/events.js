const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isCSI,isLoggedIn } = require("../middleware.js")
const { eventValidate } = require("../middleware.js");
const eventController = require("../controllers/events.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync( eventController.index ))
.post(isCSI,upload.array("Event[photos]"),eventValidate,wrapAsync( eventController.createEvent))

router.get("/new",isCSI, eventController.renderNewForm );

router.route("/:id")
.get(isLoggedIn, wrapAsync( eventController.showEvent ))
.put(isCSI,upload.array("Event[photos]"), eventValidate,wrapAsync( eventController.updateEvent))
.delete(isCSI,wrapAsync( eventController.destroy))


router.get("/new",isCSI, eventController.renderNewForm );

router.get("/:id/edit",isCSI, wrapAsync( eventController.renderEditForm));

module.exports = router;