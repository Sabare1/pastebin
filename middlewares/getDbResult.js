const pool = require('../db/database');

const getDbResult = async (req, res, next) => {
    try {
        const pasteId = req.params.id;
        
        // Fetch paste details 
        const result = await pool.query(
            `
            SELECT id, content, expires_at, remaining_views
            FROM pastes
            WHERE id = $1
            `,
            [pasteId]
        );

        // If no paste exists, 404
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Paste not found"
            });
        }

        // Attach DB result to the request for next middlewares/controllers
        req.result = result;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

module.exports = getDbResult;
