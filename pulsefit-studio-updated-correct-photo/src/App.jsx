import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Apple, CalendarDays, Check,
  ChevronDown, Clock3, Dumbbell, Flower2, Heart, Menu, MessageCircle, MoveUpRight,
  Play, Send, Sparkles, UsersRound, UserRound, X, Zap, Instagram, MapPin, Mail,
  Phone, ShieldCheck, Flame, Plus, Minus
} from 'lucide-react'
import { services, classes, team } from './data'

const iconMap = { Dumbbell, UserRound, UsersRound, Flower2, Apple, Activity }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return <header className="header">
    <div className="container nav-wrap">
      <Link to="/" className="brand" aria-label="PulseFit Studio home">
        <span className="brand-mark"><Activity size={23} strokeWidth={2.7}/></span>
        <span>PULSEFIT<span className="brand-light">STUDIO</span></span>
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button>
      <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/team">Our team</NavLink>
        <button className="button button-orange nav-cta" onClick={onBook}>Book a free trial <ArrowUpRight size={16}/></button>
      </nav>
    </div>
  </header>
}

function Footer({ onBook }) {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div><Link to="/" className="brand brand-footer"><span className="brand-mark"><Activity size={23}/></span><span>PULSEFIT<span className="brand-light">STUDIO</span></span></Link><p className="footer-note">Your energy. Your community. Your pulse.</p></div>
        <div className="footer-links"><span className="eyebrow">EXPLORE</span><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/team">Our team</Link></div>
        <div className="footer-links"><span className="eyebrow">LET'S CONNECT</span><span className="footer-placeholder"><MapPin size={15}/> City-centre location — details to come</span><span className="footer-placeholder"><Mail size={15}/> Contact details to come</span><button className="text-link" onClick={onBook}>Book a free trial <ArrowRight size={15}/></button></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} PulseFit Studio. Student project demo.</span><span>Move with purpose <Heart size={13} fill="currentColor"/></span></div>
    </div>
  </footer>
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
    <span className="eyebrow"><span className="eyebrow-dot"/> {eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
}

function ServiceCard({ item, index }) {
  const Icon = iconMap[item.icon] || Activity
  return <motion.article className="service-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .45, delay: (index % 3) * .08 }}>
    <Link to="/services" className="service-image-wrap" aria-label={`Explore ${item.title}`}>
      <img src={item.image} alt="" loading="lazy"/><span className="service-number">{item.number}</span><span className="image-arrow"><ArrowUpRight size={19}/></span>
    </Link>
    <div className="service-card-body"><div className="service-meta"><Icon size={16}/><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p><Link to="/services" className="text-link">Explore service <ArrowRight size={15}/></Link></div>
  </motion.article>
}

function TrialModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', service: 'Group fitness', date: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  useEffect(() => { if (open) { setSuccess(false); setErrors({}) } }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  function submit(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.date) next.date = 'Please choose a preferred date.'
    setErrors(next)
    if (!Object.keys(next).length) setSuccess(true)
  }
  return <AnimatePresence>{open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: .98 }} transition={{ duration: .22 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close booking form"><X size={20}/></button>
      {!success ? <>
        <span className="eyebrow"><span className="eyebrow-dot"/> YOUR FIRST STEP</span><h2 id="booking-title">Find your <span className="orange-text">pulse.</span></h2><p className="modal-intro">Tell us what you're interested in. This demo form won't send or save your details.</p>
        <form onSubmit={submit} noValidate>
          <label>Full name<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" aria-invalid={!!errors.name}/>{errors.name && <small className="field-error">{errors.name}</small>}</label>
          <label>Email address<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com" aria-invalid={!!errors.email}/>{errors.email && <small className="field-error">{errors.email}</small>}</label>
          <label>What would you like to try?<select value={form.service} onChange={e => setForm({...form, service:e.target.value})}><option>Group fitness</option><option>Fully equipped gym</option><option>Personal training</option><option>Yoga & wellness</option><option>Nutrition coaching</option></select></label>
          <label>Preferred date<input type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e => setForm({...form, date:e.target.value})} aria-invalid={!!errors.date}/>{errors.date && <small className="field-error">{errors.date}</small>}</label>
          <button className="button button-orange button-full" type="submit">Request a trial <ArrowRight size={17}/></button>
          <p className="form-disclaimer"><ShieldCheck size={14}/> Demo only — no information is transmitted.</p>
        </form>
      </> : <div className="booking-success"><div className="success-icon"><Check size={30}/></div><span className="eyebrow">LOOKING GOOD</span><h2>Thanks, {form.name.split(' ')[0]}!</h2><p>Your demo request is complete. No real booking was created and your details have not been sent.</p><button className="button button-dark button-full" onClick={onClose}>Back to the site <ArrowRight size={17}/></button></div>}
    </motion.div>
  </motion.div>}</AnimatePresence>
}

