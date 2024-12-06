module.exports = {
    validateVideoUrl: (url) => {
        if (!url) return false;
        try {
            const urlObj = new URL(url);
            return (
                urlObj.hostname.includes('youtube.com') || 
                urlObj.hostname.includes('youtu.be') ||
                urlObj.hostname.includes('drive.google.com') ||
                urlObj.hostname.includes('soundcloud.com') // Tambahkan SoundCloud
            );
        } catch (error) {
            return false;
        }
    },

    validateThumbnailUrl: (url) => {
        if (!url) return false;
        try {
            new URL(url); // Validasi hanya untuk URL valid
            return true;
        } catch (error) {
            return false;
        }
    }
};
