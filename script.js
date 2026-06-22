
const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;

const cursor = document.getElementById('cursor');

if (!IS_MOBILE) {

  let cursorX = 0, cursorY = 0, cursorPending = false;
  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (cursorPending) return;
    cursorPending = true;
    requestAnimationFrame(() => {
      cursorPending = false;
      cursor.style.transform = 'translate3d(' + cursorX + 'px, ' + cursorY + 'px, 0) translate(-50%, -50%)';
    });
  }, { passive: true });

  document.querySelectorAll('a, .card-link, .hero-feature').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.querySelectorAll('.hero-feature').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('view'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('view'));
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
}

const SECTIONS = ['hero', 'archive', 'about'];
const PUSH_DURATION = 800;
const PUSH_EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';
let transitioning = false;

let dotGridRaf = null;
let dotGridStart = null;
let dotGridStop = null;

const PROJECTS = {
  'hybrid-construction': {
    name: 'Hybrid Construction',
    type: 'Automation · Assembly',
    blurb: 'Exploring the intersection of automated architecture and platform design, this project investigates both the physical construction system and the software framework required to enable it. The proposed building system combines 3D printed concrete for the primary structure with cross laminated timber for the flooring and secondary walls. To drive the layout, the digital platform extracts site geometry, parcel boundaries, local zoning codes, and environmental data, automatically organizing the program based on these site-specific constraints. The platform then generates the structural framing around the initial massing, seamlessly exporting a BIM ready model alongside construction schedules and analysis diagrams.\n\nmore to come August 2026...',
    credits: 'Instructor: Casey Rehm',
    gallery: [
      'HybridConstruction/hybrid-08.mp4',

      { images: ['HybridConstruction/hybrid-03.mp4', 'HybridConstruction/hybrid-01.webp', 'HybridConstruction/hybrid-02.webp'], cols: 3, rows: 1, cover: true },

      { images: ['HybridConstruction/hybrid-10.webp', 'HybridConstruction/hybrid-07.webp', 'HybridConstruction/hybrid-11.webp', 'HybridConstruction/hybrid-05.webp'], cols: 2, rows: 2 },
      'HybridConstruction/hybrid-12.mp4',
      'HybridConstruction/hybrid-06.webp'
    ]
  },
  'raufwerk': {
    name: 'RaufWerk',
    type: 'AI Augmented Design · Product',
    blurb: 'This project is an experiment in advanced architectural workflows, from initial site analysis and programmatic organization to formal development using MCP in Blender to design the form of the project. The brief called for a flagship store in Chinatown, Los Angeles, centered around a speculative product developed and prototyped with the guidance of Garrett Santo, a Digi-Fab researcher at Nike. My design focuses on a store dedicated to repairing skate shoes with a personalized touch. By tailoring reinforcement to an individual’s unique wear patterns, the project extends the lifespan and performance of the shoe, and allows for personalization over time.\n\nThe design workflow began with a LiDAR scan to capture and analyze the physical site context. Next, a custom Python script extracted the required spatial dimensions and adjacencies from the program brief, packing these requirements directly onto the site. This generated a basic massing, which was then brought into Blender using MCP to develop the form of the project. A centralized document was used to store all of the DNA about the project in order to generate image prompts and branding visuals both spatially in to add to the interior of the building as well as product shots to keep everything cohesive.',
    credits: 'Instructors: Casey Rehm, Garrett Santo',
    gallery: [

      'RaufWerk/raufwerk-03.webp',

      { images: ['RaufWerk/raufwerk-04.mp4', 'RaufWerk/raufwerk-02.mp4'], cols: 2, rows: 1 },

      {
        layout: 'levels', gap: '8px',
        rows: [
          { swatch: 'RaufWerk/raufwerk-22.webp', images: ['RaufWerk/raufwerk-12.webp', 'RaufWerk/raufwerk-14.webp', 'RaufWerk/raufwerk-15.webp', 'RaufWerk/raufwerk-16.webp'] },
          { swatch: 'RaufWerk/raufwerk-23.webp', images: ['RaufWerk/raufwerk-09.webp', 'RaufWerk/raufwerk-08.webp', 'RaufWerk/raufwerk-10.webp', 'RaufWerk/raufwerk-11.webp'] },
          { swatch: 'RaufWerk/raufwerk-24.webp', images: ['RaufWerk/raufwerk-20.webp', 'RaufWerk/raufwerk-21.webp', 'RaufWerk/raufwerk-17.webp', 'RaufWerk/raufwerk-19.webp'] }
        ]
      },
      'RaufWerk/raufwerk-05.mp4',
      'RaufWerk/raufwerk-06.mp4'
    ]
  },
  'l-acoustics': {
    name: 'L-Acoustics',
    type: 'Spatialized AI · Agential Influencer',
    blurb: 'In collaboration with L-Acoustics, this project utilizes their L-ISA spatial audio system to bring an agential AI framework to life within a mock bar exhibition space. Developed alongside Ferras, the system features a social media manager agent that monitors live activity in the room, analyzing the overall mood, tracking conversation topics, and identifying physical traits of the occupants in order to generate contextual social media content. This content is then streamed directly to Twitch to drive digital engagement and curiosity around the physical venue. Simultaneously, a second agent controls the audio mix and spatial location of that audio based on real time occupant locations and the collective room mood, establishing a continuous feedback loop. This loop transforms the installation into a performative environment, prompting visitors to intentionally interact with the system to manipulate both the music and the generated social media content to create a new kind of AI activated space.',
    credits: 'Instructors: Casey Rehm, Ade Ayoade · Partner: Ferras Coulibaly',
    gallery: [
      'LAccoustic/laccoustic-28.webp',

      {
        layout: 'rect-pair',
        images: ['LAccoustic/laccoustic-29.webp', 'LAccoustic/laccoustic-03.webp']
      },

      {
        images: [
          'LAccoustic/laccoustic-01.webp',
          'LAccoustic/laccoustic-02.webp',
          'LAccoustic/laccoustic-04.webp'
        ],
        cols: 3, rows: 1, gap: 0, cover: true
      },

      { layout: 'levels', gap: '8px', rows: [
        { images: ['LAccoustic/laccoustic-05.webp', 'LAccoustic/laccoustic-06.webp', 'LAccoustic/laccoustic-07.webp', 'LAccoustic/laccoustic-08.webp', 'LAccoustic/laccoustic-09.webp'] },
        { images: ['LAccoustic/laccoustic-10.webp', 'LAccoustic/laccoustic-11.webp', 'LAccoustic/laccoustic-12.webp', 'LAccoustic/laccoustic-13.webp', 'LAccoustic/laccoustic-14.webp'] },
        { images: ['LAccoustic/laccoustic-15.webp', 'LAccoustic/laccoustic-16.webp', 'LAccoustic/laccoustic-17.webp', 'LAccoustic/laccoustic-18.webp', 'LAccoustic/laccoustic-19.webp'] },
        { images: ['LAccoustic/laccoustic-20.webp', 'LAccoustic/laccoustic-21.webp', 'LAccoustic/laccoustic-22.webp', 'LAccoustic/laccoustic-23.webp', 'LAccoustic/laccoustic-24.webp'] }
      ] },
      'LAccoustic/laccoustic-25.mp4',
      'LAccoustic/laccoustic-26.mp4'
    ]
  },
  'sears-catalog': {
    name: 'Sears Catalog',
    type: 'Architecture · Reuse',
    blurb: 'This adaptive reuse project looks at how to take an existing building and turn it into a new one. This was done through the tagging of each of the pieces in a Sears catalog house, which were then taken in chunks through a process of automation where the frustum of cameras frame the chunks that are taken from the original. Using security camera logic cameras were places throughout the house to begin the process. Using the chunks taken from the original Norwood House they were then reorganized into a new form that suited how we understood a modern single family home. It was then recovered by remaining materials left over from the tagging process in the beginning as well as a new roof system to finish the project.',
    credits: 'Instructor: Nero He · Group project with Esteban Corona, Kani Willis, and Analise Lopez',
    gallery: [
      'Sears/sears-01.webp',

      { layout: 'rect-pair', images: ['Sears/sears-08.webp', 'Sears/sears-07.webp'] },

      { images: ['Sears/sears-03.webp', 'Sears/sears-05.webp'], cols: 2, rows: 1 },

      { layout: 'rect-pair', contain: true, images: ['Sears/sears-09.mp4', 'Sears/sears-04.webp'] }
    ],

    feature: { image: 'Sears/sears-06.webp', label: 'Featured in Log 61 in an essay by Matt Conway' }
  },
  'combinatory-form': {
    name: 'Combinatory Form',
    type: 'Computational Design',
    blurb: 'These series of objects display the way grasshopper can be used as a generative design tool through the combination of systems. These systems, site, object, and line, all used in conjunction to create an infinite number of computer generated combinatory forms. These infinite number of forms show signs of logical categorization. By far the most common group is fragmentation of the primitive, often creating islands and almost unrecognizable shards. The next group is the more effective in showing combinatory form, whereas the objects are shaped more by the site than by other nested objects. The density of objects is important to note as well due to the overlap and melting of the objects together to create a more unified whole. The model is a continuation of the communication of these ideas calling out the carved surface from the site with brushed graphite white the innermost nested regions are left in their natural rough state showing the difference between the nested and cut elements.',
    credits: 'Instructor: Daniel Prusky',
    gallery: ['CombinatoryForm/combinatory-01.webp', 'CombinatoryForm/combinatory-02.webp', 'CombinatoryForm/combinatory-03.webp']
  },
  'hippotherapy': {
    name: 'HippoTherapy',
    type: 'Architecture · Healthcare',
    blurb: 'Hippotherapy is the use of a horse’s gate to mimic the movement of the human pelvis to speed up recovery. This project is an extension of this therapeutic idea through mimicking the hose’s gate organizationally and formally. The plan was separated logically into its programmatic functions with three wings in the front, medical therapy, psychological therapy, and admin functional spaces. The large connecting space in the back functions as the hippotherapy arena where sessions take place. Organizationally the horse’s gate is where the circulation spaces occur separating the building into standard and eccentric spaces. The forms were all derived from various combinations of both sides of the horse’s gate being lofted together into unique planes which follow the organizational cuts happening in the project.',
    credits: 'Instructor: Steven Roop',
    gallery: ['HippoTherapy/hippotherapy-02.webp', 'HippoTherapy/hippotherapy-03.webp', 'HippoTherapy/hippotherapy-01.webp', 'HippoTherapy/hippotherapy-04.webp']
  },
  'urban-farming': {
    name: 'Urban Farming',
    type: 'Architecture · Urbanism',
    blurb: 'Downtown Lubbock is largely event driven, limiting its day-to-day activity. To incase consistent use, this project introduces, secondary everyday spaces that encourage people to return regularly, not just for special occasions. The main public feature is a food court located off Broadway, the main street downtown. Its appeal comes from its design as well as how it functions. Its food court is fed by its floating greenhouses made possible by its hydroponic conveyor. This vertical urban farm serves both the food court as well as the shared kitchen offered to local food trucks. The shared kitchen serves as a support space for local small businesses to get their start through preparation and storage space as well as a business incubation center that helps them along the way with the goal of introducing brick and mortar locations to further revitalize downtown. By combining sustainable food production, small business support, and a unique public gathering space, the project aims to activate downtown Lubbock through daily use and long-term revitalization.',
    credits: 'Instructor: Deborah Pittman',
    gallery: [
      'UrbanFarming/urbanfarming-02.webp',
      'UrbanFarming/urbanfarming-03.webp',

      { layout: 'rect-pair', contain: true, images: ['UrbanFarming/urbanfarming-04.webp', 'UrbanFarming/urbanfarming-01.webp'] },

      { layout: 'rect-pair', contain: true, images: ['UrbanFarming/urbanfarming-05.webp', 'UrbanFarming/urbanfarming-06.webp'] }
    ]
  }
};

