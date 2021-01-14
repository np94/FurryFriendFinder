const express = require("express");
const Announce = require("../models/Announce");
const router = express.Router();

// http://localhost:4000/api/annouce
router.get("/", (req, res, next) => {
  // Get all the burgers
  Announce.find()
    .then((annouceDocuments) => {
      res.status(200).json(annouceDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/announce/{some-id}
router.get("/:id", (req, res, next) => {
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
router.patch("/:id", (req, res, next) => {
  // Update a specific
  Announce.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((announceDocument) => {
      res.status(200).json(announceDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/announce
router.post("/", (req, res, next) => {
  // Create an announcement
  Announce.create(req.body)
    .then((announceDocument) => {
      res.status(201).json(announceDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/annouce/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes an announcement
  Announce.findByIdAndRemove(req.params.id)
    .then((announceDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
