const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;

const IDLE_MS = .2 * 60 * 1000;
const RAIN_FIELDS = {};

const SECTIONS = ['hero', 'archive', 'about'];
const PUSH_DURATION = 800;
const PUSH_EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';
let transitioning = false;
let projectSourceSection = 'archive';

let dotGridRaf = null;
let dotGridStart = null;
let dotGridStop = null;
let dotGridSplash = null;

const PROJECTS = {
  'hybrid-construction': {
    name: 'Hybrid Construction',
    type: 'Automation · Assembly',
    blurb: 'Exploring the intersection of automated architecture and platform design, this project investigates both the physical construction system and the software framework required to enable it. The proposed building system combines 3D printed concrete for the primary structure with cross laminated timber for the flooring and secondary walls. To drive the layout, the digital platform extracts site geometry, parcel boundaries, local zoning codes, and environmental data, automatically organizing the program based on these site-specific constraints. The platform then generates the structural framing around the initial massing, seamlessly exporting a BIM ready model alongside construction schedules and analysis diagrams.\n\nmore to come August 2026...',
    credits: 'Instructor: Casey Rehm',
    gallery: [
      'HybridConstruction/hybrid-08.mp4',

      { images: ['HybridConstruction/hybrid-03.mp4', 'HybridConstruction/hybrid-01.webp', 'HybridConstruction/hybrid-02.webp'], cols: 3, rows: 1, cover: true },

      { images: ['HybridConstruction/hybrid-10.webp', 'HybridConstruction/hybrid-07.webp', 'HybridConstruction/hybrid-11.webp', 'HybridConstruction/hybrid-05.webp'], cols: 2, rows: 2, gap: 0, cover: true },
      'HybridConstruction/hybrid-16.mp4',
      { images: ['HybridConstruction/hybrid-13.webp', 'HybridConstruction/hybrid-14.webp', 'HybridConstruction/hybrid-15.webp'], cols: 3, rows: 1, gap: 0, cover: true },
      'HybridConstruction/hybrid-06.webp',
      'HybridConstruction/hybrid-12.mp4'
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

      { images: ['RaufWerk/raufwerk-26.webp', 'RaufWerk/raufwerk-30.webp', 'RaufWerk/raufwerk-27.webp', 'RaufWerk/raufwerk-28.webp'], cols: 4, rows: 1 },

      {
        layout: 'levels', gap: '8px',
        rows: [
          { swatch: 'RaufWerk/raufwerk-22.webp', images: ['RaufWerk/raufwerk-12.webp', 'RaufWerk/raufwerk-14.webp', 'RaufWerk/raufwerk-15.webp', 'RaufWerk/raufwerk-16.webp'] },
          { swatch: 'RaufWerk/raufwerk-23.webp', images: ['RaufWerk/raufwerk-09.webp', 'RaufWerk/raufwerk-08.webp', 'RaufWerk/raufwerk-10.webp', 'RaufWerk/raufwerk-11.webp'] },
          { swatch: 'RaufWerk/raufwerk-24.webp', images: ['RaufWerk/raufwerk-20.webp', 'RaufWerk/raufwerk-21.webp', 'RaufWerk/raufwerk-17.webp', 'RaufWerk/raufwerk-19.webp'] }
        ]
      },
      'RaufWerk/raufwerk-05.mp4',
      'RaufWerk/raufwerk-06.mp4',
      'RaufWerk/raufwerk-25.webp'
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

      {
        layout: 'levels', gap: '8px', rows: [
          { images: ['LAccoustic/laccoustic-05.webp', 'LAccoustic/laccoustic-06.webp', 'LAccoustic/laccoustic-07.webp', 'LAccoustic/laccoustic-08.webp', 'LAccoustic/laccoustic-09.webp'] },
          { images: ['LAccoustic/laccoustic-10.webp', 'LAccoustic/laccoustic-11.webp', 'LAccoustic/laccoustic-12.webp', 'LAccoustic/laccoustic-13.webp', 'LAccoustic/laccoustic-14.webp'] },
          { images: ['LAccoustic/laccoustic-15.webp', 'LAccoustic/laccoustic-16.webp', 'LAccoustic/laccoustic-17.webp', 'LAccoustic/laccoustic-18.webp', 'LAccoustic/laccoustic-19.webp'] },
          { images: ['LAccoustic/laccoustic-20.webp', 'LAccoustic/laccoustic-21.webp', 'LAccoustic/laccoustic-22.webp', 'LAccoustic/laccoustic-23.webp', 'LAccoustic/laccoustic-24.webp'] }
        ]
      },
      'LAccoustic/laccoustic-25.mp4',
      'LAccoustic/laccoustic-26.mp4',
      'LAccoustic/laccoustic-30.webp'
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

      { layout: 'rect-pair', contain: true, images: ['Sears/sears-09.mp4', 'Sears/sears-04.webp'] },
      'Sears/sears-16.webp',
      { images: ['Sears/sears-10.webp', 'Sears/sears-11.webp', 'Sears/sears-12.webp', 'Sears/sears-13.webp'], cols: 2, rows: 2, gap: 0, cover: true },
      'Sears/sears-14.webp',
      'Sears/sears-15.webp'
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
    gallery: ['HippoTherapy/hippotherapy-02.webp', 'HippoTherapy/hippotherapy-03.webp', 'HippoTherapy/hippotherapy-05.webp', { src: 'HippoTherapy/hippotherapy-01.webp', full: true }, 'HippoTherapy/hippotherapy-04.webp', 'HippoTherapy/hippotherapy-06.webp']
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

      { layout: 'rect-pair', contain: true, images: ['UrbanFarming/urbanfarming-05.webp', 'UrbanFarming/urbanfarming-06.webp'] },
      'UrbanFarming/urbanfarming-07.webp',
      { images: ['UrbanFarming/urbanfarming-08.webp', 'UrbanFarming/urbanfarming-09.webp', 'UrbanFarming/urbanfarming-10.webp'], cols: 3, rows: 1, gap: 0, cover: true }
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
      if (p && p.catch) p.catch(() => { });
    } else {
      try { v.pause(); } catch (e) { }
    }
  });
}
function pauseProjectVideos() {
  document.querySelectorAll('#project-page video').forEach(v => { try { v.pause(); } catch (e) { } });
}