let projectDotsObserver = null;

function playOnlyShotVideos(shotEl) {
  const page = document.getElementById('project-page');
  if (!page) return;
  page.querySelectorAll('video').forEach(v => {
    if (shotEl && shotEl.contains(v)) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      try { v.pause(); } catch (e) {}
    }
  });
}
function pauseProjectVideos() {
  document.querySelectorAll('#project-page video').forEach(v => { try { v.pause(); } catch (e) {} });
}

function buildProjectDots(section) {
  const container = document.getElementById('project-dots');
  if (!container || !section) return;
  if (projectDotsObserver) { projectDotsObserver.disconnect(); projectDotsObserver = null; }
  container.innerHTML = '';

  const targets = [...section.querySelectorAll('.project-hero, .project-meta-row, .project-shot')];
  if (!targets.length) return;

  const dots = targets.map((t, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'project-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Section ' + (i + 1));
    btn.addEventListener('click', () => {
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    container.append(btn);
    return btn;
  });

  projectDotsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = targets.indexOf(entry.target);
      if (idx < 0) return;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      playOnlyShotVideos(entry.target);
    });
  }, {
    root: section,

    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });
  targets.forEach(t => projectDotsObserver.observe(t));
}

(function () {
  const page = document.getElementById('project-page');
  if (!page) return;
  if (IS_MOBILE) return;

  const WINDOW = 55;
  const LOCK = 340;
  const REARM = 80;
  const DUR = 420;

  let acc = 0, deciding = false, locked = false, animating = false, armed = true;
  let idx = 0, rearmTimer = null;

  function positions() {
    const cTop = page.getBoundingClientRect().top;
    const base = page.scrollTop;
    return [...page.querySelectorAll('.project-snap-anchor, .project-meta-row, .project-shot')].map(el => {
      const m = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      return Math.round(base + el.getBoundingClientRect().top - cTop - m);
    });
  }
  function nearestIndex(p, y) {
    let best = Infinity, bi = 0;
    p.forEach((v, i) => { const d = Math.abs(v - y); if (d < best) { best = d; bi = i; } });
    return bi;
  }
  function animateScroll(to, dur) {
    animating = true;
    const start = page.scrollTop, delta = to - start, t0 = performance.now();
    (function frame(t) {
      const k = Math.min(1, (t - t0) / dur);
      page.scrollTop = start + delta * (1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(frame); else animating = false;
    })(performance.now());
  }
  function move(dir, count) {
    const p = positions();
    if (!p.length) return;
    if (!animating) idx = nearestIndex(p, page.scrollTop);
    const next = Math.max(0, Math.min(p.length - 1, idx + dir * count));
    if (next === idx) return;
    idx = next;
    pauseProjectVideos();

    animateScroll(p[idx], DUR);
  }

  page.addEventListener('wheel', e => {
    if (activeSectionId() !== 'project-page') return;
    e.preventDefault();
    let d = e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= page.clientHeight;

    clearTimeout(rearmTimer);
    rearmTimer = setTimeout(() => { armed = true; }, REARM);

    if (locked || !armed) return;
    acc += d;
    if (!deciding) {
      deciding = true;
      setTimeout(() => {
        deciding = false;
        const dir = Math.sign(acc) || 1;
        acc = 0;
        armed = false;
        locked = true;
        setTimeout(() => { locked = false; }, LOCK);
        move(dir, 1);
      }, WINDOW);
    }
  }, { passive: false });
})();

function activeSection() {
  return document.querySelector('.page-section.active');
}

function activeSectionId() {
  const s = activeSection();
  return s ? s.id : 'hero';
}

function switchSection(targetId, opts) {
  opts = opts || {};
  if (transitioning) return;
  const current = activeSection();
  const next = document.getElementById(targetId);
  if (!current || !next || current === next) return;

  if (IS_MOBILE) {
    current.classList.remove('active');
    next.classList.add('active');
    next.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    updateNav(targetId);
    next.scrollTop = 0;
    try { history.replaceState(null, '', '#' + targetId); } catch (e) {}
    onSectionEnter(targetId);
    return;
  }

  const curIdx = SECTIONS.indexOf(current.id);
  const nextIdx = SECTIONS.indexOf(targetId);
  const goingDown = nextIdx > curIdx;

  const isCircle = opts.cx !== undefined && opts.cy !== undefined;

  if (current.id === 'hero' && targetId === 'archive' && !opts.skipHeroTransition && !isCircle) {
    heroToWorkTransition();
    return;
  }

  transitioning = true;

  const red = document.getElementById('transition-red');
  const startY = goingDown ? '100%' : '-100%';

  red.style.transition = 'none';
  red.style.visibility = 'visible';
  red.style.opacity = '1';
  red.style.background = '';

  var circleR = 0;
  if (isCircle) {
    circleR = Math.ceil(Math.max(
      Math.hypot(opts.cx, opts.cy),
      Math.hypot(window.innerWidth - opts.cx, opts.cy),
      Math.hypot(opts.cx, window.innerHeight - opts.cy),
      Math.hypot(window.innerWidth - opts.cx, window.innerHeight - opts.cy)
    ));

    red.style.transform = 'none';
    red.style.clipPath = 'circle(0px at ' + opts.cx + 'px ' + opts.cy + 'px)';
  } else {

    red.style.clipPath = 'none';
    red.style.transform = 'translateY(' + startY + ')';
  }

  const pageStartY = isCircle ? '-100%' : startY;
  next.classList.add('push-in');
  next.style.transition = 'none';
  next.style.transform = 'translateY(' + pageStartY + ')';

  current.classList.add('push-out');

  void red.offsetHeight;
  void next.offsetHeight;

  if (targetId !== 'project-page') {
    next.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  updateNav(targetId);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (isCircle) {
        red.style.transition = 'clip-path 1300ms cubic-bezier(0.76, 0, 0.24, 1)';
        red.style.clipPath = 'circle(' + circleR + 'px at ' + opts.cx + 'px ' + opts.cy + 'px)';
        setTimeout(() => {
          next.style.transition = 'transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)';
          next.style.transform = 'translateY(0)';
        }, 300);
      } else {
        red.style.transition = 'transform 1300ms cubic-bezier(0.76, 0, 0.24, 1)';
        red.style.transform = 'translateY(0)';

        setTimeout(() => {
          next.style.transition = 'transform 1150ms cubic-bezier(0.76, 0, 0.24, 1)';
          next.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });

  let cleaned = false;
  function cleanup() {
    if (cleaned) return;
    cleaned = true;

    current.classList.remove('active', 'push-out');
    current.style.transition = '';
    current.style.transform = '';

    next.classList.remove('push-in');
    next.classList.add('active');
    next.style.transition = '';
    next.style.transform = '';

    red.style.cssText = 'visibility:hidden;opacity:0;';

    transitioning = false;
    try { history.replaceState(null, '', '#' + targetId); } catch (e) {}
    onSectionEnter(targetId);
  }

  next.addEventListener('transitionend', function handler(e) {
    if (e.target !== next || e.propertyName !== 'transform') return;
    next.removeEventListener('transitionend', handler);
    cleanup();
  });

  setTimeout(cleanup, 1500);
}

function openProject(slug, opts) {
  opts = opts || {};
  if (transitioning) return;
  const data = PROJECTS[slug];
  if (!data) return;

  const section = document.getElementById('project-page');
  const titleEl = document.getElementById('project-title-text');
  const subEl = document.getElementById('project-title-sub-text');
  const heroEl = section && section.querySelector('.project-hero');
  const heroImgEl = document.getElementById('project-hero-img');
  const blurbEl = document.getElementById('project-blurb-text');
  const galleryEl = document.getElementById('project-gallery');
  if (!section || !titleEl || !heroEl) return;

  titleEl.textContent = data.name;
  if (subEl) subEl.textContent = data.type;
  if (blurbEl) blurbEl.textContent = data.blurb;
  const creditsEl = document.getElementById('project-credits-text');
  if (creditsEl) creditsEl.textContent = data.credits || '';
  section.dataset.project = slug;

  const metaRow = section.querySelector('.project-meta-row');
  if (metaRow) {
    const existing = metaRow.querySelector('.meta-feature');
    if (existing) existing.remove();
    if (data.feature) {
      const fig = document.createElement('figure');
      fig.className = 'meta-feature';
      const im = document.createElement('img');
      im.src = data.feature.image;
      im.alt = '';
      fig.append(im);
      if (data.feature.label) {
        const lab = document.createElement('figcaption');
        lab.className = 'feature-label';
        lab.textContent = data.feature.label;
        fig.append(lab);
      }
      metaRow.insertBefore(fig, metaRow.firstChild);
    }
  }
  updateProjectPager(slug);
  const heroSrc = (data.gallery && data.gallery[0]) || '';

  let pendingHeroVideo = null;
  if (heroImgEl) {
    const heroIsVid = /\.(mp4|webm|mov)$/i.test(heroSrc);
    const want = heroIsVid ? 'video' : 'img';
    let current = heroImgEl;
    if (current.tagName.toLowerCase() !== want) {
      const fresh = document.createElement(want);
      fresh.id = 'project-hero-img';
      fresh.className = current.className;
      current.replaceWith(fresh);
      current = fresh;
    }
    current.src = heroSrc || '';
    if (heroIsVid) {

      current.loop = true;
      current.muted = true;
      current.playsInline = true;
      current.preload = 'metadata';
      current.setAttribute('playsinline', '');
      current.pause();
      current.currentTime = 0;
      pendingHeroVideo = current;
    } else {
      current.alt = data.name || '';
    }
  }
  if (galleryEl) {
    galleryEl.innerHTML = '';

    function makeMedia(src) {
      const isVid = /\.(mp4|webm|mov)$/i.test(src);
      const el = document.createElement(isVid ? 'video' : 'img');
      el.src = src;
      if (isVid) {

        el.loop = true;
        el.muted = true;
        el.playsInline = true;
        el.preload = 'none';
        el.setAttribute('playsinline', '');
      } else {
        el.alt = data.name;
        el.loading = 'lazy';
      }
      return el;
    }

    function gridFor(n) {
      if (n <= 3) return { cols: n, rows: 1 };
      if (n === 4) return { cols: 2, rows: 2 };
      if (n <= 6) return { cols: 3, rows: 2 };
      if (n <= 9) return { cols: 3, rows: 3 };
      const cols = Math.ceil(Math.sqrt(n));
      return { cols: cols, rows: Math.ceil(n / cols) };
    }
    (data.gallery || []).slice(1).forEach(item => {

      if (item && typeof item === 'object' && item.layout === 'rect-pair') {
        const wrap = document.createElement('div');
        wrap.className = 'project-shot project-shot--rect-pair reveal' + (item.contain ? ' project-shot--rect-pair-contain' : '');
        const inner = document.createElement('div');
        inner.className = 'rect-pair-inner';

        const imgs = item.images.map(entry => {
          const src = typeof entry === 'string' ? entry : entry.src;
          const im = makeMedia(src);
          if (entry && entry.position) im.style.objectPosition = entry.position;
          inner.append(im);
          return im;
        });
        wrap.append(inner);
        galleryEl.append(wrap);
        let loaded = 0;

        const dimW = el => el.naturalWidth || el.videoWidth || 1;
        const dimH = el => el.naturalHeight || el.videoHeight || 1;
        const tryLayout = () => {

          const pairs = imgs.map(i => ({ el: i, ratio: dimW(i) / dimH(i) }))
            .sort((a, b) => b.ratio - a.ratio);

          pairs.forEach(p => inner.append(p.el));
          inner.style.gridTemplateColumns = pairs.map(p => p.ratio + 'fr').join(' ');
        };
        imgs.forEach(im => {
          const isVid = im.tagName === 'VIDEO';
          const ready = isVid ? im.videoWidth : (im.complete && im.naturalWidth);
          if (ready) {
            loaded++;
            if (loaded === imgs.length) tryLayout();
          } else {
            im.addEventListener(isVid ? 'loadedmetadata' : 'load', () => {
              loaded++;
              if (loaded === imgs.length) tryLayout();
            });
          }
        });
        return;
      }

      if (item && typeof item === 'object' && !Array.isArray(item) && Array.isArray(item.images) && item.layout !== 'split') {
        const wrap = document.createElement('div');
        wrap.className = 'project-shot project-shot--group reveal' + (item.cover ? ' project-shot--fill' : '');
        const n = item.images.length;
        const g = item.cols ? { cols: item.cols, rows: item.rows || Math.ceil(n / item.cols) } : gridFor(n);
        wrap.style.setProperty('--cols', g.cols);
        wrap.style.setProperty('--rows', g.rows);
        if (item.gap != null) wrap.style.gap = (typeof item.gap === 'number' ? item.gap + 'px' : item.gap);
        item.images.forEach(src => wrap.append(makeMedia(src)));
        galleryEl.append(wrap);
        return;
      }

      if (item && typeof item === 'object' && !Array.isArray(item) && item.layout === 'split') {
        const wrap = document.createElement('div');
        wrap.className = 'project-shot project-shot--split reveal';
        wrap.style.setProperty('--split-cols', item.columns.length);
        item.columns.forEach(col => {
          const colEl = document.createElement('div');
          colEl.className = 'project-shot__col';
          colEl.style.setProperty('--cols', col.cols || 1);
          colEl.style.setProperty('--rows', col.rows || col.images.length);
          col.images.forEach(src => colEl.append(makeMedia(src)));
          wrap.append(colEl);
        });
        galleryEl.append(wrap);
        return;
      }

      if (item && typeof item === 'object' && !Array.isArray(item) && item.layout === 'levels') {
        const wrap = document.createElement('div');
        wrap.className = 'project-shot project-shot--levels reveal';
        const gap = item.gap != null ? (typeof item.gap === 'number' ? item.gap + 'px' : item.gap) : '8px';

        const maxCells = Math.max(1, ...(item.rows || []).map(r => (r.swatch ? 1 : 0) + ((r.images && r.images.length) || 0)));
        wrap.style.setProperty('--gap', gap);
        wrap.style.setProperty('--cells', maxCells);
        wrap.style.setProperty('--rows', (item.rows || []).length);
        (item.rows || []).forEach(row => {
          const lvl = document.createElement('div');
          lvl.className = 'level';
          if (row.swatch) { const s = makeMedia(row.swatch); s.classList.add('level-swatch'); lvl.append(s); }
          (row.images || []).forEach(src => lvl.append(makeMedia(src)));
          wrap.append(lvl);
        });
        galleryEl.append(wrap);
        return;
      }

      const wrap = document.createElement('div');
      wrap.className = 'project-shot reveal';

      let media = [];
      let cols = null, rows = null;
      if (typeof item === 'string') {
        media = [item];
      } else if (Array.isArray(item) && item.length && Array.isArray(item[0])) {
        rows = item.length;
        cols = Math.max.apply(null, item.map(r => r.length));
        media = item.reduce((acc, row) => acc.concat(row), []);
      } else if (Array.isArray(item)) {
        media = item;
        const g = gridFor(media.length);
        cols = g.cols;
        rows = g.rows;
      }

      if (media.length > 1) {
        wrap.classList.add('project-shot--group');
        wrap.style.setProperty('--cols', cols);
        wrap.style.setProperty('--rows', rows);
      }
      media.forEach(src => wrap.append(makeMedia(src)));
      galleryEl.append(wrap);
    });
  }

  const prevBehavior = section.style.scrollBehavior;
  section.style.scrollBehavior = 'auto';
  section.scrollTop = 0;
  section.style.scrollBehavior = prevBehavior;
  section.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));

  buildProjectDots(section);

  if (IS_MOBILE) {
    const cur = activeSection();
    if (cur && cur !== section) cur.classList.remove('active');
    section.classList.remove('push-in');
    section.style.visibility = '';
    section.classList.add('active');
    section.scrollTop = 0;
    updateNav('project-page');
    onSectionEnter('project-page');
    try { history.replaceState(null, '', '#' + slug); } catch (e) {}
    if (pendingHeroVideo) {
      const p = pendingHeroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    return;
  }

  const sourceImg = opts.sourceImg || null;
  const sourceTitle = opts.sourceTitle || null;
  const sourceSub = opts.sourceSub || null;

  transitioning = true;
  const current = activeSection();

  section.classList.add('push-in');
  section.style.visibility = 'visible';

  const heroDest = heroEl.getBoundingClientRect();
  const titleDest = titleEl.getBoundingClientRect();
  const subDest = subEl ? subEl.getBoundingClientRect() : null;
  const heroSrcRect = sourceImg ? sourceImg.getBoundingClientRect() : null;
  const titleSrcRect = sourceTitle ? sourceTitle.getBoundingClientRect() : null;
  const subSrcRect = (sourceSub && subEl) ? sourceSub.getBoundingClientRect() : null;

  heroEl.style.willChange = 'transform';
  titleEl.style.willChange = 'transform';
  if (subEl) subEl.style.willChange = 'transform';

  if (heroSrcRect) {

    const sx = heroSrcRect.width / heroDest.width;
    const sy = heroSrcRect.height / heroDest.height;
    const s = Math.max(sx, sy);

    const dx = (heroSrcRect.left - heroDest.left) + (heroSrcRect.width - heroDest.width * s) / 2;
    const dy = (heroSrcRect.top - heroDest.top) + (heroSrcRect.height - heroDest.height * s) / 2;
    heroEl.style.transition = 'none';
    heroEl.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')';
  }
  if (titleSrcRect) {
    const dx = titleSrcRect.left - titleDest.left;
    const dy = titleSrcRect.top - titleDest.top;
    titleEl.style.transition = 'none';
    titleEl.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
  }
  if (subSrcRect && subDest) {
    const dx = subSrcRect.left - subDest.left;
    const dy = subSrcRect.top - subDest.top;
    subEl.style.transition = 'none';
    subEl.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
  }

  if (sourceImg) sourceImg.style.opacity = '0';
  if (sourceTitle) sourceTitle.style.opacity = '0';
  if (sourceSub) sourceSub.style.opacity = '0';

  const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const DUR = 720;

  const fadeOuts = [];
  if (current && current.id === 'archive' && sourceTitle) {
    const clickedItem = sourceTitle.closest('.work-item');
    const clickedTop = clickedItem ? clickedItem.getBoundingClientRect().top : 0;
    const TRANSIT = 'transform 700ms linear';
    current.querySelectorAll('.work-item').forEach(item => {
      if (item === clickedItem) return;
      const goesUp = item.getBoundingClientRect().top < clickedTop;
      item.style.transition = TRANSIT;
      item.style.transform = goesUp ? 'translateY(-100vh)' : 'translateY(100vh)';
      fadeOuts.push(item);
    });
    const workImages = current.querySelector('.work-images');
    if (workImages) {
      workImages.style.transition = TRANSIT;
      workImages.style.transform = 'translateY(100vh)';
      fadeOuts.push(workImages);
    }

    const foot = document.getElementById('archive-foot');
    if (foot) foot.classList.remove('visible');
  } else if (current) {

    const others = current.querySelectorAll(
      '#hero-featured, #hero-preview, .hero-tags'
    );
    others.forEach(el => {
      el.style.transition = 'transform ' + DUR + 'ms ' + EASE + ', opacity ' + (DUR - 60) + 'ms ' + EASE;
      el.style.transform = 'translateY(110vh)';
      el.style.opacity = '0';
      fadeOuts.push(el);
    });
  }
  const dotGrid = document.getElementById('dot-grid');
  if (dotGrid) {
    dotGrid.style.transition = 'opacity 280ms ease';
    dotGrid.style.opacity = '0';
    fadeOuts.push(dotGrid);
  }

  updateNav('project-page');

  requestAnimationFrame(() => {
    heroEl.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    heroEl.style.transform = 'none';
    titleEl.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    titleEl.style.transform = 'none';
    if (subEl && subSrcRect) {
      subEl.style.transition = 'transform ' + DUR + 'ms ' + EASE;
      subEl.style.transform = 'none';
    }
  });

  setTimeout(() => {

    heroEl.style.transition = '';
    heroEl.style.transform = '';
    heroEl.style.willChange = '';
    titleEl.style.transition = '';
    titleEl.style.transform = '';
    titleEl.style.willChange = '';
    if (subEl) {
      subEl.style.transition = '';
      subEl.style.transform = '';
      subEl.style.willChange = '';
    }
    if (sourceImg) sourceImg.style.opacity = '';
    if (sourceTitle) sourceTitle.style.opacity = '';
    if (sourceSub) sourceSub.style.opacity = '';
    fadeOuts.forEach(el => {
      el.style.transition = '';
      el.style.transform = '';
      el.style.opacity = '';
    });

    if (current && current !== section) {
      current.classList.remove('active');
    }
    section.classList.remove('push-in');
    section.classList.add('active');

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.remove('is-project');
    const heroTitleSpan = document.querySelector('.hero-title-text');
    if (heroTitleSpan) heroTitleSpan.classList.remove('is-project');

    onSectionEnter('project-page');
    transitioning = false;
    try { history.replaceState(null, '', '#' + slug); } catch (e) {}

    if (pendingHeroVideo) {
      const p = pendingHeroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  }, DUR + 40);
}

function updateProjectPager(slug) {
  const order = Object.keys(PROJECTS);
  const i = order.indexOf(slug);
  if (i === -1) return;
  const targets = {
    'project-prev': order[(i - 1 + order.length) % order.length],
    'project-next': order[(i + 1) % order.length]
  };
  Object.keys(targets).forEach(id => {
    const a = document.getElementById(id);
    if (!a) return;
    a.dataset.slug = targets[id];
    const nameEl = a.querySelector('.pager-name');
    if (nameEl) nameEl.textContent = PROJECTS[targets[id]].name;
  });
}

let projectPaging = false;
function pageProject(slug, dir) {
  if (projectPaging || transitioning || !PROJECTS[slug]) return;

  if (IS_MOBILE) { openProject(slug); return; }

  projectPaging = true;
  transitioning = true;

  const red = document.getElementById('transition-red');
  const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const HALF = 460;
  const enterFrom = dir > 0 ? '100%' : '-100%';
  const exitTo = dir > 0 ? '-100%' : '100%';

  red.style.transition = 'none';
  red.style.clipPath = 'none';
  red.style.background = '';
  red.style.visibility = 'visible';
  red.style.opacity = '1';
  red.style.zIndex = '150';
  red.style.transform = 'translateX(' + enterFrom + ')';
  void red.offsetHeight;

  requestAnimationFrame(() => {
    red.style.transition = 'transform ' + HALF + 'ms ' + EASE;
    red.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    transitioning = false;
    openProject(slug);
    requestAnimationFrame(() => {
      red.style.transition = 'transform ' + HALF + 'ms ' + EASE;
      red.style.transform = 'translateX(' + exitTo + ')';
    });
    setTimeout(() => {
      red.style.cssText = 'visibility:hidden;opacity:0;';
      projectPaging = false;
    }, HALF + 40);
  }, HALF + 20);
}

['project-prev', 'project-next'].forEach(id => {
  const a = document.getElementById(id);
  if (!a) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    const slug = a.dataset.slug;
    if (slug) pageProject(slug, id === 'project-next' ? 1 : -1);
  });
});

function updateNav(sectionId) {
  const nav = document.getElementById('nav');
  const foot = document.getElementById('archive-foot');
  setNavActive(sectionId);

  nav.classList.toggle('archive-mode', sectionId === 'archive');
  nav.classList.toggle('about-mode', sectionId === 'about');
  if (foot) foot.classList.toggle('visible', sectionId === 'archive');
  const dots = document.getElementById('project-dots');
  if (dots) dots.classList.toggle('active', sectionId === 'project-page');
  const pager = document.getElementById('project-pager');
  if (pager) pager.classList.toggle('active', sectionId === 'project-page');
  if (sectionId === 'hero') {
    nav.classList.remove('scrolled');
    nav.classList.remove('nav-collapsed');
  } else {
    nav.classList.add('scrolled');
    nav.classList.add('nav-collapsed');
  }
}

function setNavActive(sectionId) {

  document.querySelectorAll('#nav a[data-section]').forEach(a => {
    a.classList.toggle('active', a.dataset.section === sectionId);
  });
}

function onSectionEnter(sectionId) {

  if (sectionId === 'hero') {
    if (dotGridStart) dotGridStart();
  } else {
    if (dotGridStop) dotGridStop();
  }

  if (sectionId !== 'project-page') {
    document.querySelectorAll('#project-page video').forEach(v => {
      try { v.pause(); } catch (e) {}
    });
  }
  if (sectionId === 'archive') {
    initWorkEntrance();
  }
  if (sectionId === 'project-page') {

    const section = document.getElementById('project-page');
    if (section && typeof observer !== 'undefined') {
      section.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
  }

  SECTIONS.forEach(id => {
    if (id !== sectionId && id !== 'hero') {
      document.querySelectorAll('#' + id + ' .reveal').forEach(el => {
        el.classList.remove('visible');
      });
    }
  });
}

const canvas = document.getElementById('dot-grid');

if (canvas && !IS_MOBILE) {
  const ctx = canvas.getContext('2d');
  let t = 0;

  const SPACING = 42;
  const CURSOR_RANGE = 200;
  const CURSOR_RANGE_SQ = CURSOR_RANGE * CURSOR_RANGE;
  const CHARGE_RATE = 0.12;
  const DECAY_RATE = 0.96;
  const DROP_SPEED = 7;
  const DROP_MAX = 90;
  const RING_WIDTH = 30;

  let gridMX = -9999, gridMY = -9999;
  let dots = [];
  let drops = [];

  function buildDots() {
    dots = [];
    const w = canvas.width, h = canvas.height;
    const cx = w * 0.5, cy = h * 0.5;
    for (let x = SPACING * 0.5; x < w; x += SPACING)
      for (let y = SPACING * 0.5; y < h; y += SPACING) {

        const ddx = x - cx, ddy = y - cy;
        const dc = Math.sqrt(ddx * ddx + ddy * ddy);
        dots.push({ x, y, energy: 0, centerPhase: dc * 0.018 });
      }
  }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildDots();
  }

  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    gridMX = e.clientX - rect.left;
    gridMY = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { gridMX = -9999; gridMY = -9999; });
  const FLASH_MAX = 78;

  hero.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const isFlash = !!e.target.closest('.hero-enter');
    let speed = DROP_SPEED;
    if (isFlash) {
      const W = canvas.width, H = canvas.height;
      const far = Math.max(
        Math.hypot(x, y),
        Math.hypot(W - x, y),
        Math.hypot(x, H - y),
        Math.hypot(W - x, H - y)
      );
      speed = far / FLASH_MAX;
    }
    drops.push({ x, y, age: 0, isFlash, speed });
  });

  window.addEventListener('hero-linear-flash', (e) => {
    const duration = (e.detail && e.detail.duration) || FLASH_MAX;
    drops.push({
      age: 0,
      isLinear: true,
      speed: canvas.height / duration,
      maxAge: duration,
    });
  });

  function drawGrid() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    t += 0.012;

    for (let i = drops.length - 1; i >= 0; i--) {
      drops[i].age++;
      const max = drops[i].maxAge ||
        ((drops[i].isFlash || drops[i].isLinear) ? FLASH_MAX : DROP_MAX);
      if (drops[i].age > max) drops.splice(i, 1);
    }
    const hasDrops = drops.length > 0;

    for (let i = 0, n = dots.length; i < n; i++) {
      const dot = dots[i];

      const dx = dot.x - gridMX, dy = dot.y - gridMY;
      const dmSq = dx * dx + dy * dy;
      if (dmSq < CURSOR_RANGE_SQ) {
        const dm = Math.sqrt(dmSq);
        const proximity = 1 - dm / CURSOR_RANGE;
        const ripple = Math.sin(dm * 0.04 - t * 2.5) * 0.5 + 0.5;
        if (dot.energy < 1) {
          dot.energy = dot.energy + proximity * ripple * CHARGE_RATE;
          if (dot.energy > 1) dot.energy = 1;
        }
      }
      dot.energy *= DECAY_RATE;

      const base = Math.sin(dot.centerPhase - t) * 0.5 + 0.5;

      let alpha = 0.03 + base * 0.055 + dot.energy * 0.10;
      if (alpha > 0.16) alpha = 0.16;
      const r = 1.5 + base * 0.7 + dot.energy * 1.4;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10,10,10,' + alpha + ')';
      ctx.fill();

      if (!hasDrops) continue;
      let redBoost = 0;
      for (let j = 0, m = drops.length; j < m; j++) {
        const drop = drops[j];
        if (drop.isLinear) {
          const waveY = h - drop.age * drop.speed;
          if (dot.y >= waveY) redBoost += 1;
          continue;
        }

        const dx2 = dot.x - drop.x, dy2 = dot.y - drop.y;
        const dm2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (drop.isFlash) {
          const ringR = drop.age * drop.speed;
          if (dm2 < ringR) redBoost += 1;
        } else {
          const ringR = drop.age * DROP_SPEED;
          const fade = 1 - drop.age / DROP_MAX;
          const dRing = Math.abs(dm2 - ringR);
          if (dRing < RING_WIDTH) redBoost += (1 - dRing / RING_WIDTH) * fade;
        }
      }
      if (redBoost > 0.01) {
        if (redBoost > 1) redBoost = 1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r + redBoost * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,45,0,' + (redBoost * 0.88) + ')';
        ctx.fill();
      }
    }
    dotGridRaf = requestAnimationFrame(drawGrid);
  }

  dotGridStart = function () {
    if (dotGridRaf) return;
    drawGrid();
  };
  dotGridStop = function () {
    if (dotGridRaf) {
      cancelAnimationFrame(dotGridRaf);
      dotGridRaf = null;
    }
  };

  resize();
  dotGridStart();
  window.addEventListener('resize', () => {
    dotGridStop();
    resize();
    dotGridStart();
  });

  window.dispatchEvent(new CustomEvent('hero-linear-flash', { detail: { duration: 15 } }));
}

