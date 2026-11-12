/* ==========================================================
   ARYAN KUMAR SHAW — INTERACTIVE APP CONTROLLER (UI/UX PRO MAX)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal on sections (Subtle 12-16px y-offset)
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section.querySelectorAll('.glass-card, .section-badge, h2'), {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // ==========================================
  // 1. Dynamic Typing Effect (Hero Section)
  // ==========================================
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Full-Stack Web Platforms',
    'Systems & VCS Internals (C / Java)',
    'Data Structures & Algorithms',
    'Developer Tooling & Docker',
    'Relational DBMS & SQL'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);
  }
  typeRole();

  // ==========================================
  // 2. Synthesized Web Audio Sound Effects
  // ==========================================
  let soundEnabled = true;
  const soundToggleBtn = document.getElementById('sound-toggle');
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCyberTone(frequency, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled
        ? `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i><span class="text-xs font-mono tracking-wider">AUDIO ON</span>`
        : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i><span class="text-xs font-mono tracking-wider">AUDIO OFF</span>`;
      if (window.lucide) window.lucide.createIcons();
      showToast(soundEnabled ? 'Cyber sound effects enabled' : 'Sound effects muted');
      if (soundEnabled) playCyberTone(650, 'sine', 0.12, 0.08);
    });
  }

  // Subtle interactive audio feedback on buttons/chips
  document.querySelectorAll('button, a, .prompt-chip, .skill-tab').forEach((el) => {
    el.addEventListener('mouseenter', () => playCyberTone(880, 'triangle', 0.03, 0.02));
    el.addEventListener('click', () => playCyberTone(1200, 'sine', 0.06, 0.04));
  });

  // ==========================================
  // 3. 3D Tilt & Magnetic Effects on Cards
  // ==========================================
  const tiltCards = document.querySelectorAll('.tilt-element');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ==========================================
  // 4. Interactive "Ask Aryan AI" Terminal Agent
  // ==========================================
  const terminalForm = document.getElementById('terminal-form');
  const agentInput = document.getElementById('agent-input');
  const terminalChat = document.getElementById('terminal-chat');
  const promptChips = document.querySelectorAll('.prompt-chip');

  const knowledgeBase = {
    projects: `🚀 <strong>Aryan's Key Technical Projects:</strong><br/>
1. <strong>Instant Git Live Previewer:</strong> Developer tool & web platform for instant browser-based execution and preview of remote Git repos without local cloning (Node.js, Docker, Git APIs, Tailwind CSS).<br/>
2. <strong>Mini Git Engine:</strong> First-principles recreation of Git VCS internals managing SHA-1 content hashing, tree parsing, blob generation, and commit graphs (C, Java, File I/O, Data Structures).`,
    
    stack: `⚡ <strong>Aryan's Technical Competencies:</strong><br/>
• <strong>Languages:</strong> C, Java, JavaScript (ES6+).<br/>
• <strong>Frontend:</strong> HTML5, CSS3, Tailwind CSS, Responsive Web Design.<br/>
• <strong>Core CS:</strong> Data Structures & Algorithms (DSA), DBMS, SQL.<br/>
• <strong>Tools & Environment:</strong> Git, GitHub, VS Code, CLI / Terminal, Bash, Docker.`,
    
    college: `🎓 <strong>Educational Background:</strong><br/>
• <strong>Degree:</strong> Bachelor of Technology (B.Tech) in Computer Science and Business Systems (CSBS).<br/>
• <strong>Institution:</strong> Narula Institute of Technology (NiT), Kolkata.<br/>
• <strong>Batch / Duration:</strong> 2025 – 2029.<br/>
• <strong>High School (Class 10+2):</strong> Sacred Heart Day High School (Science & Mathematics).`,

    contact: `📬 <strong>How to Contact Aryan:</strong><br/>
• <strong>Email:</strong> <a href="mailto:aryanshaw421@gmail.com" class="text-cyan-400 underline">aryanshaw421@gmail.com</a><br/>
• <strong>Phone:</strong> <a href="tel:+916291366380" class="text-cyan-400 underline">+91 6291366380</a><br/>
• <strong>Location:</strong> Kolkata, West Bengal, India<br/>
• <strong>GitHub:</strong> <a href="https://github.com/aryanshaw421-alt" target="_blank" class="text-cyan-400 underline">github.com/aryanshaw421-alt</a><br/>
• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/aryan-kumar-shaw-70334b254/" target="_blank" class="text-cyan-400 underline">linkedin.com/in/aryan-kumar-shaw</a>`,

    default: `💡 <strong>Aryan's AI Agent:</strong> Aryan Kumar Shaw is a Full Stack Engineer and B.Tech CSBS undergraduate at Narula Institute of Technology (NiT), Kolkata. He specializes in C, Java, JavaScript, Systems/VCS Internals, and Full Stack Web platforms. Feel free to reach him at <strong>aryanshaw421@gmail.com</strong> or <strong>+91 6291366380</strong>.`
  };

  function appendMessage(sender, text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `agent-msg flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`;

    if (isUser) {
      msgDiv.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0">
          <i data-lucide="user" class="w-4 h-4 text-indigo-400"></i>
        </div>
        <div class="msg-bubble bg-indigo-950/50 border border-indigo-500/20 p-3.5 rounded-xl rounded-tr-none text-slate-200 leading-relaxed">
          ${text}
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
          <i data-lucide="bot" class="w-4 h-4 text-cyan-400"></i>
        </div>
        <div class="msg-bubble bg-cyan-950/40 border border-cyan-500/20 p-3.5 rounded-xl rounded-tl-none text-slate-200 leading-relaxed">
          ${text}
        </div>
      `;
    }

    terminalChat.appendChild(msgDiv);
    terminalChat.scrollTop = terminalChat.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
    playCyberTone(isUser ? 500 : 780, 'sine', 0.08, 0.04);
  }

  function handleUserInput(query) {
    if (!query.trim()) return;
    appendMessage('You', query, true);

    // Bot Typing Delay Simulation
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = knowledgeBase.default;

      if (q.includes('project') || q.includes('git') || q.includes('work') || q.includes('build')) {
        response = knowledgeBase.projects;
      } else if (q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('stack') || q.includes('c') || q.includes('java')) {
        response = knowledgeBase.stack;
      } else if (q.includes('college') || q.includes('degree') || q.includes('education') || q.includes('nit') || q.includes('csbs') || q.includes('school')) {
        response = knowledgeBase.college;
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('linkedin')) {
        response = knowledgeBase.contact;
      }

      appendMessage('Agent', response, false);
    }, 400);
  }

  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = agentInput.value;
      agentInput.value = '';
      handleUserInput(val);
    });
  }

  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      handleUserInput(prompt);
    });
  });

  // ==========================================
  // 5. Skills Category Filter Tabs
  // ==========================================
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // ==========================================
  // 6. Resume / CV Modal (View & Print PDF)
  // ==========================================
  const cvModal = document.getElementById('cv-modal');
  const openCvBtns = [document.getElementById('open-cv-btn'), document.getElementById('download-cv-btn')];
  const closeCvBtn = document.getElementById('close-cv-modal');
  const printCvBtn = document.getElementById('print-cv-btn');

  function openCV() {
    if (!cvModal) return;
    cvModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playCyberTone(600, 'sine', 0.1, 0.05);
  }

  function closeCV() {
    if (!cvModal) return;
    cvModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  openCvBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openCV);
  });

  if (closeCvBtn) closeCvBtn.addEventListener('click', closeCV);

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCV();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCV();
  });

  // ==========================================
  // 7. Toast Notification & Copy Email / Phone
  // ==========================================
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.transform = 'translateY(80px)';
      toast.style.opacity = '0';
    }, 2800);
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-address');
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
        playCyberTone(900, 'sine', 0.1, 0.05);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const phoneText = document.getElementById('phone-number');
  if (copyPhoneBtn && phoneText) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = phoneText.textContent.trim();
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Copied ${phone} to clipboard!`);
        playCyberTone(900, 'sine', 0.1, 0.05);
      });
    });
  }

  // ==========================================
  // 8. Contact Form Handling
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Transmission sent! Aryan will reply soon.');
      playCyberTone(1050, 'sine', 0.15, 0.06);
      contactForm.reset();
    });
  }

  // ==========================================
  // 9. Animated Stat Counter
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  let animatedCounters = false;

  function animateCounters() {
    if (animatedCounters) return;
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.max(1, target / 35);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (target === 100 ? '%' : target === 2029 ? '' : '+');
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + (target === 100 ? '%' : target === 2029 ? '' : '+');
        }
      };
      updateCount();
    });
    animatedCounters = true;
  }
  animateCounters();

  // ==========================================
  // 10. Live Visitor Counter (Resilient & Non-Spam)
  // ==========================================
  async function initVisitorCounter() {
    const heroCountEl = document.getElementById('visitor-count-hero');
    const footerCountEl = document.getElementById('visitor-count');
    if (!heroCountEl && !footerCountEl) return;

    const NAMESPACE = 'aryan_kumar_shaw_cv_portfolio';
    const CACHE_KEY = 'aryan_cv_visitor_cache';
    const SESSION_KEY = 'aryan_cv_session_counted';

    const renderCount = (val) => {
      const formatted = typeof val === 'number' ? val.toLocaleString() : val;
      if (heroCountEl) heroCountEl.textContent = formatted;
      if (footerCountEl) footerCountEl.textContent = formatted;
    };

    const animateCount = (startVal, endVal) => {
      if (typeof startVal !== 'number' || typeof endVal !== 'number' || startVal === endVal) {
        renderCount(endVal);
        return;
      }
      const duration = 1200; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Quartic ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startVal + (endVal - startVal) * easeOut);
        renderCount(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          renderCount(endVal);
        }
      }
      requestAnimationFrame(update);
    };

    // 1. Initial display from localStorage cache if available
    const cachedRaw = localStorage.getItem(CACHE_KEY);
    const cachedCount = cachedRaw ? parseInt(cachedRaw, 10) : null;
    if (cachedCount && !isNaN(cachedCount)) {
      renderCount(cachedCount);
    } else {
      renderCount('...');
    }

    // 2. Determine session state (avoid duplicate hits on page refreshes)
    const alreadyCountedInSession = sessionStorage.getItem(SESSION_KEY);
    const action = alreadyCountedInSession ? 'get' : 'hit';

    let resolvedCount = null;

    // 3. Try Primary High-Speed API (Abacus - <500ms edge latency)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const abacusUrl = action === 'hit'
        ? `https://abacus.jasoncameron.dev/hit/aryanshaw.dev/portfolio`
        : `https://abacus.jasoncameron.dev/get/aryanshaw.dev/portfolio`;

      const res = await fetch(abacusUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const count = parseInt(data.value, 10);
        if (!isNaN(count)) resolvedCount = count;
      }
    } catch (e) {
      // Primary API timed out or unreachable
    }

    // 4. Try Secondary Backup API (CountAPI) if primary didn't resolve
    if (resolvedCount === null) {
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 4000);

        const res2 = await fetch(`https://countapi.mileshilliard.com/api/v1/${action}/${NAMESPACE}`, {
          signal: controller2.signal
        });
        clearTimeout(timeoutId2);

        if (res2.ok) {
          const data2 = await res2.json();
          const count2 = parseInt(data2.value, 10);
          if (!isNaN(count2)) resolvedCount = count2;
        }
      } catch (e) {
        // Backup API unreachable
      }
    }

    // 5. Offline / Local fallback if both APIs blocked by network/adblocker
    if (resolvedCount === null) {
      if (cachedCount && !isNaN(cachedCount)) {
        resolvedCount = alreadyCountedInSession ? cachedCount : cachedCount + 1;
      } else {
        resolvedCount = 1;
      }
    }

    // 6. Persist state and trigger sleek smooth animation
    sessionStorage.setItem(SESSION_KEY, 'true');
    localStorage.setItem(CACHE_KEY, resolvedCount.toString());

    if (cachedCount && !isNaN(cachedCount)) {
      animateCount(cachedCount, resolvedCount);
    } else {
      animateCount(0, resolvedCount);
    }
  }

  initVisitorCounter();
});
