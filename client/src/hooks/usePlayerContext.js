import { useContext } from 'react';
import playlistContext from '../context/playerContext';

function usePlayerContext() {
    const context = useContext(playlistContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}

export default usePlayerContext;