(function () {
  const wrap = document.getElementById('hero-featured');
  const heroSection = document.getElementById('hero');
  const previewWrap = document.getElementById('hero-preview');
  if (!wrap || !heroSection) return;

  const titleEl = document.querySelector('.hero-title-text');
  const roleEl = document.querySelector('.hero-role-text');
  const contentEl = document.querySelector('.hero-content');
  const DEFAULT_TITLE = titleEl ? titleEl.textContent : 'Portfolio';
  const DEFAULT_ROLE = roleEl ? roleEl.textContent : '';

  const bg = url => 'url("' + url + '")';

  const tiles = [...wrap.querySelectorAll('.hero-feature')].map(tile => {
    const images = (tile.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
    tile.innerHTML = '';
    const img = document.createElement('div');
    img.className = 'hero-feature-img';
    if (images[0]) img.style.backgroundImage = bg(images[0]);
    tile.append(img);
    return { el: tile, images, name: tile.dataset.name || '', type: tile.dataset.type || '' };
  });

  const ZONES = {
    TL: { l: 3.1,  t: 10,   w: 23.6, h: 31.8 },
    TR: { l: 45.8, t: 9.8,  w: 47.2, h: 27.1 },
    BL: { l: 3.1,  b: 10.7, w: 37.5, h: 25.1 },
    BR: { l: 59.4, b: 7.8,  w: 20.8, h: 31.3 }
  };

  const LA_ZONES = [
    { l: 67,  t: 7,  w: 26, h: 58 },
    { l: 2.5, t: 7,  w: 33, h: 34 },
    { l: 24,  t: 59, w: 23, h: 33 }
  ];
  function zonesFor(ri) {
    if (ri === 0) return [ZONES.TL, ZONES.BL, ZONES.BR];
    if (ri === 2) return LA_ZONES;
    return [ZONES.TL, ZONES.TR, ZONES.BL];
  }
  function place(s) {
    return (s.t != null ? 'top:' + s.t + 'vh;' : 'bottom:' + s.b + 'vh;') +
      'left:' + s.l + 'vw;width:' + s.w + 'vw;height:' + s.h + 'vh;';
  }

  const SLIDE_MS = 140;
  const SLIDE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const swapEls = [titleEl, roleEl].filter(Boolean);
  let titleTimer = null;
  function morph(html, role, isProject) {
    clearTimeout(titleTimer);
    swapEls.forEach(el => {
      el.style.transition = 'transform ' + SLIDE_MS + 'ms ' + SLIDE_EASE + ', opacity ' + SLIDE_MS + 'ms ' + SLIDE_EASE;
      el.style.transform = 'translateX(-110%)';
      el.style.opacity = '0';
    });
    titleTimer = setTimeout(() => {

      if (titleEl) { titleEl.textContent = html; titleEl.classList.toggle('is-project', !!isProject); }
      if (roleEl) roleEl.textContent = role;
      if (contentEl) contentEl.classList.toggle('is-project', !!isProject);
      swapEls.forEach(el => { el.style.transition = 'none'; el.style.transform = 'translateX(110%)'; });
      void swapEls[0].offsetWidth;
      swapEls.forEach(el => {
        el.style.transition = 'transform ' + SLIDE_MS + 'ms ' + SLIDE_EASE + ', opacity ' + SLIDE_MS + 'ms ' + SLIDE_EASE;
        el.style.transform = 'translateX(0)';
        el.style.opacity = '1';
      });
    }, SLIDE_MS);
  }

  const IN_STEP = 110;
  let activeTile = null;
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  function enterProject(t) {
    if (activeTile === t) return;
    clearTimers();
    activeTile = t;
    const ri = tiles.indexOf(t);
    morph(t.name, t.type, true);
    tiles.forEach(o => { if (o !== t) o.el.classList.add('hf-out'); });

    const slots = zonesFor(ri);
    const fitContain = ri === 2;
    const extras = t.images.slice(1);
    previewWrap.textContent = '';
    const imgs = slots.map((s, i) => {
      const el = document.createElement('div');
      el.className = 'hero-preview-img' + (fitContain ? ' fit-contain' : '');
      el.style.cssText = place(s);
      el.style.backgroundImage = bg(extras[i % extras.length] || t.images[0]);
      previewWrap.appendChild(el);
      return el;
    });
    const start = 200;
    imgs.forEach((el, i) => { timers.push(setTimeout(() => el.classList.add('show'), start + i * IN_STEP)); });
  }

  function exitProject() {
    if (!activeTile) return;
    clearTimers();
    activeTile = null;
    morph(DEFAULT_TITLE, DEFAULT_ROLE, false);
    previewWrap.textContent = '';
    tiles.forEach(o => o.el.classList.remove('hf-out'));
  }

  if (!IS_MOBILE) {
    wrap.addEventListener('mouseover', e => {
      const el = e.target.closest && e.target.closest('.hero-feature');
      if (!el) return;
      const t = tiles.find(o => o.el === el);
      if (t) enterProject(t);
    });
    wrap.addEventListener('mouseout', e => {
      const to = e.relatedTarget;
      if (to && to.closest && to.closest('.hero-feature')) return;
      exitProject();
    });
  }

  requestAnimationFrame(() => heroSection.classList.add('featured-ready'));

  setTimeout(() => { tiles.forEach(o => { o.el.style.transitionDelay = '0s'; }); }, 1200);
})();

let heroTriggered = false;

function heroToWorkTransition(opts) {
  if (heroTriggered || transitioning) return;
  heroTriggered = true;
  transitioning = true;

  if (!opts || !opts.fromClick) window.dispatchEvent(new Event('hero-linear-flash'));

  updateNav('archive');

  const heroSection = document.getElementById('hero');
  const workSection = document.getElementById('archive');

  workItems.forEach(item => {
    item.style.transition = 'none';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  });

  workSection.classList.add('push-in');
  workSection.style.transition = 'none';
  workSection.style.transform = 'translateY(100%)';
  void workSection.offsetHeight;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      workSection.style.transition = 'transform 1.3s cubic-bezier(0.76, 0, 0.24, 1)';
      workSection.style.transform = 'translateY(0)';
    });
  });

  let cleaned = false;
  function cleanup() {
    if (cleaned) return;
    cleaned = true;

    heroSection.classList.remove('active');
    workSection.classList.remove('push-in');
    workSection.classList.add('active');
    workSection.style.transition = '';
    workSection.style.transform = '';
    workItems.forEach(item => { item.style.transition = ''; });

    transitioning = false;
    heroTriggered = false;
    history.replaceState(null, '', '#archive');

    if (window.setWorkReady) window.setWorkReady();

    ['about'].forEach(id => {
      document.querySelectorAll('#' + id + ' .reveal').forEach(el => el.classList.remove('visible'));
    });
  }

  workSection.addEventListener('transitionend', function handler(e) {
    if (e.target !== workSection || e.propertyName !== 'transform') return;
    workSection.removeEventListener('transitionend', handler);
    cleanup();
  });
  setTimeout(cleanup, 1500);
}

