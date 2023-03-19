import React from "react";
import Player from './components/Player'
import PlayerStateProvider from './components/PlayerStateProvider'


function App() {

  return (
      <>
        <PlayerStateProvider>
        <Player/>
        </PlayerStateProvider>
      </>
  );
}

export default App;

