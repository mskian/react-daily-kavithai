import { useRef, useState, useEffect } from "react";
import { CirclePlay, CirclePause } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const AudioPlayer = ({ src, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const updatePlayStatus = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", updatePlayStatus);
    audio.addEventListener("pause", updatePlayStatus);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", updatePlayStatus);
      audio.removeEventListener("pause", updatePlayStatus);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const formatTime = (time) =>
    `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="auto" autoPlay loop />

      <p className="audio-title">{title}</p>

      <button className="play-button" onClick={togglePlay}>
        {isPlaying ? <CirclePause /> : <CirclePlay />}
      </button>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="duration-container">
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="total-duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;