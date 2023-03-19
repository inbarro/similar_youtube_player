import React, { useContext } from 'react';
import classes from './Song.module.css';
import playerContext from '../context/playerContext';

function Song({ song, index }) {
    const { songs, removeSong, moveSong } = useContext(playerContext);

    const handleRemoveSong = () => {
        removeSong(song.id);
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain',  song.id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        const songId = event.dataTransfer.getData('text/plain');
        const nextSongPriority = getNextPriority();
        moveSong(songId, song.priority, nextSongPriority);
    };

    const getNextPriority = () => {
        if (index === 0)
            return 0;
        // need to handle drop to the start and end of list
        return songs[index-1].priority;
    };


    return (
        <div
            className={classes.song}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className={classes["song-info"]}>
                <div className={classes["song-title"]}>{song.title}</div>
                <div className={classes["song-duration"]}> {song.duration}</div>
            </div>

            <button className={classes["remove-button"]} onClick={handleRemoveSong}>Remove</button>
        </div>
    );
}

export default Song;