const workItems = document.querySelectorAll('#archive .work-item');
const imgGroups = document.querySelectorAll('.work-img-group');
const WORK_COUNT = workItems.length;
let workIdx = 0;

function setWorkActive(idx) {
  document.querySelectorAll('.work-list .work-item').forEach(el => el.classList.remove('active'));
  imgGroups.forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.work-list .work-item[data-index="' + idx + '"]').forEach(el => el.classList.add('active'));
  if (imgGroups[idx]) imgGroups[idx].classList.add('active');
  workIdx = idx;
}

(function () {
  const container = document.querySelector('.work-left');
  const list = document.querySelector('.work-list');
  if (!container || !list) return;
  const N = workItems.length;
  if (N === 0) return;

  container.style.overflow = 'hidden';
  list.style.willChange = 'transform';

  for (let pass = 0; pass < 2; pass++) {
    workItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.remove('active');
      clone.style.opacity = '1';
      clone.style.transform = 'translateY(0)';
      list.appendChild(clone);
    });
  }

  function clearSnapped() {
    document.querySelectorAll('.work-list .work-item').forEach(el => el.classList.remove('active'));
    imgGroups.forEach(el => el.classList.remove('active'));
  }

  let position = 0;
  let velocity = 0;
  let loopH = 0;
  let ready = false;
  let userHasScrolled = false;
  let snapTarget = null;
  let pendingSnapIdx = -1;
  let snappedIdx = -1;

  container.addEventListener('wheel', e => {
    e.preventDefault();
    if (!ready) return;
    velocity += e.deltaY * 0.20;
    userHasScrolled = true;
    snapTarget = null;
  }, { passive: false });

  let touchActive = false, lastTouchY = 0, lastTouchT = 0, touchVel = 0;
  container.addEventListener('touchstart', e => {
    if (!ready) return;
    touchActive = true;
    lastTouchY = e.touches[0].clientY;
    lastTouchT = performance.now();
    touchVel = 0;
    velocity = 0;
    snapTarget = null;
    userHasScrolled = true;
  }, { passive: true });
  container.addEventListener('touchmove', e => {
    if (!ready || !touchActive || loopH <= 0) return;
    e.preventDefault();
    const y = e.touches[0].clientY;
    const dy = lastTouchY - y;
    const now = performance.now();
    const dt = (now - lastTouchT) || 16;
    touchVel = (dy / dt) * 16;
    lastTouchY = y;
    lastTouchT = now;
    position = (((position + dy) % loopH) + loopH) % loopH;
    list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
    if (snappedIdx !== -1) { clearSnapped(); snappedIdx = -1; }
    snapTarget = null;
  }, { passive: false });
  container.addEventListener('touchend', () => {
    if (!touchActive) return;
    touchActive = false;
    velocity = Math.max(-60, Math.min(60, touchVel));
    userHasScrolled = true;
  }, { passive: true });

  function getCenter() {
    const cs = getComputedStyle(container);
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBot = parseFloat(cs.paddingBottom) || 0;
    return padTop + (container.clientHeight - padTop - padBot) / 2;
  }

  function snapToIndex(idx) {
    if (loopH <= 0) return;
    const candidates = [...list.querySelectorAll('.work-item[data-index="' + idx + '"]')];
    if (!candidates.length) return;
    const center = getCenter();
    let best = null, bestDist = Infinity;
    for (const it of candidates) {
      const screenY = it.offsetTop - position + it.offsetHeight / 2;
      const d = Math.abs(screenY - center);
      if (d < bestDist) { bestDist = d; best = it; }
    }
    if (!best) return;
    const raw = best.offsetTop + best.offsetHeight / 2 - center;
    let delta = ((raw - position) % loopH + loopH) % loopH;
    if (delta > loopH / 2) delta -= loopH;
    snapTarget = position + delta;
    pendingSnapIdx = idx;
    if (snappedIdx !== -1) { clearSnapped(); snappedIdx = -1; }
    velocity = 0;
    userHasScrolled = true;
  }

  window.addEventListener('keydown', e => {
    if (activeSectionId() !== 'archive' || !ready) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const cur = snappedIdx >= 0 ? snappedIdx : (pendingSnapIdx >= 0 ? pendingSnapIdx : 0);
      const next = e.key === 'ArrowDown' ? (cur + 1) % N : (cur - 1 + N) % N;
      snapToIndex(next);
    }
  });

  function findNearestItem() {
    const allItems = [...list.querySelectorAll('.work-item')];
    const center = getCenter();
    let best = null, bestDist = Infinity;
    for (const item of allItems) {
      const screenY = item.offsetTop - position + item.offsetHeight / 2;
      const d = Math.abs(screenY - center);
      if (d < bestDist) { bestDist = d; best = item; }
    }
    return best;
  }

  function tick() {
    if (loopH > 0 && activeSectionId() === 'archive') {
      const moving = Math.abs(velocity) > 0.05;
      if (moving) {
        position += velocity;
        velocity *= 0.18;
        position = ((position % loopH) + loopH) % loopH;
        list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
        if (snappedIdx !== -1) { clearSnapped(); snappedIdx = -1; }
        snapTarget = null;
      } else if (userHasScrolled) {
        if (snapTarget === null && snappedIdx === -1) {
          const nearest = findNearestItem();
          if (nearest) {
            const raw = nearest.offsetTop + nearest.offsetHeight / 2 - getCenter();
            let delta = ((raw - position) % loopH + loopH) % loopH;
            if (delta > loopH / 2) delta -= loopH;
            snapTarget = position + delta;
            pendingSnapIdx = parseInt(nearest.dataset.index) % N;
          }
        }
        if (snapTarget !== null) {
          const diff = snapTarget - position;
          if (Math.abs(diff) < 0.5) {
            position = ((snapTarget % loopH) + loopH) % loopH;
            snapTarget = null;
            list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
            if (snappedIdx !== pendingSnapIdx) {
              setWorkActive(pendingSnapIdx);
              snappedIdx = pendingSnapIdx;
            }
          } else {
            position += diff * 0.5;
            list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
          }
        }
        velocity = 0;
      }
    }
    requestAnimationFrame(tick);
  }

  let workInitialized = false;

  function measureAndStart() {
    if (workInitialized) return;
    const allItems = [...list.querySelectorAll('.work-item')];
    if (allItems.length === 0) return;

    const workSection = document.getElementById('archive');
    const wasHidden = !workSection.classList.contains('active');
    if (wasHidden) {
      workSection.style.visibility = 'visible';
      workSection.style.position = 'absolute';
    }

    const cRect = container.getBoundingClientRect();
    const origTop = allItems[0].getBoundingClientRect().top - cRect.top;
    const cloneTop = allItems[N].getBoundingClientRect().top - cRect.top;
    loopH = cloneTop - origTop;

    const center = getCenter();
    let best = null, bestDist = Infinity;
    for (const it of allItems) {
      const screenY = it.offsetTop + it.offsetHeight / 2;
      const d = Math.abs(screenY - center);
      if (d < bestDist) { bestDist = d; best = it; }
    }
    if (best) {
      position = best.offsetTop + best.offsetHeight / 2 - center;
      position = ((position % loopH) + loopH) % loopH;
      list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
      const idx = parseInt(best.dataset.index) % N;
      setWorkActive(idx);
      snappedIdx = idx;
    }

    if (wasHidden) {
      workSection.style.visibility = '';
      workSection.style.position = '';
    }

    workInitialized = true;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(() => requestAnimationFrame(measureAndStart));

  window.initWorkEntrance = function () { ready = true; };

  window.setWorkReady = function () { ready = true; };
})();

