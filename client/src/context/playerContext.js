import { createContext } from 'react';

const playerContext = createContext({
    songs: [],
    addSong: (song) => {},
    removeSong: (id) => {},
    moveSong: (startIndex, endIndex) => {}
});

export default playerContext;
