import classes from './Playlist.module.css';
import React, { useEffect, useContext } from 'react';
import playerContext from '../context/playerContext';
import AddSongForm from './AddSongForm';
import Song from './Song';

function Playlist() {

    const { songs } = useContext(playerContext);

    return (
        <div className={classes.playlistContainer}>
            <AddSongForm/>
            <div className={classes.songList}>
                {songs && songs.length > 0 && songs.map((song, index) => (
                        <Song
                            draggable={true}
                            className={classes.song}
                            key={song.id}
                            song={song}
                            index = {index}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Playlist;
