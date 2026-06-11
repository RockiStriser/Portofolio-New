/* ===================== Theme Toggle ===================== */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  }
  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ===================== Mobile Navigation ===================== */
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ===================== Active Section Highlighting ===================== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)
        );
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
})();

/* ===================== Typing Animation ===================== */
(function initTyping() {
  const phrases = [
    'Electronics Engineering Student',
    'Arduino Developer',
    'Industrial IoT Enthusiast',
    'Hardware Prototyper',
  ];
  const el = document.getElementById('typingText');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = phrase.slice(0, charIndex);
    let delay = deleting ? 40 : 80;
    if (!deleting && charIndex === phrase.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ===================== Scroll Reveal ===================== */
(function initReveal() {
  // Bidirectional: elements fade in when entering the viewport and
  // fade out when leaving, in both scroll directions.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ===================== Stats Count-Up ===================== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * progress);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => observer.observe(c));
})();

/* ===================== Skill Bars ===================== */
(function initSkillBars() {
  const fills = document.querySelectorAll('.fill');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.level + '%';
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  fills.forEach((f) => observer.observe(f));
})();

/* ===================== Contact Form (mailto handoff) ===================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\n' + data.get('message')
    );
    window.location.href =
      'mailto:bvnpramudito@gmail.com?subject=' + subject + '&body=' + body;
    status.textContent = '✓ Opening your email client to send the message...';
    form.reset();
  });
})();

/* ===================== Animated Circuit Background ===================== */
(function initCircuitCanvas() {
  const canvas = document.getElementById('circuitCanvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    const count = Math.min(60, Math.floor((width * height) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 1.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nodeColor = isDark ? 'rgba(6, 182, 212, 0.8)' : 'rgba(37, 99, 235, 0.6)';
    const lineBase = isDark ? '6, 182, 212' : '37, 99, 235';

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    // Circuit-style connections: right-angle traces between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.35;
          ctx.strokeStyle = 'rgba(' + lineBase + ',' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, a.y); // horizontal then vertical: PCB trace style
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(draw);
  }
})();

/* ===================== 3D Tilt on Cards ===================== */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch devices
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.project-card, .stat-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'translateY(-8px) perspective(900px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===================== Cursor Spotlight on Glass Cards ===================== */
(function initSpotlight() {
  if (window.matchMedia('(hover: none)').matches) return;
  const selector =
    '.project-card, .stat-card, .skill-group, .cert-card, .timeline-card, .contact-form, .objective-card, .interests, .lesson-card, .strengths-card';
  document.querySelectorAll(selector).forEach((card) => {
    const spot = document.createElement('span');
    spot.className = 'spotlight';
    card.appendChild(spot);
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      spot.style.setProperty('--mx', e.clientX - r.left + 'px');
      spot.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });
})();

/* ===================== Smooth Accordion for Project Breakdowns ===================== */
(function initDetailsAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

  document.querySelectorAll('.project-details').forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.details-content');
    let animation = null;
    let isClosing = false;
    let isExpanding = false;

    function finish(open) {
      details.open = open;
      animation = null;
      isClosing = false;
      isExpanding = false;
      details.style.height = '';
      details.style.overflow = '';
    }

    function collapse() {
      isClosing = true;
      const startHeight = details.offsetHeight + 'px';
      const endHeight = summary.offsetHeight + 2 + 'px'; // + border
      if (animation) animation.cancel();
      content.style.opacity = '0';
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 320, easing: EASE }
      );
      animation.onfinish = () => {
        finish(false);
        content.style.opacity = '';
      };
      animation.oncancel = () => { isClosing = false; };
    }

    function expand() {
      isExpanding = true;
      const startHeight = details.offsetHeight + 'px';
      const endHeight = summary.offsetHeight + content.offsetHeight + 2 + 'px';
      if (animation) animation.cancel();
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 420, easing: EASE }
      );
      content.animate(
        { opacity: [0, 1], transform: ['translateY(-6px)', 'translateY(0)'] },
        { duration: 420, delay: 80, fill: 'backwards', easing: EASE }
      );
      animation.onfinish = () => finish(true);
      animation.oncancel = () => { isExpanding = false; };
    }

    function openDetails() {
      details.style.height = details.offsetHeight + 'px';
      details.open = true;
      requestAnimationFrame(expand);
    }

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      details.style.overflow = 'hidden';
      if (isClosing || !details.open) {
        openDetails();
      } else if (isExpanding || details.open) {
        collapse();
      }
    });
  });
})();

/* ===================== Footer Year ===================== */
document.getElementById('year').textContent = new Date().getFullYear();
