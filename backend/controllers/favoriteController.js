const {
    Favorite
} = require('../models/Favorite');
const Video = require('../models/Video');
const Music = require('../models/Music');
const Reading = require('../models/Reading');

module.exports = {
    async addFavorite(req, res) {
        try {
            const {
                contentId,
                contentType
            } = req.body;
            const userId = req.userId;

            // Cek apakah sudah ada di favorit
            const existingFavorite = await Favorite.findOne({
                where: {
                    userId,
                    contentId,
                    contentType
                }
            });

            if (existingFavorite) {
                return res.status(400).json({
                    error: 'Content already in favorites'
                });
            }

            const favorite = await Favorite.create({
                userId,
                contentId,
                contentType
            });

            res.status(201).json({
                message: 'Added to favorites successfully',
                favorite
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async removeFavorite(req, res) {
        try {
            const {
                contentId,
                contentType
            } = req.params;
            const userId = req.userId;

            await Favorite.destroy({
                where: {
                    userId,
                    contentId,
                    contentType
                }
            });

            res.json({
                message: 'Removed from favorites successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getFavorites(req, res) {
        try {
            const userId = req.userId;
            const favorites = await Favorite.findAll({
                where: {
                    userId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            // Get detailed content for each favorite
            const detailedFavorites = await Promise.all(
                favorites.map(async (fav) => {
                    let content;
                    switch (fav.contentType) {
                        case 'video':
                            content = await Video.findByPk(fav.contentId);
                            break;
                        case 'music':
                            content = await Music.findByPk(fav.contentId);
                            break;
                        case 'reading':
                            content = await Reading.findByPk(fav.contentId);
                            break;
                        default:
                            content = null;
                    }
                    return {
                        ...fav.toJSON(),
                        content
                    };
                })
            );

            res.json(detailedFavorites);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};