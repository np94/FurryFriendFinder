const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const Announce = require("../models/Announce");
const router = express.Router();
const uploader = require("../config/cloudinary");

// http://localhost:4000/api/annouce
router.get("/", (req, res, next) => {
  // Get all the burgers
  Announce.find({})
    .populate("id_user")
    .then((annouceDocuments) => {
      res.status(200).json(annouceDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/announce/{some-id}
router.get("/:id", (req, res, next) => {
  const announce = { ...req.body };
  if (req.file && req.file.path) {
    announce.image = req.file.path;
  }
  //Get one specific annouce
  Announce.findById(req.params.id)
    .then((annouceDocument) => {
      res.status(200).json(annouceDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/announce/{some-id}
router.patch(
  "/:id",
  requireAuth,
  uploader.single("image"),
  (req, res, next) => {
    const announce = { ...req.body };

    Announce.findById(req.params.id)
      .then((announceDocument) => {
        if (!announceDocument)
          return res.status(404).json({ message: "Report not found" });
        if (announceDocument.id_user.toString() !== req.session.currentUser) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) {
          announce.image = req.file.path;
        }

        Announce.findByIdAndUpdate(req.params.id, announce, { new: true })
          .populate("id_user")
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
      })
      .catch(next);
  }
);

// http://localhost:4000/api/announce
router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.image = req.file.path;
  }
  updateValues.id_user = req.session.currentUser;
  // Create an announcement
  Announce.create(updateValues)
    .then((announceDocument) => {
      announceDocument
        .populate("id_user")
        .execPopulate()
        .then((announce) => {
          console.log("here");
          res.status(201).json(announce);
        })
        .catch(next);
    })
    .catch(next);
});

// http://localhost:4000/api/annouce/{some-id}
router.delete("/:id", requireAuth, (req, res, next) => {
  Announce.findById(req.params.id)
    .then((announceDocument) => {
      if (!announceDocument) {
        return res.status(404).json({ message: "Report not found" });
      }
      if (announceDocument.id_user.toString() !== req.session.currentUser) {
        return res
          .status(403)
          .json({ message: "You can't delete this announcement" });
      }

      Announce.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
