const API_KEY = 'AIzaSyAKmvZTplQauQutSaKxRggegv6phC8kum4';
const {convertDurationFormat} = require('.././helper');

const getVideoInfo = async (url) => {
    try {
        const videoId = url.split('v=')[1];
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${API_KEY}`);
        const json = await response.json();
        const videoTitle = json.items[0].snippet.title;
        const videoDuration = json.items[0].contentDetails.duration;
        const formattedVideoDuration = convertDurationFormat(videoDuration);
        return { title: videoTitle, duration: formattedVideoDuration };
    } catch (error) {
        console.error(`Error fetching video info: ${error}`);
        return null;
    }
};
module.exports =  {
    getVideoInfo
};