function observeProjectShots(section) {
  if (!section) return;
  if (projectDotsObserver) { projectDotsObserver.disconnect(); projectDotsObserver = null; }

  const targets = [...section.querySelectorAll('.project-hero, .project-shot')];
  if (!targets.length) return;

  projectDotsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      playOnlyShotVideos(entry.target);
    });
  }, {
    root: section,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });
  targets.forEach(t => projectDotsObserver.observe(t));
}

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
    try { history.replaceState(null, '', '#' + targetId); } catch (e) { }
    onSectionEnter(targetId);
    return;
  }

  const curIdx = SECTIONS.indexOf(current.id);
  const nextIdx = SECTIONS.indexOf(targetId);
  const goingDown = nextIdx > curIdx;

  transitioning = true;

  const skipRed = true;

  const red = document.getElementById('transition-red');
  const startY = goingDown ? '100%' : '-100%';

  if (!skipRed) {
    red.style.transition = 'none';
    red.style.visibility = 'visible';
    red.style.opacity = '1';
    red.style.background = '';
    red.style.clipPath = 'none';
    red.style.transform = 'translateY(' + startY + ')';
  }

  next.classList.add('push-in');
  next.style.transition = 'none';
  if (skipRed) {
    next.style.transform = 'none';
    next.style.opacity = '0';
  } else {
    next.style.transform = 'translateY(' + startY + ')';
  }

  current.classList.add('push-out');
  if (skipRed) current.style.transition = 'none';

  void red.offsetHeight;
  void next.offsetHeight;

  if (targetId !== 'project-page') {
    next.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  updateNav(targetId);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (skipRed) {
        next.style.transition = 'opacity 850ms ease';
        next.style.opacity = '1';
        current.style.transition = 'opacity 850ms ease';
        current.style.opacity = '0';
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
    current.style.opacity = '';

    next.classList.remove('push-in');
    next.classList.add('active');
    next.style.transition = '';
    next.style.transform = '';
    next.style.opacity = '';

    red.style.cssText = 'visibility:hidden;opacity:0;';

    transitioning = false;
    try { history.replaceState(null, '', '#' + targetId); } catch (e) { }
    onSectionEnter(targetId);
  }

  next.addEventListener('transitionend', function handler(e) {
    if (e.target !== next) return;
    if (e.propertyName !== 'transform' && e.propertyName !== 'opacity') return;
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

  titleEl.innerHTML = data.name.length > 14 ? data.name.replace(/\s+/g, '<br>') : data.name;
  if (subEl) subEl.textContent = data.type;
  if (blurbEl) blurbEl.textContent = data.blurb;
  const creditsEl = document.getElementById('project-credits-text');
  if (creditsEl) creditsEl.textContent = data.credits || '';
  section.dataset.project = slug;

  const metaRow = section.querySelector('.project-meta-row');
  const existingFeature = section.querySelector('.meta-feature');
  if (existingFeature) existingFeature.remove();
  if (metaRow && data.feature) {
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
    metaRow.parentNode.insertBefore(fig, metaRow);
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
      if (isVid) {
        el.src = src + '#t=0.1';
        el.loop = true;
        el.muted = true;
        el.playsInline = true;
        el.preload = 'metadata';
        el.setAttribute('playsinline', '');
      } else {
        el.src = src;
        el.alt = data.name;
        el.loading = 'lazy';
      }
      return el;
    }

    function setGroupAspect(wrap, el) {
      const apply = () => {
        const w = el.naturalWidth || el.videoWidth;
        const h = el.naturalHeight || el.videoHeight;
        if (w && h) wrap.style.setProperty('--ar', (w / h).toFixed(4));
      };
      const isVid = el.tagName === 'VIDEO';
      const ready = isVid ? el.videoWidth : (el.complete && el.naturalWidth);
      if (ready) apply();
      else el.addEventListener(isVid ? 'loadedmetadata' : 'load', apply, { once: true });
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
          inner.style.aspectRatio = pairs.reduce((s, p) => s + p.ratio, 0).toFixed(4);
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
        const groupEls = item.images.map(makeMedia);
        groupEls.forEach(el => wrap.append(el));
        if (item.cover && groupEls[0]) setGroupAspect(wrap, groupEls[0]);
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
      let fullShot = false;
      if (typeof item === 'string') {
        media = [item];
      } else if (item && typeof item === 'object' && !Array.isArray(item) && typeof item.src === 'string') {
        media = [item.src];
        fullShot = !!item.full;
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
      } else {
        wrap.classList.add('project-shot--single');
        if (fullShot) wrap.classList.add('project-shot--full');
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

  observeProjectShots(section);

  if (IS_MOBILE) {
    const cur = activeSection();
    if (cur && cur !== section) cur.classList.remove('active');
    section.classList.remove('push-in');
    section.style.visibility = '';
    section.classList.add('active');
    section.scrollTop = 0;
    updateNav('project-page');
    onSectionEnter('project-page');
    try { history.replaceState(null, '', '#' + slug); } catch (e) { }
    if (pendingHeroVideo) {
      const p = pendingHeroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => { });
    }
    return;
  }

  transitioning = true;
  const current = activeSection();
  const isPaging = current === section;

  section.classList.add('push-in');
  section.style.visibility = 'visible';

  updateNav('project-page');

  const dotGrid = document.getElementById('dot-grid');

  const FADE = isPaging ? 0 : 850;
  if (!isPaging) {
    section.style.transition = 'none';
    section.style.opacity = '0';
    if (dotGrid) {
      dotGrid.style.transition = 'opacity 280ms ease';
      dotGrid.style.opacity = '0';
    }
    void section.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        section.style.transition = 'opacity ' + FADE + 'ms ease';
        section.style.opacity = '1';
      });
    });
  }

  setTimeout(() => {
    if (current && current !== section) current.classList.remove('active');
    section.classList.remove('push-in');
    section.classList.add('active');
    section.style.transition = '';
    section.style.opacity = '';

    if (dotGrid) {
      dotGrid.style.transition = '';
      dotGrid.style.opacity = '';
    }

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.remove('is-project');
    const heroTitleSpan = document.querySelector('.hero-title-text');
    if (heroTitleSpan) heroTitleSpan.classList.remove('is-project');

    onSectionEnter('project-page');
    transitioning = false;
    try { history.replaceState(null, '', '#' + slug); } catch (e) { }

    if (pendingHeroVideo) {
      const p = pendingHeroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => { });
    }
  }, FADE + 40);
}

