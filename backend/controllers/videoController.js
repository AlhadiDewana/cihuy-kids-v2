// backend/controllers/videoController.js
const Video = require('../models/Video');
const { validateVideoUrl, validateThumbnailUrl } = require('../utils/validators');

// Export langsung sebagai object dengan semua method
module.exports = {
    // Get semua video dengan filter dan pagination
    getVideos: async (req, res) => {
        try {
            const { page = 1, limit = 10, category, ageRange, isPremium } = req.query;
            const offset = (page - 1) * limit;

            const query = {};
            if (category) query.category = category;
            if (ageRange) query.ageRange = ageRange;
            if (isPremium !== undefined) query.isPremium = isPremium === 'true';

            const { count, rows: videos } = await Video.findAndCountAll({
                where: query,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']]
            });

            res.json({
                videos,
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get video by ID
    getVideoById: async (req, res) => {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }
            res.json(video);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Upload video baru
    uploadVideo: async (req, res) => {
        try {
            const { title, description, videoUrl, thumbnailUrl, category, isPremium, ageRange } = req.body;
            
            console.log('Received video upload request:', req.body); // Debug

            // Validasi video URL
            if (!validateVideoUrl(videoUrl)) {
                return res.status(400).json({
                    error: 'Invalid video URL. Must be YouTube or Google Drive URL'
                });
            }

            // Validasi thumbnail URL
            if (!validateThumbnailUrl(thumbnailUrl)) {
                return res.status(400).json({
                    error: 'Invalid thumbnail URL'
                });
            }

            const video = await Video.create({
                title,
                description,
                videoUrl: videoUrl.trim(),
                thumbnailUrl: thumbnailUrl.trim(),
                category,
                isPremium: isPremium === 'true',
                ageRange
            });

            res.status(201).json({
                message: 'Video uploaded successfully',
                video
            });
        } catch (error) {
            console.error('Video upload error:', error);
            res.status(500).json({
                error: error.message
            });
        }
    },

    // Update video
    updateVideo: async (req, res) => {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            if (req.body.videoUrl && !validateVideoUrl(req.body.videoUrl)) {
                return res.status(400).json({ error: 'Invalid video URL' });
            }
            if (req.body.thumbnailUrl && !validateThumbnailUrl(req.body.thumbnailUrl)) {
                return res.status(400).json({ error: 'Invalid thumbnail URL' });
            }

            await video.update(req.body);
            res.json({ message: 'Video updated successfully', video });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete video
    deleteVideo: async (req, res) => {
        try {
            const video = await Video.findByPk(req.params.id);
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            await video.destroy();
            res.json({ message: 'Video deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};