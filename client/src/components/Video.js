import React, { useContext } from 'react';
import YouTube from 'react-youtube';
import classes from './Video.module.css'
import playerContext from '../context/playerContext';

function Video() {
    const { songs, removeSong } = useContext(playerContext);
    const opts = {
        height: '550',
        width: '850',
        playerVars: {
            autoplay: 1,
            controls: 1,
            loop: 1,
            disablekb: 1,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1,
            origin: window.location.host,
        },
    };

    const handleEnd = () => {
        if (songs && songs.length > 0) {
            removeSong(songs[0].id);
        }
    };

    return (
        <div >
            <YouTube
                videoId={songs && songs.length > 0 ? songs[0].url?.split('v=')[1] : ''}
                opts={opts}
                onEnd={handleEnd}
                // onReady={(event) => event.target.playVideo()}
            />
        </div>
    );
}

export default Video;
