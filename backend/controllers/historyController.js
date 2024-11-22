const {
    History
} = require('../models/History');
const Video = require('../models/Video');
const Music = require('../models/Music');
const Reading = require('../models/Reading');

module.exports = {
    async addHistory(req, res) {
        try {
            const {
                contentId,
                contentType
            } = req.body;
            const userId = req.userId;

            // Update if exists, create if not
            const [history] = await History.upsert({
                userId,
                contentId,
                contentType,
                lastAccessed: new Date()
            });

            res.json({
                message: 'History updated successfully',
                history
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async getHistory(req, res) {
        try {
            const userId = req.userId;
            const history = await History.findAll({
                where: {
                    userId
                },
                order: [
                    ['lastAccessed', 'DESC']
                ],
                limit: 50 // Batasi 50 item terakhir
            });

            // Get detailed content for each history item
            const detailedHistory = await Promise.all(
                history.map(async (hist) => {
                    let content;
                    switch (hist.contentType) {
                        case 'video':
                            content = await Video.findByPk(hist.contentId);
                            break;
                        case 'music':
                            content = await Music.findByPk(hist.contentId);
                            break;
                        case 'reading':
                            content = await Reading.findByPk(hist.contentId);
                            break;
                        default:
                            content = null;
                    }
                    return {
                        ...hist.toJSON(),
                        content
                    };
                })
            );

            res.json(detailedHistory);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    async clearHistory(req, res) {
        try {
            const userId = req.userId;
            await History.destroy({
                where: {
                    userId
                }
            });

            res.json({
                message: 'History cleared successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};