const botResponses = [
  { keys: ['service', 'offer', 'gym', 'training'], answer: 'We offer a fully equipped gym, personal training, group fitness, yoga & wellness, nutrition coaching and a fitness-tracking app concept. Visit our Services page to explore them.', link: '/services', label: 'Explore services' },
  { keys: ['class', 'hiit', 'yoga', 'schedule', 'time'], answer: 'Our sample class schedule includes HIIT, strength, functional fitness and yoga. Times shown on the site are illustrative for this project.', link: '/services', label: 'View sample classes' },
  { keys: ['beginner', 'start', 'new'], answer: 'Absolutely — PulseFit is designed around inclusivity and progress at your own pace. Choose a starting point that feels right for you and ask a coach for guidance.', link: '/services', label: 'Explore services' },
  { keys: ['book', 'trial', 'join'], answer: 'You can try our demo booking form using the “Book a free trial” button. Just a heads-up: it demonstrates the interface and does not create a real booking.', action: 'book', label: 'Open trial form' },
  { keys: ['team', 'trainer', 'coach', 'staff'], answer: 'Our team page is ready for trainer profiles. The current names and photos are placeholders, ready to be replaced with real staff details.', link: '/team', label: 'Meet the team' },
  { keys: ['app', 'track', 'progress'], answer: 'The fitness tracking app is presented as a concept, with ideas like activity summaries, workout history and weekly goals. It is not a live connected app.', link: '/services', label: 'See the concept' },
  { keys: ['price', 'cost', 'membership'], answer: 'Membership prices have not been supplied yet, so we have not made up any prices. You can add official membership details when they are available.' },
  { keys: ['where', 'address', 'location', 'contact'], answer: 'PulseFit is described as a city-centre studio, but its exact address and contact details are not available yet.' },
]
function PulseBot({ onBook }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hey there! 👋 I'm PulseBot, your PulseFit guide. Ask me about services, classes, getting started or fitness basics." }])
  async function respond(text) {
    const question = text.trim()
    if (!question || loading) return
    setMessages(prev => [...prev, { from: 'user', text: question }])
    setInput('')
    setLoading(true)
    try {
      const history = messages.slice(-8).map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'The AI service is not configured yet.')
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }])
    } catch (err) {
      const match = botResponses.find(r => r.keys?.some(k => k && question.toLowerCase().includes(k)))
      const fallback = match?.answer || 'The live AI connection is not configured yet. Ask about services, classes, trainers or trial booking, and I can show a basic response for now.'
      setMessages(prev => [...prev, { from: 'bot', text: `${fallback} ${err.message.includes('not configured') ? 'To enable real AI, add OPENAI_API_KEY in Vercel → Settings → Environment Variables, then redeploy.' : 'The AI service could not respond just now. Please try again shortly.'}`, link: match?.link, label: match?.label, action: match?.action }])
    } finally { setLoading(false) }
  }
  return <>
    <button className={`bot-launcher ${open ? 'bot-launcher-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close PulseBot' : 'Open PulseBot'}>{open ? <X size={23}/> : <MessageCircle size={23}/>}<span className="bot-pulse"/></button>
    <AnimatePresence>{open && <motion.aside className="bot-panel" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }} role="dialog" aria-label="PulseFit AI assistant">
      <div className="bot-header"><div className="bot-avatar"><Activity size={20}/></div><div><strong>PulseFit AI</strong><span><i/> Fitness studio assistant</span></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18}/></button></div>
      <div className="bot-messages" aria-live="polite">{messages.map((m, i) => <div key={i} className={`chat-message ${m.from === 'user' ? 'chat-user' : 'chat-bot'}`}><p>{m.text}</p>{m.link && <Link className="bot-action" to={m.link} onClick={() => setOpen(false)}>{m.label} <ArrowUpRight size={13}/></Link>}{m.action === 'book' && <button className="bot-action" onClick={() => { setOpen(false); onBook() }}>{m.label} <ArrowUpRight size={13}/></button>}</div>)}</div>
      <div className="bot-suggestions">{['What services do you offer?', 'Can beginners join?', 'How do I book?'].map(q => <button key={q} onClick={() => respond(q)}>{q}</button>)}</div>
      <form className="bot-input" onSubmit={e => { e.preventDefault(); respond(input) }}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask PulseFit AI..." aria-label="Message PulseBot"/><button type="submit" aria-label="Send message" disabled={!input.trim() || loading}>{loading ? <span className="bot-loading-dots">…</span> : <Send size={17}/>}</button></form>
      <div className="bot-disclaimer">AI replies are generated when the server API key is configured.</div>
    </motion.aside>}</AnimatePresence>
  </>
}

function Home({ onBook }) {
  const [faqOpen, setFaqOpen] = useState(0)
  const values = [
    { icon: Heart, title: 'Inclusivity', text: 'A welcoming space for every starting point.' },
    { icon: Flame, title: 'Motivation', text: 'Find your drive, one session at a time.' },
    { icon: UsersRound, title: 'Community', text: 'Good people make good progress.' },
    { icon: Flower2, title: 'Wellbeing', text: 'Strength that goes beyond the gym.' },
    { icon: Sparkles, title: 'Innovation', text: 'A fresh take on your fitness routine.' },
  ]
  const faqs = [
    ['Is PulseFit suitable for beginners?', 'Yes. Inclusivity is one of our core values, and the site is designed to welcome people at different stages of their fitness journey.'],
    ['Can I try a class before joining?', 'Use the free-trial demo form to explore how a request would work. It is a website demonstration, not a live booking.'],
    ['Are the class times real?', 'No. The schedule is illustrative sample content created for this project and should be replaced with confirmed studio information.'],
  ]
  return <>
    <section className="hero">
      <div className="hero-bg-shape"/><div className="container hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <span className="eyebrow"><span className="eyebrow-dot"/> CITY ENERGY. YOUR PACE.</span>
          <h1>YOUR ENERGY.<br/>YOUR <span className="orange-text">COMMUNITY.</span><br/>YOUR PULSE<span className="hero-period">.</span></h1>
          <p className="hero-description">Make room for movement. Find your people. Feel good in your own rhythm.</p>
          <div className="hero-actions"><button className="button button-orange" onClick={onBook}>Book a free trial <ArrowUpRight size={17}/></button><Link to="/services" className="button button-outline">Explore the studio <ArrowDownRight size={17}/></Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span>P</span><span>F</span><span>+</span></div><p><strong>Move your way.</strong><br/><span>Progress looks different on everyone.</span></p></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
          <div className="hero-image-main"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1300&q=90" alt="Modern gym with strength training equipment"/></div>
          <div className="hero-orange-stamp"><Activity size={28}/><span>FIND YOUR<br/>PULSE</span></div>
          <div className="hero-float-card"><span className="float-icon"><Zap size={19}/></span><div><strong>MAKE IT YOURS</strong><span>Your journey starts here.</span></div><ArrowUpRight size={18}/></div>
          <div className="hero-vertical">MOVE WITH PURPOSE — EVERY DAY</div>
        </motion.div>
      </div>
      <div className="hero-bottom-line"><div className="container"><span>TRAIN</span><span className="line"/><span>CONNECT</span><span className="line"/><span>FEEL GOOD</span><span className="line"/><span>REPEAT <ArrowRight size={14}/></span></div></div>
    </section>

    <section className="values-section section-pad">
      <div className="container"><div className="values-intro"><span className="eyebrow"><span className="eyebrow-dot"/> THE PULSEFIT WAY</span><h2>Fitness is more<br/>than a <span className="orange-text">workout.</span></h2><p>It’s the energy you carry out the door, the people who cheer you on, and the small wins that add up.</p></div>
        <div className="values-grid">{values.map((v, i) => <motion.div className="value-item" key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }}><div className="value-icon"><v.icon size={21}/></div><h3>{v.title}</h3><p>{v.text}</p><span className="value-index">0{i + 1}</span></motion.div>)}</div>
      </div>
    </section>

    <section className="services-section section-pad">
      <div className="container"><div className="section-row"><SectionHeading eyebrow="YOUR NEXT MOVE" title={<>Find what moves <span className="orange-text">you.</span></>} text="A little more strength, a little more balance, a whole lot more you."/><Link to="/services" className="button button-dark section-side-cta">All services <ArrowUpRight size={17}/></Link></div>
        <div className="services-grid">{services.slice(0,3).map((s,i)=><ServiceCard key={s.id} item={s} index={i}/>)}</div>
      </div>
    </section>

    <section className="manifesto-section">
      <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1300&q=85" alt="People moving together during a fitness session" loading="lazy"/><div className="manifesto-image-label"><span className="eyebrow">BETTER, TOGETHER</span><strong>Good energy<br/>is contagious.</strong></div></div>
      <div className="manifesto-copy"><span className="eyebrow"><span className="eyebrow-dot"/> MADE FOR REAL LIFE</span><h2>Your calendar is full.<br/>Make space for <span className="orange-text">you.</span></h2><p>Between early starts, busy days and big plans, your wellbeing deserves a place on the list. PulseFit brings movement, community and motivation into your city routine.</p><div className="manifesto-points"><div><span><Check size={16}/></span><p><strong>Move at your pace</strong><small>No one-size-fits-all fitness journey.</small></p></div><div><span><Check size={16}/></span><p><strong>Find your people</strong><small>Training feels different together.</small></p></div><div><span><Check size={16}/></span><p><strong>Celebrate every win</strong><small>Consistency over perfection.</small></p></div></div><Link to="/services" className="text-link">Explore the PulseFit approach <ArrowRight size={16}/></Link></div>
    </section>

    <section className="classes-section section-pad">
      <div className="container"><div className="section-row"><SectionHeading eyebrow="FIND YOUR FLOW" title={<>A class for every <span className="orange-text">kind of you.</span></>} text="Turn up for the energy. Stay for the feeling. Sample classes shown for demonstration."/><Link to="/services" className="text-link section-side-cta">See sample schedule <ArrowRight size={16}/></Link></div>
        <div className="class-preview-grid">{classes.slice(0,3).map((c,i)=><article className={`class-preview class-preview-${i+1}`} key={c.id}><div className="class-preview-top"><span>{c.type}</span><span>{c.duration}</span></div><div><span className="class-time"><Clock3 size={15}/>{c.day} · {c.time}</span><h3>{c.name}</h3><span className="class-coach">{c.coach}</span></div><Link to="/services" className="round-arrow" aria-label={`Explore ${c.name}`}><ArrowUpRight size={19}/></Link></article>)}</div>
      </div>
    </section>

    <section className="team-preview-section section-pad">
      <div className="container"><div className="section-row"><SectionHeading eyebrow="GOOD PEOPLE. GOOD ENERGY." title={<>Meet your <span className="orange-text">cheer squad.</span></>} text="Real progress starts with people who help you feel welcome. Meet the team behind the movement."/><Link to="/team" className="button button-outline section-side-cta">Meet the team <ArrowUpRight size={17}/></Link></div>
        <div className="team-grid team-grid-home">{team.slice(0,3).map((m,i)=><TeamCard key={m.id} member={m} index={i}/>)}</div>
      </div>
    </section>

    <section className="faq-section section-pad">
      <div className="container faq-layout"><div><span className="eyebrow"><span className="eyebrow-dot"/> GOOD TO KNOW</span><h2>Questions?<br/><span className="orange-text">We’ve got you.</span></h2><p>New to PulseFit? Here are a few things you might want to know.</p><button className="button button-dark" onClick={onBook}>Try the booking demo <ArrowRight size={16}/></button></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faqOpen===i?'faq-active':''}`} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)} aria-expanded={faqOpen===i}><span>{q}</span>{faqOpen===i?<Minus size={18}/>:<Plus size={18}/>}</button><AnimatePresence initial={false}>{faqOpen===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div>
    </section>
    <CallToAction onBook={onBook}/>
  </>
}