function initWorkEntrance() {
  if (window.initWorkEntrance) window.initWorkEntrance();
}

document.querySelectorAll('.nav-links a, .nav-monogram').forEach(link => {
  link.addEventListener('click', e => {
    const section = link.dataset.section;
    if (!section) return;
    e.preventDefault();
    if (section === activeSectionId()) return;
    switchSection(section, { cx: e.clientX, cy: e.clientY });
  });
});

document.addEventListener('click', e => {
  const trigger = e.target.closest && e.target.closest('[data-project]');
  if (!trigger) return;
  const fromHero = !!trigger.closest('#hero');
  const fromArchive = !!trigger.closest('#archive');
  if (!fromHero && !fromArchive) return;
  const slug = trigger.dataset.project;
  if (!slug || !PROJECTS[slug]) return;
  e.preventDefault();
  if (transitioning) return;

  let sourceImg = null;
  let sourceTitle = null;
  let sourceSub = null;
  if (fromHero) {
    sourceImg = trigger.querySelector('.hero-feature-img');
    sourceTitle = document.querySelector('.hero-title-text');
    sourceSub = document.querySelector('.hero-role-text');
  } else if (fromArchive) {
    const idx = trigger.closest('.work-item') && trigger.closest('.work-item').dataset.index;
    const group = idx != null ? document.querySelector('#archive .work-img-group[data-index="' + idx + '"]') : null;
    sourceImg = group ? group.querySelector('.work-img') : null;
    sourceTitle = trigger.querySelector('.work-name');
    sourceSub = trigger.querySelector('.work-type');
  }
  openProject(slug, { sourceImg: sourceImg, sourceTitle: sourceTitle, sourceSub: sourceSub });
});

