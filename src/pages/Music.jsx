import { useEffect } from 'react'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AudioPlayer from "../components/AudioPlayer";
import { Music, Home } from "lucide-react";

const Musics = () => {

  useEffect(() => {
      document.title = `கவிதை 🎧 Music`
      document.querySelector('meta[name="description"]').setAttribute(
        'content',
        `கவிதை 🎧 Music - Daily kavithai and Tamil Quotes Updates.`
      )
      document.querySelector('link[rel="canonical"]').setAttribute('href', window.location.href)
    }
  )
 
  return (
    <>
    <Navbar />
    <section className="section full-height">
    <div className="container">
    <div className="columns is-centered">
    <div className="column is-half">
      <div className="card">
        <div className="card-content">
          <Music size={30} className="has-text-danger mb-5" />
          <AudioPlayer src="https://christmaswish.pages.dev/kavithai.mp3" title="கவிதை 🎧" />
        </div>
      </div>
      <div className="buttons is-centered">
        <Link to="/" className="button is-warning mt-4 mb-4 is-flex is-align-items-center">
          <Home size={16} className="mr-2" /> Back to Home
      </Link>
      </div>
      </div>
      </div>
      </div>
      </section>
    </>
  );
};

export default Musics;
