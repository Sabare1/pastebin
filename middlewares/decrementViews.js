const pool = require("../db/database");

const decrementViews = async (req, res, next) => {
  try {
    const result = req.result;
    const currentViews = result.rows[0].remaining_views;

    if (currentViews === null) {
      return next();
    }

    // Decrement only if views > 0
    const updateResult = await pool.query(
      `
      UPDATE pastes
      SET remaining_views = remaining_views - 1
      WHERE id = $1
        AND remaining_views > 0
      RETURNING remaining_views
      `,
      [req.params.id]
    );

    // If nothing was updated, treat as unavailable
    if (updateResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Paste not found"
      });
    }

    // Update req.result so controllers get fresh value
    req.result.rows[0].remaining_views =
      updateResult.rows[0].remaining_views;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
};

module.exports = decrementViews;
