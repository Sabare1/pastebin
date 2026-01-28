const checkTime = async (req, res, next) => {
    try {
        // Result fetched from DB in previous middleware
        const result = req.result;

        // testmode
        const testNow = req.headers["x-test-now-ms"];
        const currentTime =
            process.env.TEST_MODE === "1" && testNow
                ? new Date(Number(testNow))
                : new Date();

        const expires_at = result.rows[0].expires_at;

        // If the paste has expired
        if (expires_at && currentTime >= expires_at) {
            return res.status(404).json({
                success: false,
                message: "Paste not found"
            });
        }

        // still have remaning time or unlimited time
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

module.exports = checkTime;
