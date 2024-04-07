const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const feedBackController = require("../controllers/feedbackController");

// Route to create a new FeedBack
router.post(
  "/uploadFeedBack",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("mobile").isLength({ min: 11 }),
    check("subject").not().isEmpty(),
    check("message").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    feedBackController.createFeedBack(req, res, next);
  }
);

// Route to get FeedBack
router.get("/getFeedBack", feedBackController.getFeedBack);

// Route to get a specific feedback by ID
router.get("/:id", feedBackController.getFeedBackById);

// Route to delete feedback
router.delete("/:id", feedBackController.deleteFeedBack);

module.exports = router;
