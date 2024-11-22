const Video = require('../models/Video');

module.exports = {
 async upload(req, res) {
   try {
     const { title, description, url, genre, isPremium, thumbnailUrl } = req.body;
     const video = await Video.create({
       title, description, url, genre, isPremium, thumbnailUrl
     });
     res.status(201).json({ message: 'Video berhasil diupload', video });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async getAllVideos(req, res) {
   try {
     let query = {};
     if (req.query.genre) {
       query.genre = req.query.genre;
     }
     const videos = await Video.findAll({ where: query });
     res.json(videos);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async getVideoById(req, res) {
   try {
     const video = await Video.findByPk(req.params.id);
     if (!video) return res.status(404).json({ error: 'Video tidak ditemukan' });
     
     if (video.isPremium && req.user.role === 'user') {
       return res.status(403).json({ error: 'Video ini hanya untuk pengguna premium' });
     }
     res.json(video);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async updateVideo(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const video = await Video.findByPk(req.params.id);
     if (!video) return res.status(404).json({ error: 'Video tidak ditemukan' });

     await video.update(req.body);
     res.json({ message: 'Video berhasil diupdate', video });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 },

 async deleteVideo(req, res) {
   try {
     if (req.user.role !== 'admin') {
       return res.status(403).json({ error: 'Unauthorized' });
     }

     const video = await Video.findByPk(req.params.id);
     if (!video) return res.status(404).json({ error: 'Video tidak ditemukan' });

     await video.destroy();
     res.json({ message: 'Video berhasil dihapus' });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 }
};