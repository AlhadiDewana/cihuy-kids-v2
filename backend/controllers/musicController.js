// controllers/musicController.js
const Music = require('../models/Music');

module.exports = {
 async upload(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const { title, description, url, genre, isPremium, thumbnailUrl } = req.body;
     const music = await Music.create({
       title,
       description,
       url,
       genre,
       isPremium,
       thumbnailUrl
     });
     res.status(201).json({ message: 'Music berhasil diupload', music });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async getAllMusic(req, res) {
   try {
     let query = {};
     if (req.query.genre) {
       query.genre = req.query.genre;
     }
     const musics = await Music.findAll({ where: query });
     res.json(musics);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async getMusicById(req, res) {
   try {
     const music = await Music.findByPk(req.params.id);
     if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });
     
     if (music.isPremium && req.user.role === 'user') {
       return res.status(403).json({ error: 'Music ini hanya untuk pengguna premium' });
     }
     res.json(music);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async updateMusic(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const music = await Music.findByPk(req.params.id);
     if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });

     await music.update(req.body);
     res.json({ message: 'Music berhasil diupdate', music });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async deleteMusic(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const music = await Music.findByPk(req.params.id);
     if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });

     await music.destroy();
     res.json({ message: 'Music berhasil dihapus' });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 }
};