(function () {
  const monogram = document.querySelector('#nav .nav-monogram');
  if (!monogram) return;
  const letters = [...monogram.querySelectorAll('.ml:not([data-keep]):not(.ml-space)')];
  function measure() {
    letters.forEach(el => {
      const w = el.scrollWidth;
      if (w) el.style.setProperty('--w', w + 'px');
    });
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
})();

(function () {
  const nav = document.getElementById('nav');
  const foot = document.getElementById('archive-foot');

  function bindScroll(el, dir, target) {
    if (!el) return;
    let acc = 0, lastTs = 0;
    el.addEventListener('wheel', e => {
      if (activeSectionId() !== 'archive' || transitioning) return;
      const matches = dir === 'up' ? e.deltaY < 0 : e.deltaY > 0;
      const now = performance.now();
      if (now - lastTs > 300) acc = 0;
      lastTs = now;
      if (matches) {
        acc += Math.abs(e.deltaY);
        if (acc > 60) { acc = 0; switchSection(target); }
      } else {
        acc = 0;
      }
    }, { passive: true });
  }

  function bindClick(el, target) {
    if (!el) return;
    el.addEventListener('click', e => {
      if (activeSectionId() !== 'archive' || transitioning) return;
      switchSection(target, { cx: e.clientX, cy: e.clientY });
    });
  }

  bindScroll(nav, 'up', 'hero');

  bindScroll(foot, 'down', 'about');
  bindClick(foot, 'about');
})();

document.querySelectorAll('.nav-back').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.dataset.section;
    if (section) switchSection(section, { cx: e.clientX, cy: e.clientY });
  });
});

