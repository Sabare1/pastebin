const viewPaste = (req, res) => {
    const pasteId = req.params.id;
    
    res.send(`
        <html>
            <head>
                <title>Paste ${pasteId}</title>
            </head>
            <body>
                <h1>Paste ${pasteId}</h1>
                <p>This is a demonstration of a paste with ID: ${pasteId}</p>
            </body>
        </html>
    `);
};
module.exports = viewPaste;