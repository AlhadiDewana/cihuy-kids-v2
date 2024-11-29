const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cek jika user premium dan masa berlaku
    if (user.role === 'premium') {
      const currentDate = new Date();
      if (user.premiumUntil < currentDate) {
        // Reset ke user biasa jika expired
        user.role = 'user';
        await user.save();
        return res.status(403).json({ 
          error: 'Premium subscription has expired',
          expiredAt: user.premiumUntil
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};