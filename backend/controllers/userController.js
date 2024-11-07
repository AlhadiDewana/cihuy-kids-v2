const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async upgrade(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) return res.status(404).json({ error: 'User not found' });

      user.isPremium = true;
      await user.save();
      res.status(200).json({ message: 'Account upgraded to premium' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
