import { useState } from 'react';
import { Play, ArrowRight, BookOpen, MapPin, Calendar, Compass, Video, Clock, Search } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TrainingDetails from './TrainingDetails';
import VlogDetails from './VlogDetails';
import data from './data.json';

const getIcon = (iconName: string) => {
  if (iconName === 'Clock') return <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />;
  if (iconName === 'BookOpen') return <BookOpen size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />;
  return null;
};

function HomePage() {
  const [theme, setTheme] = useState('light-minimal');
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery
    ? [
      ...data.vlogs.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase())).map(v => ({ ...v, category: 'Vlog', link: v.link || '#', icon: <Video size={16} color="var(--accent-primary)" /> })),
      ...data.courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ ...c, category: 'Course', link: c.link || '#', icon: <BookOpen size={16} color="var(--accent-secondary)" /> })),
      ...data.trainingSchedule.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ ...t, category: 'Schedule', link: t.link || '#', icon: <Calendar size={16} color="var(--text-secondary)" /> })),
      ...data.travelItinerary.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ ...t, category: 'Travel', link: ((t as any).link as string) || '#', icon: <MapPin size={16} color="var(--accent-secondary)" /> }))
    ].slice(0, 5) // Limit to 5 results
    : [];

  return (
    <div className="app-wrapper" data-theme={theme !== 'default' ? theme : undefined}>
      {/* Background Effect */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <Compass size={28} color="var(--accent-secondary)" />
          <span>NomadJourney</span>
        </div>

        <div className="nav-links">
          <a href="#vlogs" className="nav-link">Vlogs</a>
          <a href="#courses" className="nav-link">Courses</a>
          <a href="#schedules" className="nav-link">Schedules</a>
        </div>

        <div className="nav-actions">
          {/* Search Dropdown */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search vlogs, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="search-dropdown" style={{ display: 'flex', flexDirection: 'column' }}>
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <Link
                      key={result.id}
                      to={result.link}
                      className="search-dropdown-item"
                      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onClick={() => setSearchQuery('')}
                    >
                      {result.icon}
                      <span style={{ flex: 1 }}>{result.title}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{result.category}</span>
                    </Link>
                  ))
                ) : (
                  <div className="search-dropdown-item" style={{ justifyContent: 'center' }}>
                    <span style={{ marginLeft: '10px' }}>No results found for &quot;{searchQuery}&quot;</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Settings 
          <div className="theme-selector">
            <div 
              className={`theme-btn theme-btn-default ${theme === 'default' ? 'active' : ''}`} 
              onClick={() => setTheme('default')}
              title="Slate Theme"
            />
            <div 
              className={`theme-btn theme-btn-ocean ${theme === 'ocean' ? 'active' : ''}`} 
              onClick={() => setTheme('ocean')}
              title="Ocean Theme"
            />
            <div 
              className={`theme-btn theme-btn-emerald ${theme === 'emerald' ? 'active' : ''}`} 
              onClick={() => setTheme('emerald')}
              title="Emerald Theme"
            />
            <div 
              className={`theme-btn theme-btn-sunset ${theme === 'sunset' ? 'active' : ''}`} 
              onClick={() => setTheme('sunset')}
              title="Sunset Theme"
            />
            <div 
              className={`theme-btn theme-btn-light-minimal ${theme === 'light-minimal' ? 'active' : ''}`} 
              onClick={() => setTheme('light-minimal')}
              title="Light Minimal Theme"
            />
            <div 
              className={`theme-btn theme-btn-light-warm ${theme === 'light-warm' ? 'active' : ''}`} 
              onClick={() => setTheme('light-warm')}
              title="Light Warm Theme"
            />
          </div>
          */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">New: Mastering MERN & MEAN Stack Available Now</div>
        <h1 className="hero-title">
          Explore the World, <span>Master Your Craft</span>
        </h1>
        <p className="hero-subtitle">
          Join a community of digital nomads and creators. Follow my travel vlogs, enroll in elite design & development courses, and keep track of my live training and global travel schedules.
        </p>
        <div className="cta-group">
          <button className="btn btn-primary" onClick={() => window.location.href = '#courses'}>
            Start Learning <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href = '#vlogs'}>
            Watch Latest Vlog <Play size={20} />
          </button>
        </div>
      </section>

      {/* Vlogs & Blogs Section */}
      <section id="vlogs">
        <div className="section-header">
          <div>
            <h2 className="section-title"><Video className="text-accent-primary" /> Latest Vlogs & Blogs</h2>
            <p className="section-subtitle">Cinematic travel stories and developer insights</p>
          </div>
          <a href="#" className="view-all">View All <ArrowRight size={18} /></a>
        </div>

        <div className="grid-3">
          {data.vlogs.map((vlog) => {
            const content = (
              <>
                <div className="card-img-container">
                  <img src={vlog.image} alt={vlog.title} className="card-img" />
                  {vlog.isVideo && <div className="play-button"><Play size={24} fill="currentColor" /></div>}
                </div>
                <div className="card-content">
                  <span className="card-tag">{vlog.type}</span>
                  <h3 className="card-title">{vlog.title}</h3>
                  <p className="card-desc">{vlog.description}</p>
                  <div className="card-footer">
                    <span>{getIcon(vlog.footerIcon)} {vlog.footerText1}</span>
                    <span>{vlog.footerText2}</span>
                  </div>
                </div>
              </>
            );

            if (vlog.link && vlog.link !== '#') {
              return (
                <Link key={vlog.id} to={vlog.link} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                  <div className="card" style={{ width: '100%' }}>
                    {content}
                  </div>
                </Link>
              );
            }

            return (
              <div key={vlog.id} className="card">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses">
        <div className="section-header">
          <div>
            <h2 className="section-title"><BookOpen className="text-accent-secondary" /> Premium Course Series</h2>
            <p className="section-subtitle">Level up your skills with comprehensive video training</p>
          </div>
          <a href="#" className="view-all">Browse Catalog <ArrowRight size={18} /></a>
        </div>

        <div className="grid-2">
          {data.courses.map(course => (
            <div key={course.id} className="card">
              <div className="card-img-container">
                <img src={course.image} alt={course.title} className="card-img" />
              </div>
              <div className="card-content">
                <span className="card-tag">{course.type}</span>
                <h3 className="card-title">{course.title}</h3>
                <p className="card-desc">{course.description}</p>
                <div className="card-footer">
                  <span>{course.footerText1}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedules Section */}
      <section id="schedules">
        <div className="section-header">
          <div>
            <h2 className="section-title"><Calendar className="text-accent-primary" /> Agendas & Travel</h2>
            <p className="section-subtitle">Where I am and what I'm teaching next</p>
          </div>
        </div>

        <div className="grid-2">
          {/* Training Schedule */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={24} color="var(--accent-primary)" /> Live Training Schedule
            </h3>
            <div className="timeline">
              {data.trainingSchedule.map(item => (
                <div key={item.id} className="timeline-item" style={item.opacity < 1 ? { opacity: item.opacity } : undefined}>
                  <div className="timeline-date">
                    <h4>{item.date}</h4>
                    <span>{item.subtitle}</span>
                  </div>
                  <div className="timeline-content">
                    {item.link && item.link !== '#' ? (
                      <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 style={{ textDecoration: 'underline' }}>
                          {item.title} {item.badge && <span className="badge-upcoming">{item.badge}</span>}
                        </h3>
                      </Link>
                    ) : (
                      <h3>
                        {item.title} {item.badge && <span className="badge-upcoming">{item.badge}</span>}
                      </h3>
                    )}
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Schedule */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={24} color="var(--accent-secondary)" /> Travel Itinerary
            </h3>
            <div className="timeline">
              {data.travelItinerary.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-date">
                    <h4>{item.date}</h4>
                    <span>{item.subtitle}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>
                      {item.title} {item.badge && <span className="badge-upcoming" style={item.isCurrent ? { background: 'var(--card-border)' } : undefined}>{item.badge}</span>}
                    </h3>
                    <p>{item.description}</p>
                    <div className="location-tag">
                      <MapPin size={14} /> {item.locationTag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={24} color="var(--accent-secondary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>NomadJourney</span>
        </div>
        <p>© 2024 NomadJourney. Designed with passion on the road.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/training/advanced-react" element={<TrainingDetails />} />
        <Route path="/vlogs/truth-and-travel" element={<VlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