(function () {
  let scrollUpAcc = 0, lastUpTs = 0;

  window.addEventListener('wheel', e => {
    if (activeSectionId() !== 'about' || transitioning) return;
    const about = document.getElementById('about');
    const now = performance.now();

    if (e.deltaY < 0 && about.scrollTop <= 5) {
      if (now - lastUpTs > 300) scrollUpAcc = 0;
      lastUpTs = now;
      scrollUpAcc += Math.abs(e.deltaY);
      if (scrollUpAcc > 200) { scrollUpAcc = 0; switchSection('archive'); }
    } else {
      scrollUpAcc = 0;
    }
  }, { passive: true });
})();

(function () {
  const hash = location.hash.replace('#', '');
  if (hash && SECTIONS.includes(hash) && hash !== 'hero') {
    const heroSection = document.getElementById('hero');
    const target = document.getElementById(hash);
    heroSection.classList.remove('active');
    target.classList.add('active');
    updateNav(hash);

    target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    if (hash === 'archive') initWorkEntrance();
  } else if (hash && PROJECTS[hash]) {

    openProject(hash);
  } else {

    setNavActive('hero');
  }
})();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -32px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  if (!el.closest('#hero')) {
    observer.observe(el);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 160);
  });
});

(function () {
  document.querySelectorAll('a[data-user][data-domain]').forEach(el => {
    const user = el.dataset.user;
    const domain = el.dataset.domain;
    if (!user || !domain) return;
    const addr = user + '@' + domain;
    el.textContent = addr;
    el.href = 'mailto:' + addr;
  });
})();
