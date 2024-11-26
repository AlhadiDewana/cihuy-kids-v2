// backend/middleware/adminCheck.js
const User = require('../models/User');

const adminCheck = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ 
                error: 'Access denied. Admin only.' 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = adminCheck;