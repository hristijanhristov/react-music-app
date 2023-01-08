import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="Song Cover" />
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
