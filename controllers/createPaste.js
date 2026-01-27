const createPaste = (req, res) => {
    res.status(201).json({
        success: true,
        message: "Created paste successfully"
    })
};

module.exports = createPaste;