(function buildProjectFootList() {
  const list = document.getElementById('project-foot-list');
  if (!list) return;
  Object.keys(PROJECTS).forEach(slug => {
    const a = document.createElement('a');
    a.className = 'project-foot-link';
    a.href = '#' + slug;
    a.dataset.slug = slug;
    a.textContent = PROJECTS[slug].name;
    list.append(a);
  });
})();

let currentProjectSlug = null;
function updateProjectPager(slug) {
  currentProjectSlug = slug;
  const list = document.getElementById('project-foot-list');
  if (!list) return;
  list.querySelectorAll('.project-foot-link').forEach(a => {
    a.classList.toggle('active', a.dataset.slug === slug);
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

(function () {
  const list = document.getElementById('project-foot-list');
  if (!list) return;
  list.addEventListener('click', e => {
    const a = e.target.closest('.project-foot-link');
    if (!a) return;
    e.preventDefault();
    const slug = a.dataset.slug;
    if (!slug || slug === currentProjectSlug) return;
    const order = Object.keys(PROJECTS);
    const dir = order.indexOf(slug) > order.indexOf(currentProjectSlug) ? 1 : -1;
    pageProject(slug, dir);
  });
})();

(function () {
  const back = document.getElementById('project-back');
  if (!back) return;
  back.addEventListener('click', e => {
    e.preventDefault();
    if (transitioning) return;
    if (activeSectionId() === 'project-page') {
      const target = SECTIONS.includes(projectSourceSection) ? projectSourceSection : 'archive';
      switchSection(target);
    } else {
      switchSection('hero');
    }
  });
})();

function updateNav(sectionId) {
  const nav = document.getElementById('nav');
  setNavActive(sectionId);

  const isProject = sectionId === 'project-page';
  const isAbout = sectionId === 'about';
  const showStrip = isProject || isAbout;
  const foot = document.getElementById('project-foot');
  if (foot) {
    foot.classList.toggle('active', showStrip);
    foot.classList.toggle('foot-back-only', isAbout);
  }
  const container = document.querySelector('.sections-container');
  if (container) container.classList.toggle('project-open', showStrip);
  nav.classList.toggle('scrolled', sectionId !== 'hero');
  nav.classList.toggle('nav-collapsed', sectionId !== 'hero');
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
      try { v.pause(); } catch (e) { }
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

  let heroRaining = false, heroRainSpawn = 0;
  const RAIN_MIN = 36, RAIN_VAR = 60;

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

    if (heroRaining) {
      heroRainSpawn--;
      if (heroRainSpawn <= 0) {
        drops.push({ x: Math.random() * w, y: Math.random() * h, age: 0 });
        heroRainSpawn = RAIN_MIN + Math.random() * RAIN_VAR;
      }
    }

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
          const rw = drop.vib ? RING_WIDTH * 1.6 : RING_WIDTH;
          const dRing = Math.abs(dm2 - ringR);
          if (dRing < rw) redBoost += (1 - dRing / rw) * fade * (drop.vib || 1);
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
  dotGridSplash = function (clientX, clientY, opts) {
    opts = opts || {};
    const rect = canvas.getBoundingClientRect();
    drops.push({
      x: clientX - rect.left,
      y: clientY - rect.top,
      age: 0,
      vib: opts.vib || 1.5,
    });
  };

  resize();
  dotGridStart();
  window.addEventListener('resize', () => {
    dotGridStop();
    resize();
    dotGridStart();
  });

  RAIN_FIELDS['hero'] = {
    start() { heroRaining = true; heroRainSpawn = 0; },
    stop() { heroRaining = false; }
  };

  window.dispatchEvent(new CustomEvent('hero-linear-flash', { detail: { duration: 15 } }));
}

(function () {
  const wrap = document.getElementById('hero-featured');
  const heroSection = document.getElementById('hero');
  if (!wrap || !heroSection) return;

  const tiles = [...wrap.querySelectorAll('.hero-feature')];
  tiles.forEach(tile => {
    const images = (tile.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
    const img = tile.querySelector('.hero-feature-img');
    if (img && images[0]) img.style.backgroundImage = 'url("' + images[0] + '")';
  });

  requestAnimationFrame(() => heroSection.classList.add('featured-ready'));
  setTimeout(() => { tiles.forEach(t => { t.style.transitionDelay = '0s'; }); }, 1200);
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

  let position = 0;
  let velocity = 0;
  let loopH = 0;
  let ready = false;
  let activeIdx = -1;

  function getCenter() {
    const cs = getComputedStyle(container);
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBot = parseFloat(cs.paddingBottom) || 0;
    return padTop + (container.clientHeight - padTop - padBot) / 2;
  }

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

  function updateActive() {
    const nearest = findNearestItem();
    if (!nearest) return;
    const idx = parseInt(nearest.dataset.index) % N;
    if (idx !== activeIdx) { setWorkActive(idx); activeIdx = idx; }
  }

  function render() {
    position = ((position % loopH) + loopH) % loopH;
    list.style.transform = 'translate3d(0, ' + (-position) + 'px, 0)';
    updateActive();
  }

  container.addEventListener('wheel', e => {
    e.preventDefault();
    if (!ready || loopH <= 0) return;
    position += e.deltaY;
    render();
  }, { passive: false });

  let touchActive = false, lastTouchY = 0, lastTouchT = 0, touchVel = 0;
  container.addEventListener('touchstart', e => {
    if (!ready) return;
    touchActive = true;
    lastTouchY = e.touches[0].clientY;
    lastTouchT = performance.now();
    touchVel = 0;
    velocity = 0;
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
    position += dy;
    render();
  }, { passive: false });
  container.addEventListener('touchend', () => {
    if (!touchActive) return;
    touchActive = false;
    velocity = Math.max(-60, Math.min(60, touchVel));
  }, { passive: true });

  window.addEventListener('keydown', e => {
    if (activeSectionId() !== 'archive' || !ready || loopH <= 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      position += (e.key === 'ArrowDown' ? 1 : -1) * (loopH / N);
      render();
    }
  });

  function tick() {
    if (loopH > 0 && !touchActive && Math.abs(velocity) > 0.1 && activeSectionId() === 'archive') {
      position += velocity;
      velocity *= 0.92;
      render();
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
      render();
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
    switchSection(section);
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

  projectSourceSection = fromHero ? 'hero' : 'archive';

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

  bindScroll(nav, 'up', 'hero');
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
  const decode = s => s.split(',').map(n => String.fromCharCode(+n)).join('');

  function splashOverEmail(el) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const section = el.closest('.page-section');
    const id = section && section.id;
    if (id === 'hero' && typeof dotGridSplash === 'function') {
      dotGridSplash(cx, cy, { vib: 1.5 });
    } else if (id && RAIN_FIELDS[id] && RAIN_FIELDS[id].splash) {
      RAIN_FIELDS[id].splash(cx, cy, { vib: 1.5 });
    }
  }

  document.querySelectorAll('.hero-email[data-e]').forEach(el => {
    const addr = decode(el.dataset.e);
    const label = el.textContent;
    let resetTimer = null;

    function flash(msg) {
      el.textContent = msg;
      el.classList.add('copied');
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        el.textContent = label;
        el.classList.remove('copied');
      }, 1900);
    }

    function copyAddr() {
      const done = () => { flash('copied'); splashOverEmail(el); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        const ta = document.createElement('textarea');
        ta.value = addr;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (_) { flash(addr); }
        document.body.removeChild(ta);
      }
    }

    el.addEventListener('click', e => { e.preventDefault(); copyAddr(); });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyAddr(); }
    });
  });
})();

