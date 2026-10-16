(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Responsive navigation
  const menuToggle = $('.menu-toggle');
  const nav = $('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuToggle.textContent = open ? '×' : '☰';
    });
    $$('a', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰';
    }));
  }

  // Reveal-on-scroll animation with a reduced-motion fallback
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Demo booking modal
  const modal = $('.booking-modal');
  const bookingForm = $('.booking-form');
  const bookingSuccess = $('.booking-success');
  let lastFocused = null;
  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false; document.body.classList.add('modal-open');
    if (bookingForm) bookingForm.hidden = false;
    if (bookingSuccess) bookingSuccess.hidden = true;
    setTimeout(() => $('.modal-close', modal)?.focus(), 20);
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true; document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  $$('.book-trigger').forEach(button => button.addEventListener('click', openModal));
  $('.modal-close')?.addEventListener('click', closeModal);
  $('.modal-backdrop')?.addEventListener('click', closeModal);
  $('.close-success')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal && !modal.hidden) closeModal(); });
  if (bookingForm) bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    bookingForm.hidden = true;
    if (bookingSuccess) bookingSuccess.hidden = false;
  });

  // PulseBot: local, pre-written responses only; no external AI service.
  const chatPanel = $('.chat-panel');
  const chatLauncher = $('.chat-launcher');
  const chatMessages = $('.chat-messages');
  const chatForm = $('.chat-form');
  const chatInput = $('input', chatForm || document.createElement('div'));
  function toggleChat(open) {
    if (!chatPanel || !chatLauncher) return;
    chatPanel.hidden = !open;
    chatLauncher.setAttribute('aria-expanded', String(open));
    if (open) chatInput?.focus();
  }
  chatLauncher?.addEventListener('click', () => toggleChat(chatPanel.hidden));
  $('.chat-close')?.addEventListener('click', () => toggleChat(false));
  const answers = [
    { keys: ['service', 'offer', 'what do you do', 'what can i do'], answer: 'PulseFit’s concept includes a fully equipped gym, personal training, group fitness classes, yoga and wellness, nutrition coaching, and the PulseTrack fitness-app concept. Explore the Services page for details.' },
    { keys: ['beginner', 'new', 'start', 'first time', 'fit enough'], answer: 'Everyone starts somewhere! PulseFit is designed around inclusivity and finding a pace that works for you. Specific facilities and coaching details are placeholders in this student-project demo.' },
    { keys: ['book', 'trial', 'reserve', 'session'], answer: 'Tap “Book a Free Trial” anywhere on the site to open the demo form. It shows a confirmation on screen, but it does not send a real booking.' },
    { keys: ['class', 'schedule', 'hiit', 'yoga', 'strength'], answer: 'The Services page has a sample class schedule with day and class-type filters. The timetable is illustrative, not a live schedule.' },
    { keys: ['team', 'trainer', 'coach', 'staff', 'people'], answer: 'Visit the Our Team page to see the staff profile placeholders. You can replace their names, roles, bios and photo paths when you have the real team details.' },
    { keys: ['app', 'track', 'tracking', 'pulsetrack', 'progress'], answer: 'PulseTrack is a concept preview for weekly activity, workout history and goals. It is not connected to a real fitness account.' },
    { keys: ['price', 'cost', 'membership', 'fee'], answer: 'Membership prices have not been provided for this project, so we have not invented any. You can add real plans and prices later.' },
    { keys: ['where', 'address', 'location', 'opening', 'hours', 'contact'], answer: 'The real address and opening hours have not been supplied yet, so they are intentionally not shown as facts. Add official details before publishing as a real business website.' },
    { keys: ['nutrition', 'food', 'diet'], answer: 'Nutrition coaching is presented as general habit-building and wellbeing support. The site does not provide medical advice or promise specific results.' }
  ];
  function addMessage(text, type) {
    const node = document.createElement('div'); node.className = type === 'user' ? 'user-message' : 'bot-message';
    node.textContent = text; chatMessages.appendChild(node); chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function respond(message) {
    const text = message.toLowerCase();
    const match = answers.find(item => item.keys.some(key => text.includes(key)));
    return match ? match.answer : 'I’m a demo assistant with a limited set of prepared answers. Try asking about services, classes, beginners, the team, the app, prices, or the trial form.';
  }
  function sendChat(message) {
    const trimmed = message.trim(); if (!trimmed) return;
    $$('.quick-questions', chatMessages).forEach(el => el.remove());
    addMessage(trimmed, 'user');
    const reply = respond(trimmed);
    window.setTimeout(() => addMessage(reply, 'bot'), 180);
  }
  chatForm?.addEventListener('submit', event => { event.preventDefault(); if (!chatInput) return; sendChat(chatInput.value); chatInput.value = ''; });
  $$('.quick-questions button').forEach(button => button.addEventListener('click', () => sendChat(button.textContent)));

  // Interactive sample class schedule on Services page
  const scheduleList = $('#schedule-list');
  if (scheduleList) {
    const classes = [
      { day: 'Mon', time: '07:15', name: 'Morning Strength', type: 'Strength', coach: '[COACH NAME]', length: '45 MIN' },
      { day: 'Mon', time: '18:00', name: 'Pulse HIIT', type: 'HIIT', coach: '[COACH NAME]', length: '40 MIN' },
      { day: 'Tue', time: '07:30', name: 'Flow & Reset', type: 'Yoga', coach: '[INSTRUCTOR NAME]', length: '50 MIN' },
      { day: 'Tue', time: '18:15', name: 'Full Body Strength', type: 'Strength', coach: '[COACH NAME]', length: '45 MIN' },
      { day: 'Wed', time: '12:15', name: 'Lunchtime HIIT', type: 'HIIT', coach: '[COACH NAME]', length: '30 MIN' },
      { day: 'Wed', time: '18:30', name: 'Mobility Reset', type: 'Mobility', coach: '[INSTRUCTOR NAME]', length: '35 MIN' },
      { day: 'Thu', time: '07:30', name: 'Power & Strength', type: 'Strength', coach: '[COACH NAME]', length: '45 MIN' },
      { day: 'Thu', time: '18:00', name: 'Evening Yoga', type: 'Yoga', coach: '[INSTRUCTOR NAME]', length: '50 MIN' },
      { day: 'Fri', time: '17:30', name: 'Friday HIIT', type: 'HIIT', coach: '[COACH NAME]', length: '40 MIN' },
      { day: 'Fri', time: '18:30', name: 'Stretch & Unwind', type: 'Mobility', coach: '[INSTRUCTOR NAME]', length: '30 MIN' }
    ];
    let selectedDay = 'All';
    const typeSelect = $('#class-filter');
    function renderSchedule() {
      const selectedType = typeSelect?.value || 'All';
      const filtered = classes.filter(item => (selectedDay === 'All' || item.day === selectedDay) && (selectedType === 'All' || item.type === selectedType));
      scheduleList.innerHTML = '';
      if (!filtered.length) { scheduleList.innerHTML = '<div class="empty-state">No sample classes match those filters. Try another day or class type.</div>'; return; }
      filtered.forEach(item => {
        const row = document.createElement('article'); row.className = 'schedule-item';
        row.innerHTML = `<div class="schedule-time">${item.time}<small style="display:block;font:700 9px Inter,sans-serif;color:#999;letter-spacing:1px">${item.day.toUpperCase()}</small></div><div class="schedule-class"><h3>${item.name}</h3><p>${item.coach} · ${item.length}</p></div><span class="schedule-tag">${item.type.toUpperCase()}</span><button class="schedule-book">BOOK THIS CLASS ↗</button>`;
        $('.schedule-book', row).addEventListener('click', openModal);
        scheduleList.appendChild(row);
      });
    }
    $$('.day-tab').forEach(button => button.addEventListener('click', () => {
      $$('.day-tab').forEach(tab => tab.classList.toggle('active', tab === button)); selectedDay = button.dataset.day; renderSchedule();
    }));
    typeSelect?.addEventListener('change', renderSchedule);
    $('[data-scroll-schedule]')?.addEventListener('click', () => $('#schedule')?.scrollIntoView({ behavior: 'smooth' }));
    renderSchedule();
  }

  // Team profile data is deliberately centralised for easy replacement.
  const teamGrid = $('#team-directory-grid');
  if (teamGrid) {
    const staff = [
      { name: '[STAFF MEMBER 01 NAME]', role: 'Personal Trainer', tag: 'PERSONAL TRAINING', bio: '[Add a short introduction about this trainer, their approach and experience.]', photo: 'images/team/staff-member-01.jpg', tone: 'tone-one' },
      { name: '[STAFF MEMBER 02 NAME]', role: 'Group Coach', tag: 'GROUP FITNESS', bio: '[Add a short introduction about this coach and the classes they lead.]', photo: 'images/team/staff-member-02.jpg', tone: 'tone-two' },
      { name: '[STAFF MEMBER 03 NAME]', role: 'Yoga & Wellness', tag: 'YOGA & WELLNESS', bio: '[Add a short introduction about this instructor and their wellness approach.]', photo: 'images/team/staff-member-03.jpg', tone: 'tone-three' },
      { name: '[STAFF MEMBER 04 NAME]', role: 'Personal Trainer', tag: 'PERSONAL TRAINING', bio: '[Add this team member’s biography and training specialities.]', photo: 'images/team/staff-member-04.jpg', tone: 'tone-four' },
      { name: '[STAFF MEMBER 05 NAME]', role: 'Nutrition Coach', tag: 'NUTRITION COACHING', bio: '[Add a short bio and relevant qualifications once confirmed.]', photo: 'images/team/staff-member-05.jpg', tone: 'tone-five' },
      { name: '[STAFF MEMBER 06 NAME]', role: 'Group Coach', tag: 'GROUP FITNESS', bio: '[Add a short introduction about this coach and their approach.]', photo: 'images/team/staff-member-06.jpg', tone: 'tone-six' }
    ];
    function renderTeam(role = 'All') {
      teamGrid.innerHTML = '';
      const filtered = staff.filter(person => role === 'All' || person.role === role);
      if (!filtered.length) { teamGrid.innerHTML = '<div class="empty-state">No team profiles in this category yet.</div>'; return; }
      filtered.forEach(person => {
        const card = document.createElement('article'); card.className = 'staff-card reveal visible';
        const photo = document.createElement('div'); photo.className = `staff-photo ${person.tone}`;
        const label = document.createElement('span'); label.className = 'staff-photo-label'; label.textContent = 'PHOTO PLACEHOLDER'; photo.appendChild(label);
        const img = document.createElement('img'); img.src = person.photo; img.alt = `Portrait of ${person.name}`; img.loading = 'lazy';
        img.addEventListener('load', () => { label.hidden = true; });
        img.addEventListener('error', () => { img.remove(); label.hidden = false; });
        photo.appendChild(img);
        const roleLabel = document.createElement('p'); roleLabel.className = 'profile-role'; roleLabel.textContent = person.tag;
        const name = document.createElement('h3'); name.textContent = person.name;
        const bio = document.createElement('p'); bio.className = 'bio'; bio.textContent = person.bio;
        card.append(photo, roleLabel, name, bio); teamGrid.appendChild(card);
      });
    }
    $$('.team-filter').forEach(button => button.addEventListener('click', () => {
      $$('.team-filter').forEach(filter => filter.classList.toggle('active', filter === button)); renderTeam(button.dataset.role);
    }));
    renderTeam();
  }
})();