function CallToAction({ onBook }) {
  return <section className="cta-section"><div className="cta-shape cta-shape-one"/><div className="cta-shape cta-shape-two"/><div className="container cta-content"><span className="eyebrow"><span className="eyebrow-dot"/> YOUR NEXT CHAPTER STARTS HERE</span><h2>READY TO FIND<br/>YOUR <span> PULSE?</span></h2><p>Your pace. Your people. Your kind of progress.</p><button className="button button-white" onClick={onBook}>Book a free trial <ArrowUpRight size={18}/></button><span className="cta-note">Demo booking form · no real reservation is created</span></div><div className="cta-side-text">MOVE · CONNECT · REPEAT</div></section>
}

function TeamCard({ member, index }) {
  const [failed, setFailed] = useState(false)
  return <motion.article className="team-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}}>
    <div className={`team-photo ${failed?'team-photo-fallback':''}`}>{!failed && <img src={member.image} alt={`${member.name} portrait placeholder`} loading="lazy" onError={()=>setFailed(true)}/>}<div className="team-photo-overlay"><span>{member.specialty}</span><span className="team-plus"><ArrowUpRight size={18}/></span></div>{failed&&<div className="team-placeholder-content"><div className="placeholder-avatar"><UserRound size={34}/></div><span>PHOTO PLACEHOLDER</span></div>}</div>
    <div className="team-card-info"><div><h3>{member.name}</h3><p>{member.role}</p></div><span className="team-index">0{member.id}</span></div>
    <p className="team-bio">{member.bio}</p>
  </motion.article>
}

