import React from 'react';
import classes from './Player.module.css'
import PlayList from './Playlist';
import Video from './Video';


function App() {
    return (
        <div className={classes.player}>
            <PlayList />
            <Video />
        </div>
    );
}

export default App;
