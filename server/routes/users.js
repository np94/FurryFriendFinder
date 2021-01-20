const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Announce = require("../models/Announce");
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

router.patch(
  "/me",
  requireAuth,
  upload.single("profileImg"),
  (req, res, next) => {
    const userId = req.session.currentUser;
    // If no file is sent, req.file is undefined, leading to an error when trying to
    // acces req.file.path (undefined.path) => Cannot read property path of undefined.
    if (req.file) {
      req.body.user.profileImg = req.file.path; // Add profileImage key to req.body
    }

    console.log(req.body.user);

    User.findByIdAndUpdate(userId, req.body.user, { new: true })
      .select("-password") // Remove the password field from the found document.
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
);

router.get("/me", requireAuth, (req, res, next) => {
  User.findById(req.session.currentUser)
    .select("-password") // Remove the password field from the found document.
    .then((userDocument) => {
      return res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/me/announce", requireAuth, (req, res, next) => {
  const currentUserId = req.session.currentUser; // We retrieve the users id from the session.

  // And then get all the items matching the id_user field that matches the logged in users id.
  Announce.find({ id_user: currentUserId })
    .then((announceDocuments) => {
      res.status(200).json(announceDocuments);
    })
    .catch(next);
});

module.exports = router;
