const viewPaste = (req, res) => {
    const paste = req.result.rows[0];

    // Escape HTML to prevent script execution
    const escapedContent = paste.content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>View Paste</title>
            <style>
                body {
                    font-family: monospace;
                    background: #f6f6f6;
                    padding: 20px;
                }
                pre {
                    background: #fff;
                    padding: 15px;
                    border-radius: 5px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
            </style>
        </head>
        <body>
            <pre>${escapedContent}</pre>
        </body>
        </html>
    `);
};

module.exports = viewPaste;