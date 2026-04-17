import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, Compass, Loader2 } from 'lucide-react';
import { useState } from 'react';
import './index.css';
import data from './data.json';

export default function TrainingDetails() {
  const { id } = useParams();
  let training = data.trainingSchedule.find(t => t.id === id) || data.travelItinerary.find(t => t.id === id)
  if (!training) return null;

  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!emailRegex.test(formData.phone.trim()) && !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid email or phone number.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setStatus('submitting');
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2AlsGEqPqeAtNHu5tr47L59UnMMRKKwW_GJZ7cTxBZsxN4_niV31UiTKEVbzB1D75/exec";

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      console.log("Success:", json);
      setStatus("success")
      setFormData({ name: '', phone: '' });

    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error")
    }
  };

  return (
    <div className="app-wrapper" data-theme="light-minimal" style={{ paddingBottom: '4rem', minHeight: '100vh' }}>

      {/* Background Effect */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Simple Nav */}
      <nav className="navbar" style={{ position: 'relative' }}>
        <div className="logo">
          <Compass size={28} color="var(--accent-secondary)" />
          <span>LearnObytes</span>
        </div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }} className="nav-link">
          <ArrowLeft size={20} color="var(--accent-primary)" /> Back to Hub
        </Link>
      </nav>

      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div className="hero-badge" style={{ display: 'inline-block' }}>Upcoming Live Session</div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          <span style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            {training?.title}
          </span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
          {training?.pageDescription}
        </p>

        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}><Calendar color="var(--accent-secondary)" /> Date & Time</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{training?.date}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}><Clock size={16} style={{ display: 'inline', verticalAlign: '-2px' }} /> {training?.subtitle}</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}><MapPin color="var(--accent-primary)" /> Location</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{training?.location}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Details provided upon registration</p>
          </div>
        </div>

        <div className="card" style={{ padding: '3rem', border: '1px solid var(--accent-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle gradient glow inside card */}
          <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 50%)', pointerEvents: 'none' }}></div>

          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Secure Your Registration</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            <Users size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '5px' }} />
            Seats are strictly capped to ensure personalized Q&A.
          </p>

          {status === 'success' ? (
            <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '1rem', textAlign: 'center' }}>
              <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Registration Request Sent!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Puneet will reach out to you shortly via your contact details to complete onboarding.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-primary)' }}>Full Name</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${errors.name ? '#ef4444' : 'var(--card-border)'}`, background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-primary)' }}>Email or WhatsApp Number</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${errors.phone ? '#ef4444' : 'var(--card-border)'}`, background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="john@example.com OR +123456789"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                />
                {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>Oops! Something went wrong communicating with the server. Please check if backend is running.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '1.2rem', marginTop: '1rem', opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                {status === 'submitting' ? ' Sending Registration...' : ' Register Now'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
