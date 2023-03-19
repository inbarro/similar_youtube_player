import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import playerContext from '../context/playerContext';

const ENDPOINT = 'http://localhost:4000'; // Change to your server URL


function PlayerStateProvider(props) {

    const [songs, setSongs] = useState([]);
    const [socket, setSocket] = useState(null);
    const [songsByPriority, setSongsByPriority] = useState([]);

    useEffect(() => {
        const newSocket = io(ENDPOINT, {
            withCredentials: true,
            transports: ['websocket', 'polling']
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);



    useEffect(() => {
        if (!socket) {
            return;
        }

        console.log('Connected to server');

        socket.on('songs', (data) => {
            setSongs(data.songs); // Update state with current songs
        });

        socket.on('song-added', (data) => {
            const newSongs = [...songs, data.newSong];
            setSongs(newSongs); // Update state with current songs
        });

        socket.on('song-removed', (data) => {
            const newSongs = songs.filter(song => song.id !== data.id);
            setSongs(newSongs);
        });

        socket.on('song-moved', (data) => {
            const newSongs = songs.map(song => {
                if (song.id === data.songId) {
                    return {...song, priority: data.newPriority};
                } else {
                    return song;
                }
            });
            setSongs(newSongs)
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, [socket, songs]);


    useEffect(() => {
        if (songs) {
            const orderedSongsList = songs.slice().sort((a, b) => a.priority - b.priority);
            setSongsByPriority(orderedSongsList);
        }
    }, [songs]);



    const addSong = (url) => {
        // i could have initial a song here and update the song list immediately to the client songs list with showing
        // just the url first and update the name and the duration after the server is done.
        // i could also use the youtube api here and update the list immediately with the song together with all of its entities.
        // that is not good practice to use api with api key at the client so i didnt choose this solution.
        //instead, the server will create the new song and then will emit it to all clients, including the one that initiate the action.
        socket.emit('addSong', url);
    };

    const removeSong = (id) => {
        socket.emit('removeSong', id);
    };

    const moveSong = (songId, startPriority, endPriority) => {
        socket.emit('moveSong', {songId, startPriority, endPriority});
    };

    return (
        <playerContext.Provider value={{ songs: songsByPriority, addSong, removeSong, moveSong }}>
            {props.children}
        </playerContext.Provider>
    );
}

export default PlayerStateProvider;
