import React, { useState, useRef } from "react";
import Library from "./components/Library";
import PlayerOptions from "./components/PlayerOptions";
import Song from "./components/Song";
import "./styles/app.scss";
import chillHop from "./assets/ChillHop";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Calculate Percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage: animation,
    });
  };


  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
      <div className={"App"}>
        <Song currentSong={currentSong} />
        <PlayerOptions
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
        />
        <Library
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
        />
        <audio
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndHandler}
            ref={audioRef}
            src={currentSong.audio}
        ></audio>
      </div>
  );
}

export default App;
