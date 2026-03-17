const router = require("express").Router();
const Review = require("../models/Review");
const auth = require("../middleware/auth");

// Public: only approved reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Admin: all reviews — MUST be before /:id to avoid "all" being treated as an ID
router.get("/all", auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Public: submit review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

router.patch("/:id/approve", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    review.approved = !review.approved;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

module.exports = router;
