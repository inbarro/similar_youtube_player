const { maxDuration } = require('./helper');
const { getVideoInfo } = require( './services/youtube.service.js');

const express = require('express');
const cors = require('cors');
const app = express();

//db as json
let songs = [];


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;

const router = express.Router();

app.use('/api', router);

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.emit('songs', {songs}); // send songs to the client when they first connect

    socket.on('addSong', async (url) => {
        try {
            const videoInfo = await getVideoInfo(url);
            const priority = maxDuration(songs) + 100;
            const newSong = {
                id: String(Math.floor(Math.random() * 1000)),
                title: videoInfo.title,
                url: url,
                duration: videoInfo.duration,
                priority: priority
            };
            songs.push(newSong);
            io.emit('song-added', {newSong});

        } catch (error) {
            console.error(`failed to add song: ${error.message}`);
        }
    });

    socket.on('removeSong', (id) => {
        try {
            songs = songs.filter((song) => song.id !== id); //take item from table by id

            io.emit('song-removed', {id});

        } catch (error) {
            console.error(`failed to remove song with id ${id}. Error: ${error.message}`);
        }
    });

    socket.on('moveSong', ({songId, startPriority, endPriority}) => {
        try {
            if (endPriority !== startPriority + 1) {
                const newPriority = endPriority + ((startPriority - endPriority) / 2);

                songs = songs.map(song => {
                    if (song.id === songId) {
                        return {...song, priority: newPriority};
                    } else {
                        return song;
                    }
                }); //change song priority in the DB
                io.emit('song-moved', {songId, newPriority});
            } else {
                // implement functionality explained in README
            }

        } catch (error) {
            console.error(`failed to move song with id ${id}. Error: ${error.message}`);

        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
