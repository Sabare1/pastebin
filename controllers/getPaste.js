const getPaste = (req, res) => {
    const paste = req.result.rows[0];

    res.status(200).json({
        content: paste.content,
        remaining_views: paste.remaining_views,
        expires_at: paste.expires_at
    });
};

module.exports = getPaste;
