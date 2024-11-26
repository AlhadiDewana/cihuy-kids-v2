// backend/utils/validators.js
module.exports = {
    validateVideoUrl: (url) => {
        if (!url) return false;
        try {
            const urlObj = new URL(url);
            return (
                urlObj.hostname.includes('youtube.com') || 
                urlObj.hostname.includes('youtu.be') ||
                urlObj.hostname.includes('drive.google.com')
            );
        } catch (error) {
            return false;
        }
    },

    validateThumbnailUrl: (url) => {
        if (!url) return false;
        try {
            new URL(url); // Hanya validasi URL valid
            return true;  // Terima semua URL valid
        } catch (error) {
            return false;
        }
    }
};