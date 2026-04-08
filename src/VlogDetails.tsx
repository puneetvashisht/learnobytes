import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import './index.css';

export default function VlogDetails() {
  return (
    <div className="app-wrapper" data-theme="default" style={{ paddingBottom: '4rem', minHeight: '100vh' }}>

      {/* Background Effect */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Simple Nav */}
      <nav className="navbar" style={{ position: 'relative' }}>
        <div className="logo">
          <Compass size={28} color="var(--accent-secondary)" />
          <span>NomadJourney</span>
        </div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }} className="nav-link">
          <ArrowLeft size={20} color="var(--accent-primary)" /> Back to Hub
        </Link>
      </nav>

      <div style={{ padding: '2rem 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '2rem auto 3rem auto' }}>
          <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '1rem' }}>Featured Playlist</div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Truth & Travel Series
          </h1>
          
          <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Watch my complete series on remote working setups and unfiltered nomad realities globally. Stream the latest updates straight from the playlist.
          </p>
        </div>

        {/* Gumlet Embed Player */}
        <div className="card" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0', overflow: 'hidden', border: '1px solid var(--accent-secondary)' }}>
          <div className="gumlet-playlist-embed">
            <iframe
              loading="lazy"
              title="Truth & Travel"
              src="https://play.gumlet.io/embed/playlist/69ce51ef089517f6f4e0b6de"
              style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
              referrerPolicy="origin"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
