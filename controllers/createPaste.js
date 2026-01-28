const pool = require('../db/database');

const createPaste = async (req, res) => {
    try {
        const {content, ttl_seconds, max_views} = req.body;
    
        if(!content || content.trim() === ""){          // incase content is missing
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }

        if(ttl_seconds && ttl_seconds <= 0){           // incase ttl_seconds is invalid
            return res.status(400).json({
                success: false,
                message: "ttl_seconds must be a positive integer"
            });
        }   

        if(max_views && max_views <= 0){         // incase max_views is invalid
            return res.status(400).json({
                success: false,
                message: "max_views must be a positive integer"
            });
        }
        
        let expires_at = null;

        if(ttl_seconds){       // if ttl_seconds is provided
            const currentTime = new Date();
            expires_at = new Date(currentTime.getTime() + ttl_seconds * 1000);
        }

        let remaining_views = null;
        if(max_views){        // if max_views is provided
            remaining_views = max_views;
        }
        
        // insert values incase all validations are passed
        const result = await pool.query(`
            INSERT INTO pastes (content, expires_at, remaining_views) VALUES ($1, $2, $3) RETURNING id;`,
            [content, expires_at, remaining_views]
        );

        const id = result.rows[0].id;
        const url = `${req.protocol}://${req.get("host")}/p/${id}`;

        res.status(201).json({
            success: true,
            message: "Created paste successfully",
            id: id,
            url: url
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = createPaste;