function ServicesPage({ onBook }) {
  const [day, setDay] = useState('All')
  const [type, setType] = useState('All')
  const days = ['All','Mon','Tue','Wed','Thu','Fri','Sat']
  const types = ['All','HIIT','Strength','Yoga','Functional']
  const filtered = useMemo(()=>classes.filter(c=>(day==='All'||c.day===day)&&(type==='All'||c.type===type)),[day,type])
  return <PageTransition><PageHero eyebrow="MOVE YOUR WAY" title={<>Find what moves <span className="orange-text">you.</span></>} text="From strength sessions to slower moments, discover ways to move that fit your goals and your real life." image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1500&q=85"/>
    <section className="services-full-section section-pad"><div className="container"><SectionHeading eyebrow="ONE STUDIO. MANY WAYS TO MOVE." title={<>Your goals. Your <span className="orange-text">starting point.</span></>} text="Explore the PulseFit services and find the next step that feels right for you."/><div className="services-grid services-grid-full">{services.map((s,i)=><ServiceCard key={s.id} item={s} index={i}/>)}</div></div></section>
    <section className="schedule-section section-pad"><div className="container"><div className="section-row"><SectionHeading eyebrow="MAKE TIME FOR YOU" title={<>Find your next <span className="orange-text">session.</span></>} text="A sample class schedule for this website demo. Times and instructors are illustrative only."/></div>
      <div className="schedule-filters"><div className="filter-group"><span>DAY</span><div>{days.map(d=><button key={d} className={day===d?'filter-active':''} onClick={()=>setDay(d)}>{d}</button>)}</div></div><label className="type-filter">CLASS TYPE<select value={type} onChange={e=>setType(e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select></label></div>
      <div className="schedule-list">{filtered.map(c=><article className="schedule-row" key={c.id}><div className="schedule-time"><strong>{c.time}</strong><span>{c.day}</span></div><div className="schedule-class-name"><span className="schedule-type">{c.type}</span><h3>{c.name}</h3><p>{c.coach} · {c.duration}</p></div><button className="schedule-book" onClick={onBook}>Try this class <ArrowUpRight size={16}/></button></article>)}{filtered.length===0&&<div className="empty-state"><CalendarDays size={28}/><h3>No classes match those filters</h3><p>Try a different day or class type.</p><button className="text-link" onClick={()=>{setDay('All');setType('All')}}>Reset filters <ArrowRight size={15}/></button></div>}</div>
      <p className="demo-note"><ShieldCheck size={15}/> This is sample content for a student project. Class requests do not create real bookings.</p>
    </div></section>
    <section className="nutrition-strip"><div className="container nutrition-strip-inner"><div className="nutrition-strip-icon"><Apple size={27}/></div><div><span className="eyebrow">MORE THAN MOVEMENT</span><h2>Build habits that <span className="orange-text">stick.</span></h2><p>Nutrition coaching is about practical guidance and sustainable routines — not quick fixes.</p></div><button className="button button-dark" onClick={onBook}>Explore a trial <ArrowRight size={16}/></button></div></section>
    <CallToAction onBook={onBook}/>
  </PageTransition>
}

function PageHero({ eyebrow, title, text, image }) {
  return <section className="page-hero"><div className="container page-hero-grid"><div className="page-hero-copy"><span className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="page-hero-actions"><Link to="/services" className="button button-orange">Explore services <ArrowUpRight size={17}/></Link><span className="page-hero-small"><Activity size={15}/> MOVE WITH PURPOSE</span></div></div><div className="page-hero-image"><img src={image} alt="PulseFit Studio fitness environment"/><span className="page-image-tag">YOUR NEXT MOVE <ArrowUpRight size={15}/></span></div></div></section>
}

function TeamPage({ onBook }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All','Personal Trainer','Group Fitness Coach','Yoga & Wellness Instructor','Nutrition Coach','Strength & Conditioning Coach']
  const filtered = team.filter(m=>filter==='All'||m.role===filter)
  return <PageTransition><PageHero eyebrow="THE PEOPLE BEHIND THE PROGRESS" title={<>Good people.<br/><span className="orange-text">Great energy.</span></>} text="Meet the people who bring the PulseFit spirit to every session. Some profiles are illustrative concepts for this website mock-up." image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1500&q=85"/>
    <section className="team-page-section section-pad"><div className="container"><div className="section-row"><SectionHeading eyebrow="YOUR CHEER SQUAD" title={<>Meet the <span className="orange-text">team.</span></>} text="Different strengths, shared purpose. Profiles without supplied portraits use a placeholder until photos are added."/></div>
      <div className="team-filters" aria-label="Filter team members">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'team-filter-active':''}>{c}</button>)}</div>
      <div className="team-grid team-grid-full">{filtered.map((m,i)=><TeamCard key={m.id} member={m} index={i}/>)}</div>
      <div className="team-placeholder-note"><Sparkles size={19}/><p><strong>Ready for your photos.</strong><br/>Add team portraits to <code>public/images/team/</code> and update the matching entries in <code>src/data.js</code>.</p></div>
    </div></section><CallToAction onBook={onBook}/>
  </PageTransition>
}

function PageTransition({ children }) {
  return <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28 }}>{children}</motion.main>
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = React.useCallback(() => setBookingOpen(true), [])
  return <><ScrollToTop/><Header onBook={openBooking}/><Routes><Route path="/" element={<Home onBook={openBooking}/>}/><Route path="/services" element={<ServicesPage onBook={openBooking}/>}/><Route path="/team" element={<TeamPage onBook={openBooking}/>}/><Route path="*" element={<PageTransition><section className="not-found container"><span className="eyebrow">LOST YOUR RHYTHM?</span><h1>That page took a rest day.</h1><Link to="/" className="button button-orange">Back home <ArrowRight size={16}/></Link></section></PageTransition>}/></Routes><Footer onBook={openBooking}/><PulseBot onBook={openBooking}/><TrialModal open={bookingOpen} onClose={()=>setBookingOpen(false)}/></>
}

export default App
