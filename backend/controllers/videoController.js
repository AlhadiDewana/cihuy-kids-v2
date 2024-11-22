const Video = require('../models/Video');

module.exports = {
    async upload(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            }

            const {
                title,
                description,
                url,
                genre,
                isPremium,
                thumbnailUrl,
                ageRange
            } = req.body;

            // Validasi umur
            const validAgeRanges = ['4-5', '6-7', '8-9', '10-12'];
            if (!validAgeRanges.includes(ageRange)) {
                return res.status(400).json({
                    error: 'Invalid age range. Must be one of: 4-5, 6-7, 8-9, 10-12'
                });
            }

            const content = await Video.create({
                title,
                description,
                url,
                genre,
                isPremium,
                thumbnailUrl,
                ageRange
            });

            res.status(201).json({
                message: 'Content uploaded successfully',
                content
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getAllVideos(req, res) {
        try {
            let query = {};
            //filter genre mas
            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            // Filter by age range
            if (req.query.ageRange) {
                query.ageRange = req.query.ageRange;
            }
            const videos = await Video.findAll({
                where: query,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            res.json(videos);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getVideoById(req, res) {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) return res.status(404).json({
                error: 'Video tidak ditemukan'
            });

            if (video.isPremium && req.user.role === 'user') {
                return res.status(403).json({
                    error: 'Video ini hanya untuk pengguna premium'
                });
            }
            res.json(video);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async updateVideo(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            }

            const video = await Video.findByPk(req.params.id);
            if (!video) return res.status(404).json({
                error: 'Video tidak ditemukan'
            });

            await video.update(req.body);
            res.json({
                message: 'Video berhasil diupdate',
                video
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async deleteVideo(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            }

            const video = await Video.findByPk(req.params.id);
            if (!video) return res.status(404).json({
                error: 'Video tidak ditemukan'
            });

            await video.destroy();
            res.json({
                message: 'Video berhasil dihapus'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};