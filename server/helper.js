const moment= require('moment');
require('moment-duration-format');

const convertDurationFormat = (ISODuration) => {
    const duration  = moment.duration(ISODuration);
    return duration.format('mm:ss');
};

const maxDuration = (songs) => {
    if ( songs.length === 0 ) return 0;
    //represents getting max value of priority from the songs table
    return Math.max( ...songs
        .filter(song => typeof song.priority === 'number' && !isNaN(song.priority))
        .map(song => Number(song.priority)));
};

module.exports = {
    convertDurationFormat,
    maxDuration
};