function makeRainField(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  const SPACING = 42, DROP_SPEED = 7, DROP_MAX = 90, RING_WIDTH = 30;
  const RAIN_MIN = 36, RAIN_VAR = 60;
  const RING_OPACITY = 0.7, DOT_OPACITY = 0.05;
  let raf = null, dots = [], drops = [], fade = 0, target = 0, spawn = 0;

  function build() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    dots = [];
    for (let x = SPACING * 0.5; x < canvas.width; x += SPACING)
      for (let y = SPACING * 0.5; y < canvas.height; y += SPACING)
        dots.push({ x, y });
  }

  function frame() {
    const w = canvas.width, h = canvas.height;
    fade += (target - fade) * 0.05;
    ctx.clearRect(0, 0, w, h);

    if (target === 0 && fade < 0.01 && !drops.length) { raf = null; return; }

    if (target === 1) {
      spawn--;
      if (spawn <= 0) {
        drops.push({ x: Math.random() * w, y: Math.random() * h, age: 0 });
        spawn = RAIN_MIN + Math.random() * RAIN_VAR;
      }
    }
    for (let i = drops.length - 1; i >= 0; i--) {
      drops[i].age++;
      if (drops[i].age > DROP_MAX) drops.splice(i, 1);
    }

    for (let i = 0, n = dots.length; i < n; i++) {
      const dot = dots[i];
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10,10,10,' + (DOT_OPACITY * fade) + ')';
      ctx.fill();

      let boost = 0, boostVib = 0;
      for (let j = 0, m = drops.length; j < m; j++) {
        const d = drops[j];
        const dx = dot.x - d.x, dy = dot.y - d.y;
        const dm = Math.sqrt(dx * dx + dy * dy);
        const rw = d.vib ? RING_WIDTH * 1.6 : RING_WIDTH;
        const ringR = d.age * DROP_SPEED;
        const dRing = Math.abs(dm - ringR);
        if (dRing < rw) {
          const b = (1 - dRing / rw) * (1 - d.age / DROP_MAX);
          if (d.vib) boostVib += b * d.vib; else boost += b;
        }
      }
      let ringAlpha = Math.min(1, boost) * RING_OPACITY * fade + Math.min(1, boostVib) * 0.95;
      if (ringAlpha > 0.01) {
        if (ringAlpha > 1) ringAlpha = 1;
        const ringSize = Math.min(1, boost) + Math.min(1.5, boostVib);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5 + ringSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,45,0,' + ringAlpha + ')';
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(frame);
  }

  return {
    start() { build(); drops = []; spawn = 0; target = 1; if (!raf) raf = requestAnimationFrame(frame); },
    stop() { target = 0; },
    resize() { if (raf) build(); },
    splash(clientX, clientY, opts) {
      opts = opts || {};
      if (!dots.length) build();
      const rect = canvas.getBoundingClientRect();
      drops.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        age: 0,
        vib: opts.vib || 1.5,
      });
      if (!raf) raf = requestAnimationFrame(frame);
    }
  };
}

['archive', 'about', 'project-page'].forEach(id => {
  const section = document.getElementById(id);
  const field = makeRainField(section && section.querySelector('.rain-canvas'));
  if (field) RAIN_FIELDS[id] = field;
});

window.addEventListener('resize', () => {
  Object.keys(RAIN_FIELDS).forEach(id => {
    if (RAIN_FIELDS[id].resize) RAIN_FIELDS[id].resize();
  });
});

(function () {
  if (IS_MOBILE) return;
  let idleTimer = null, current = null;

  function start() {
    const f = RAIN_FIELDS[activeSectionId()];
    if (f) { current = f; f.start(); }
  }
  function reset() {
    if (current) { current.stop(); current = null; }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(start, IDLE_MS);
  }
  ['mousemove', 'wheel', 'keydown', 'touchstart', 'touchmove', 'pointerdown'].forEach(ev =>
    window.addEventListener(ev, reset, { passive: true }));
  reset();
})();
