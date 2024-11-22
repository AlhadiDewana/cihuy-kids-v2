const Reading = require('../models/Reading');

module.exports = {
  async upload(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const { title, content, description, genre, isPremium, thumbnailUrl } = req.body;
      const reading = await Reading.create({
        title,
        content,
        description,
        genre,
        isPremium,
        thumbnailUrl
      });
      res.status(201).json({ message: 'Reading berhasil diupload', reading });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllReading(req, res) {
    try {
      let query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      const readings = await Reading.findAll({ where: query });
      res.json(readings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReadingById(req, res) {
    try {
      const reading = await Reading.findByPk(req.params.id);
      if (!reading) return res.status(404).json({ error: 'Reading tidak ditemukan' });
      
      if (reading.isPremium && req.user.role === 'user') {
        return res.status(403).json({ error: 'Reading ini hanya untuk pengguna premium' });
      }
      res.json(reading);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateReading(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const reading = await Reading.findByPk(req.params.id);
      if (!reading) return res.status(404).json({ error: 'Reading tidak ditemukan' });

      await reading.update(req.body);
      res.json({ message: 'Reading berhasil diupdate', reading });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteReading(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const reading = await Reading.findByPk(req.params.id);
      if (!reading) return res.status(404).json({ error: 'Reading tidak ditemukan' });

      await reading.destroy();
      res.json({ message: 'Reading berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};