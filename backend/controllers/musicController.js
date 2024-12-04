const Music = require('../models/Music');
const { validateVideoUrl, validateThumbnailUrl } = require('../utils/validators');

module.exports = {
    async uploadMusic(req, res) {
        try {
            const {
                title,
                musicUrl,
                thumbnailUrl,
                genre,
                isPremium,
                ageRange
            } = req.body;

            // Validasi URL musik dan thumbnail
            if (!validateVideoUrl(musicUrl)) {
                return res.status(400).json({
                    error: 'Invalid music URL. Must be YouTube or Google Drive URL'
                });
            }

            if (!validateThumbnailUrl(thumbnailUrl)) {
                return res.status(400).json({
                    error: 'Invalid thumbnail URL'
                });
            }

            const music = await Music.create({
                title,
                url: musicUrl.trim(),
                thumbnailUrl: thumbnailUrl.trim(),
                genre,
                isPremium: isPremium === 'true',
                ageRange
            });

            res.status(201).json({
                message: 'Music berhasil diupload',
                music
            });
        } catch (error) {
            console.error('Music upload error:', error);
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getMusicList(req, res) {
        try {
            const { page = 1, limit = 10, genre, ageRange, isPremium } = req.query;
            const offset = (page - 1) * limit;

            const query = {};
            if (genre) query.genre = genre;
            if (ageRange) query.ageRange = ageRange;
            if (isPremium !== undefined) query.isPremium = isPremium === 'true';

            const { count, rows: musics } = await Music.findAndCountAll({
                where: query,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']]
            });

            res.json({
                musics,
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getMusicById(req, res) {
        try {
            const music = await Music.findByPk(req.params.id);
            if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });

            res.json(music);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateMusic(req, res) {
        try {
            const music = await Music.findByPk(req.params.id);
            if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });

            if (req.body.musicUrl && !validateVideoUrl(req.body.musicUrl)) {
                return res.status(400).json({ error: 'Invalid music URL' });
            }

            if (req.body.thumbnailUrl && !validateThumbnailUrl(req.body.thumbnailUrl)) {
                return res.status(400).json({ error: 'Invalid thumbnail URL' });
            }

            await music.update(req.body);
            res.json({
                message: 'Music berhasil diupdate',
                music
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async deleteMusic(req, res) {
        try {
            const music = await Music.findByPk(req.params.id);
            if (!music) return res.status(404).json({ error: 'Music tidak ditemukan' });

            await music.destroy();
            res.json({
                message: 'Music berhasil dihapus'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};
