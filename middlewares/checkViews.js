const checkViews = async (req, res, next) => {
    try {
        // Result fetched from DB in previous middleware
        const result = req.result;

        const remaining_views = result.rows[0].remaining_views;

        // If the paste has a view limit and it's exhausted, block access
        if (remaining_views !== null && remaining_views <= 0) {
            return res.status(404).json({
                success: false,
                message: "Paste not found"
            });
        }

        // still have remaning views or unlimited views
        next();
    } catch (error) {
        // Any unexpected error
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

module.exports = checkViews;
