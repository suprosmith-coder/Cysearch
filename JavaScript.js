/* ═══════════════════════════════════════════════════
   CYSEARCH — JavaScript.js
   All modules in one file. New Supabase project.
═══════════════════════════════════════════════════ */

// ── CONFIG ────────────────────────────────────────
const SUPABASE_URL     = 'https://jeajdcozdeejhbirbmxq.supabase.co';
const SUPABASE_ANON    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplYWpkY296ZGVlamhiaXJibXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODQxNjMsImV4cCI6MjA4Njg2MDE2M30.o4mtcjP37RymYar6w_mvFJYUaDrp9dBqubtwL-Yljps';
const SEARCH_FUNC_URL  = `${SUPABASE_URL}/functions/v1/search`;
const REDIRECT_URL     = window.location.href.split('?')[0];

// ── CLUSTER DATA ──────────────────────────────────
const CLUSTERS = [
  { id:'social',    label:'Social Media', color:'#ff6b6b', x:-.28, y:.09, z:.12,
    sites:[
      {n:'Twitter/X',   u:'https://x.com',              l:1},
      {n:'Instagram',   u:'https://instagram.com',       l:1},
      {n:'TikTok',      u:'https://tiktok.com',          l:1},
      {n:'Reddit',      u:'https://reddit.com',          l:1},
      {n:'Facebook',    u:'https://facebook.com',        l:1},
      {n:'LinkedIn',    u:'https://linkedin.com',        l:1},
      {n:'Discord',     u:'https://discord.com',         l:2},
      {n:'Snapchat',    u:'https://snapchat.com',        l:2},
      {n:'Threads',     u:'https://threads.net',         l:2},
      {n:'Mastodon',    u:'https://mastodon.social',     l:3},
      {n:'Tumblr',      u:'https://tumblr.com',          l:3},
    ]},
  { id:'ai',        label:'AI Tools',     color:'#00f5ff', x:.03, y:.22, z:-.15,
    sites:[
      {n:'ChatGPT',     u:'https://chat.openai.com',     l:1},
      {n:'Claude',      u:'https://claude.ai',           l:1},
      {n:'Gemini',      u:'https://gemini.google.com',   l:1},
      {n:'Cysearch',    u:'#',                           l:1},
      {n:'Perplexity',  u:'https://perplexity.ai',       l:1},
      {n:'Midjourney',  u:'https://midjourney.com',      l:2},
      {n:'Runway',      u:'https://runwayml.com',        l:2},
      {n:'ElevenLabs',  u:'https://elevenlabs.io',       l:2},
      {n:'Cursor',      u:'https://cursor.sh',           l:2},
    ]},
  { id:'gaming',    label:'Gaming',       color:'#a855f7', x:.30, y:-.05, z:.04,
    sites:[
      {n:'Steam',       u:'https://store.steampowered.com', l:1},
      {n:'Twitch',      u:'https://twitch.tv',           l:1},
      {n:'Epic Games',  u:'https://epicgames.com',       l:1},
      {n:'Roblox',      u:'https://roblox.com',          l:1},
      {n:'Xbox',        u:'https://xbox.com',            l:2},
      {n:'PlayStation', u:'https://playstation.com',     l:2},
      {n:'GOG',         u:'https://gog.com',             l:2},
      {n:'itch.io',     u:'https://itch.io',             l:3},
      {n:'Newgrounds',  u:'https://newgrounds.com',      l:3},
    ]},
  { id:'news',      label:'News',         color:'#f59e0b', x:-.08, y:-.26, z:.10,
    sites:[
      {n:'BBC',         u:'https://bbc.com',             l:1},
      {n:'Reuters',     u:'https://reuters.com',         l:1},
      {n:'The Verge',   u:'https://theverge.com',        l:1},
      {n:'TechCrunch',  u:'https://techcrunch.com',      l:1},
      {n:'Wired',       u:'https://wired.com',           l:2},
      {n:'Hacker News', u:'https://news.ycombinator.com',l:2},
      {n:'Bloomberg',   u:'https://bloomberg.com',       l:2},
      {n:'Substack',    u:'https://substack.com',        l:3},
    ]},
  { id:'darkweb',   label:'Dark Web',     color:'#475569', x:.20, y:.28, z:.18,
    sites:[
      {n:'[REDACTED]',  u:'#', l:4},
      {n:'[UNKNOWN]',   u:'#', l:4},
      {n:'[ENCRYPTED]', u:'#', l:4},
    ]},
  { id:'startups',  label:'Startups',     color:'#10b981', x:-.22, y:.18, z:-.09,
    sites:[
      {n:'Y Combinator',u:'https://ycombinator.com',    l:1},
      {n:'Vercel',      u:'https://vercel.com',         l:1},
      {n:'Supabase',    u:'https://supabase.com',       l:1},
      {n:'Figma',       u:'https://figma.com',          l:1},
      {n:'Notion',      u:'https://notion.so',          l:2},
      {n:'Linear',      u:'https://linear.app',         l:2},
      {n:'Product Hunt',u:'https://producthunt.com',    l:2},
      {n:'Indie Hackers',u:'https://indiehackers.com',  l:3},
    ]},
  { id:'education', label:'Education',    color:'#3b82f6', x:.14, y:-.32, z:-.07,
    sites:[
      {n:'Khan Academy',u:'https://khanacademy.org',    l:1},
      {n:'Wikipedia',   u:'https://wikipedia.org',      l:1},
      {n:'YouTube',     u:'https://youtube.com',        l:1},
      {n:'Coursera',    u:'https://coursera.org',       l:2},
      {n:'Duolingo',    u:'https://duolingo.com',       l:2},
      {n:'Codecademy',  u:'https://codecademy.com',     l:2},
      {n:'Brilliant',   u:'https://brilliant.org',      l:3},
    ]},
  { id:'ecommerce', label:'E-Commerce',   color:'#f97316', x:-.36, y:-.14, z:-.04,
    sites:[
      {n:'Amazon',      u:'https://amazon.com',         l:1},
      {n:'Shopify',     u:'https://shopify.com',        l:1},
      {n:'Etsy',        u:'https://etsy.com',           l:1},
      {n:'eBay',        u:'https://ebay.com',           l:2},
      {n:'Stripe',      u:'https://stripe.com',         l:2},
      {n:'Gumroad',     u:'https://gumroad.com',        l:3},
    ]},
];

const CAT_COLORS = {
  social:'#ff6b6b', ai:'#00f5ff', gaming:'#a855f7', news:'#f59e0b',
  darkweb:'#475569', startups:'#10b981', education:'#3b82f6', ecommerce:'#f97316',
  other:'#94a3b8', center:'#ffffff',
};


// ══════════════════════════════════════════════════
// SUPABASE AUTH
// ══════════════════════════════════════════════════
let _sb = null;
let _session = null;

function sbInit() {
  // supabase global comes from the CDN UMD bundle
  _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  _sb.auth.onAuthStateChange((event, session) => {
    _session = session;
    if (session) {
      _onSignedIn(session.user);
    } else {
      _onSignedOut();
    }
  });

  // Restore existing session silently
  _sb.auth.getSession().then(({ data }) => {
    if (data.session) {
      _session = data.session;
      _onSignedIn(data.session.user);
    }
  });
}

function _onSignedIn(user) {
  // Show cobweb screen, hide galaxy
  document.getElementById('screen-galaxy').style.display = 'none';
  document.getElementById('screen-cobweb').style.display = 'block';
  document.getElementById('auth-overlay').classList.add('hidden');
  const lbl = document.getElementById('user-label');
  if (lbl) lbl.textContent = user.email || user.user_metadata?.name || 'EXPLORER';
  cobwebInit();
}

function _onSignedOut() {
  document.getElementById('screen-cobweb').style.display = 'none';
  document.getElementById('screen-galaxy').style.display = 'block';
}

async function oauthLogin(provider) {
  const btn = document.getElementById('ob-' + provider);
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  await _sb.auth.signInWithOAuth({ provider, options: { redirectTo: REDIRECT_URL } });
}

async function emailSignIn() {
  const email = document.getElementById('si-email').value.trim();
  const pass  = document.getElementById('si-pass').value;
  const err   = document.getElementById('si-err');
  const btn   = document.getElementById('si-btn');

  if (!email || !pass) { showMsg(err, 'Fill in all fields.'); return; }
  btn.disabled = true; btn.textContent = 'CONNECTING...';
  hideEl(err);

  const { error } = await _sb.auth.signInWithPassword({ email, password: pass });
  btn.disabled = false; btn.textContent = 'ACCESS MAP';
  if (error) showMsg(err, error.message);
}

async function emailSignUp() {
  const email = document.getElementById('su-email').value.trim();
  const pass  = document.getElementById('su-pass').value;
  const conf  = document.getElementById('su-conf').value;
  const err   = document.getElementById('su-err');
  const ok    = document.getElementById('su-ok');
  const btn   = document.getElementById('su-btn');

  if (!email || !pass || !conf) { showMsg(err, 'Fill in all fields.'); return; }
  if (pass !== conf)            { showMsg(err, 'Passwords do not match.'); return; }
  if (pass.length < 6)          { showMsg(err, 'Minimum 6 characters.'); return; }

  btn.disabled = true; btn.textContent = 'CREATING...';
  hideEl(err); hideEl(ok);

  const { error } = await _sb.auth.signUp({ email, password: pass });
  btn.disabled = false; btn.textContent = 'CREATE ACCOUNT';
  if (error) showMsg(err, error.message);
  else { ok.classList.remove('hidden'); ok.textContent = '✓ Check your email to confirm'; }
}

// ── Auth UI bindings ──────────────────────────────
function authBindUI() {
  // Tab switching
  document.querySelectorAll('.atab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.atab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.aform').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });

  // Enter button
  document.getElementById('enter-btn').addEventListener('click', () => {
    if (_session) { _onSignedIn(_session.user); }
    else { document.getElementById('auth-overlay').classList.remove('hidden'); }
  });

  // Close
  document.getElementById('auth-close').addEventListener('click', () => {
    document.getElementById('auth-overlay').classList.add('hidden');
  });
  document.getElementById('auth-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('auth-overlay'))
      document.getElementById('auth-overlay').classList.add('hidden');
  });

  // Email forms
  document.getElementById('si-btn').addEventListener('click', emailSignIn);
  document.getElementById('si-pass').addEventListener('keydown', e => { if (e.key==='Enter') emailSignIn(); });
  document.getElementById('su-btn').addEventListener('click', emailSignUp);
  document.getElementById('su-conf').addEventListener('keydown', e => { if (e.key==='Enter') emailSignUp(); });

  // OAuth
  document.getElementById('ob-google').addEventListener('click',  () => oauthLogin('google'));
  document.getElementById('ob-github').addEventListener('click',  () => oauthLogin('github'));
  document.getElementById('ob-discord').addEventListener('click', () => oauthLogin('discord'));

  // Sign out
  document.getElementById('signout-btn').addEventListener('click', async () => {
    await _sb.auth.signOut();
  });
}


// ══════════════════════════════════════════════════
// THREE.JS GALAXY
// ══════════════════════════════════════════════════
let _three = {};
let _activeLayer = 1;
let _interactable = []; // { mesh, cluster, site }
let _isDragging = false, _prevMouse = {x:0,y:0};
let _sph = { theta:.3, phi:1.2, r:5 };
let _tSph = { ..._sph };
let _autoRot = true;
let _ttMouse = new THREE.Vector2();

function galaxyInit() {
  const canvas = document.getElementById('galaxy-canvas');
  const W = window.innerWidth, H = window.innerHeight;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(60, W/H, 0.01, 200);
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch(e) {
    console.error('WebGL not available:', e);
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000008, 1);

  const raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 0.06;

  _three = { scene, camera, renderer, raycaster };

  _buildBgStars(scene);
  _buildClusters(scene);
  _buildLegendUI();
  _bindGalaxyEvents(canvas, renderer, camera, raycaster);
  _galaxyLoop(renderer, scene, camera, raycaster);
}

function _glowTex(color, size=64) {
  const c   = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g   = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
  g.addColorStop(0,   color);
  g.addColorStop(0.3, color+'99');
  g.addColorStop(0.7, color+'22');
  g.addColorStop(1,   'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,size,size);
  return new THREE.CanvasTexture(c);
}

function _buildBgStars(scene) {
  const N   = 6000;
  const pos = new Float32Array(N*3);
  const col = new Float32Array(N*3);
  for (let i=0; i<N; i++) {
    const t = Math.random()*Math.PI*2, p = Math.acos(2*Math.random()-1), r = 20+Math.random()*60;
    pos[i*3]   = r*Math.sin(p)*Math.cos(t);
    pos[i*3+1] = r*Math.sin(p)*Math.sin(t);
    pos[i*3+2] = r*Math.cos(p);
    const b = .4+Math.random()*.6;
    col[i*3]=b; col[i*3+1]=b; col[i*3+2]=Math.min(1,b+.2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
  const mat = new THREE.PointsMaterial({
    size:.07, vertexColors:true, transparent:true, opacity:.7,
    map:_glowTex('#ffffff',32), blending:THREE.AdditiveBlending, depthWrite:false,
  });
  const stars = new THREE.Points(geo,mat);
  stars.userData.isBg = true;
  scene.add(stars);
}

function _buildClusters(scene) {
  CLUSTERS.forEach(cl => {
    const g = new THREE.Group();
    g.position.set(cl.x*14, cl.y*14, cl.z*14);
    g.userData.clusterId = cl.id;

    // Core glow
    const cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]),3));
    const cMat = new THREE.PointsMaterial({
      size:.28, map:_glowTex(cl.color,128), transparent:true, opacity:1,
      blending:THREE.AdditiveBlending, depthWrite:false,
    });
    g.add(new THREE.Points(cGeo, cMat));

    // Nebula sphere
    const nGeo = new THREE.SphereGeometry(.55,16,16);
    const nMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(cl.color), transparent:true, opacity:.04,
      blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.BackSide,
    });
    g.add(new THREE.Mesh(nGeo, nMat));

    // Sites
    cl.sites.forEach(site => {
      const ang  = Math.random()*Math.PI*2;
      const incl = (Math.random()-.5)*Math.PI*.55;
      const d    = .18+Math.random()*.48;
      const sx = d*Math.cos(ang)*Math.cos(incl);
      const sy = d*Math.sin(incl);
      const sz = d*Math.sin(ang)*Math.cos(incl);

      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([sx,sy,sz]),3));
      const sSize = site.l===1 ? .11 : site.l===2 ? .075 : .05;
      const sOpa  = site.l===1 ? .95 : site.l===2 ? .65 : .38;
      const sMat  = new THREE.PointsMaterial({
        size:sSize, map:_glowTex(cl.color,64), transparent:true, opacity:sOpa,
        blending:THREE.AdditiveBlending, depthWrite:false,
      });
      const pt = new THREE.Points(sGeo, sMat);
      pt.userData = { cluster:cl, site, layer:site.l };
      g.add(pt);
      _interactable.push({ mesh:pt, cluster:cl, site });
    });

    scene.add(g);
  });
}

function _buildLegendUI() {
  const wrap = document.getElementById('legend-items');
  if (!wrap) return;
  wrap.innerHTML = '';
  CLUSTERS.forEach(cl => {
    const div = document.createElement('div');
    div.className = 'leg-item';
    div.innerHTML = `<span class="leg-dot" style="background:${cl.color};box-shadow:0 0 5px ${cl.color}"></span>${cl.label.toUpperCase()}`;
    div.addEventListener('click', () => {
      const g = _three.scene?.children.find(c => c.userData.clusterId===cl.id);
      if (g) {
        const pos = g.position.clone().normalize();
        _tSph.theta = Math.atan2(pos.x, pos.z);
        _tSph.phi   = Math.acos(Math.max(-1,Math.min(1,pos.y)));
        _tSph.r = 2.8;
        _autoRot = false;
        setTimeout(() => { _autoRot = true; }, 3500);
      }
    });
    wrap.appendChild(div);
  });

  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeLayer = parseInt(btn.dataset.layer);
      document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _interactable.forEach(({mesh}) => {
        mesh.visible = mesh.userData.layer <= _activeLayer;
      });
    });
  });
}

function _camUpdate(camera) {
  const {theta,phi,r} = _sph;
  camera.position.set(
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.cos(theta)
  );
  camera.lookAt(0,0,0);
}

function _bindGalaxyEvents(canvas, renderer, camera, raycaster) {
  // Mouse drag
  canvas.addEventListener('mousedown', e => {
    _isDragging = true; _autoRot = false;
    _prevMouse = {x:e.clientX, y:e.clientY};
  });
  window.addEventListener('mouseup', () => { _isDragging = false; _autoRot = true; });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    _ttMouse.x =  ((e.clientX-rect.left)/rect.width)*2-1;
    _ttMouse.y = -((e.clientY-rect.top)/rect.height)*2+1;
    if (_isDragging) {
      _tSph.theta -= (e.clientX-_prevMouse.x)*.005;
      _tSph.phi    = Math.max(.15, Math.min(Math.PI-.15, _tSph.phi + (e.clientY-_prevMouse.y)*.005));
      _prevMouse = {x:e.clientX, y:e.clientY};
    }
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    _tSph.r = Math.max(1.5, Math.min(12, _tSph.r + e.deltaY*.005));
  }, {passive:false});

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const v = new THREE.Vector2(
      ((e.clientX-rect.left)/rect.width)*2-1,
      -((e.clientY-rect.top)/rect.height)*2+1
    );
    raycaster.setFromCamera(v, camera);
    for (const {mesh,site} of _interactable) {
      if (!mesh.visible) continue;
      if (raycaster.intersectObject(mesh).length>0) {
        if (site.u && site.u!=='#') window.open(site.u,'_blank','noopener');
        return;
      }
    }
  });

  // Touch
  let lastTD = null;
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length===1) { _isDragging=true; _autoRot=false; _prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY}; }
  }, {passive:true});
  canvas.addEventListener('touchmove', e => {
    if (e.touches.length===1 && _isDragging) {
      _tSph.theta -= (e.touches[0].clientX-_prevMouse.x)*.006;
      _tSph.phi    = Math.max(.15,Math.min(Math.PI-.15,_tSph.phi+(e.touches[0].clientY-_prevMouse.y)*.006));
      _prevMouse = {x:e.touches[0].clientX,y:e.touches[0].clientY};
    }
    if (e.touches.length===2) {
      const d = Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
      if (lastTD) _tSph.r = Math.max(1.5,Math.min(12,_tSph.r-(d-lastTD)*.01));
      lastTD = d;
    }
  }, {passive:true});
  canvas.addEventListener('touchend', ()=>{ _isDragging=false; lastTD=null; setTimeout(()=>{_autoRot=true;},2000); });

  window.addEventListener('resize', () => {
    const W=window.innerWidth, H=window.innerHeight;
    camera.aspect = W/H; camera.updateProjectionMatrix();
    renderer.setSize(W,H);
  });
}

let _hovered = null;
function _galaxyLoop(renderer, scene, camera, raycaster) {
  let t0 = 0;
  function loop(ts) {
    requestAnimationFrame(loop);
    const t = ts*.001;

    if (_autoRot) _tSph.theta += .001;
    _sph.theta += (_tSph.theta-_sph.theta)*.06;
    _sph.phi   += (_tSph.phi-_sph.phi)*.06;
    _sph.r     += (_tSph.r-_sph.r)*.06;
    _camUpdate(camera);

    scene.children.forEach(c => {
      if (c.userData.clusterId) {
        const i = CLUSTERS.findIndex(cl=>cl.id===c.userData.clusterId);
        c.rotation.y = t*.04*(i%2===0?1:-1);
        c.rotation.x = Math.sin(t*.02+i)*.05;
      }
      if (c.userData.isBg) c.rotation.y = t*.007;
    });

    // Hover detection
    raycaster.setFromCamera(_ttMouse, camera);
    let found = null;
    for (const p of _interactable) {
      if (!p.mesh.visible) continue;
      if (raycaster.intersectObject(p.mesh).length>0) { found=p; break; }
    }
    if (found !== _hovered) {
      _hovered = found;
      _updateTooltip(found, camera, renderer.domElement);
    }
    document.getElementById('galaxy-canvas').style.cursor = found?'pointer':(_isDragging?'grabbing':'grab');

    renderer.render(scene, camera);
  }
  requestAnimationFrame(loop);
}

function _updateTooltip(found, camera, canvas) {
  const tt = document.getElementById('tooltip');
  if (!found) { tt.classList.add('hidden'); return; }
  const {cluster:cl, site} = found;
  document.getElementById('tt-name').textContent    = site.n;
  document.getElementById('tt-cluster').textContent = cl.label.toUpperCase();
  document.getElementById('tt-cluster').style.color = cl.color;
  document.getElementById('tt-url').textContent     = site.u==='#'?'[CLASSIFIED]':site.u.replace('https://','');

  const wpos = found.mesh.getWorldPosition(new THREE.Vector3());
  wpos.project(camera);
  const rect = canvas.getBoundingClientRect();
  const px   = (wpos.x+1)/2*rect.width  + rect.left;
  const py   = (1-(wpos.y+1)/2)*rect.height + rect.top;
  tt.style.left = Math.min(px+14, window.innerWidth-175)+'px';
  tt.style.top  = Math.max(py-55, 10)+'px';
  tt.classList.remove('hidden');
}

// Counter animation
function animCounter(id, target, ms) {
  const el = document.getElementById(id); if(!el) return;
  const start = performance.now();
  (function step(now) {
    const p = Math.min((now-start)/ms,1);
    el.textContent = Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString();
    if(p<1) requestAnimationFrame(step);
  })(performance.now());
}


// ══════════════════════════════════════════════════
// COBWEB + SEARCH
// ══════════════════════════════════════════════════
let _cwSim     = null;
let _cwNodes   = [], _cwLinks = [];
let _cwW       = window.innerWidth, _cwH = window.innerHeight;
let _bgParts   = [];
let _bgAnimId  = null;
let _cobwebReady = false;

function cobwebInit() {
  if (_cobwebReady) return;
  _cobwebReady = true;

  _cwW = window.innerWidth;
  _cwH = window.innerHeight;

  _bgInit();
  _cwBindUI();
  window.addEventListener('resize', _cwResize);
}

// ── Background particles ──────────────────────────
function _bgInit() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  canvas.width  = _cwW;
  canvas.height = _cwH;
  const ctx = canvas.getContext('2d');

  _bgParts = Array.from({length:110}, () => ({
    x:Math.random()*_cwW, y:Math.random()*_cwH,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    r:Math.random()*1.4+.4, a:Math.random()*.35+.08,
  }));

  function draw() {
    _bgAnimId = requestAnimationFrame(draw);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    _bgParts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=canvas.width; if(p.x>canvas.width)  p.x=0;
      if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,245,255,${p.a})`; ctx.fill();
    });
    // Connection lines
    for(let i=0;i<_bgParts.length;i++) {
      for(let j=i+1;j<_bgParts.length;j++) {
        const d=Math.hypot(_bgParts[i].x-_bgParts[j].x,_bgParts[i].y-_bgParts[j].y);
        if(d<75) {
          ctx.beginPath();
          ctx.moveTo(_bgParts[i].x,_bgParts[i].y);
          ctx.lineTo(_bgParts[j].x,_bgParts[j].y);
          ctx.strokeStyle=`rgba(0,245,255,${.055*(1-d/75)})`;
          ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
  }
  draw();
}

function _cwResize() {
  _cwW = window.innerWidth; _cwH = window.innerHeight;
  const canvas = document.getElementById('bg-canvas');
  if(canvas) { canvas.width=_cwW; canvas.height=_cwH; }
  d3.select('#cobweb-svg').attr('width',_cwW).attr('height',_cwH);
  if(_cwSim) { _cwSim.force('center',d3.forceCenter(_cwW/2,_cwH/2)); _cwSim.alpha(.3).restart(); }
}

// ── UI bindings ───────────────────────────────────
function _cwBindUI() {
  const input  = document.getElementById('search-input');
  const btn    = document.getElementById('search-btn');
  const reset  = document.getElementById('reset-btn');
  const close  = document.getElementById('ni-close');

  btn.addEventListener('click', _doSearch);
  input.addEventListener('keydown', e => { if(e.key==='Enter') _doSearch(); });
  document.querySelectorAll('.qtag').forEach(t => {
    t.addEventListener('click', () => { input.value=t.dataset.q; _doSearch(); });
  });
  reset.addEventListener('click', _resetSearch);
  close.addEventListener('click', () => { document.getElementById('node-info').style.display='none'; });
}

// ── Search ────────────────────────────────────────
async function _doSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  showEl('loading-wrap');
  document.getElementById('ai-bar').style.display='none';
  document.getElementById('node-info').style.display='none';
  document.getElementById('search-wrap').classList.add('active');
  _cwClear();

  try {
    const data = await _callSearchFn(query);
    _cwRender(query, data);
    if (data.answer) {
      document.getElementById('ai-text').textContent = data.answer;
      document.getElementById('ai-bar').style.display = 'block';
    }
  } catch(err) {
    console.error('Search error:', err);
    document.getElementById('ai-text').textContent = '⚠ ' + (err.message || 'Connection lost. Check your edge function is deployed.');
    document.getElementById('ai-bar').style.display = 'block';
  } finally {
    hideEl('loading-wrap');
  }
}

// ── Call search edge function ─────────────────────
async function _callSearchFn(query) {
  if (!_session) throw new Error('Not signed in');
  const token = _session.access_token;

  const res = await fetch(SEARCH_FUNC_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
      'apikey':        SUPABASE_ANON,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(()=>'');
    throw new Error(`Edge function returned ${res.status}: ${txt.slice(0,120)}`);
  }
  return res.json();
}

// ── D3 force graph ────────────────────────────────
function _cwRender(query, data) {
  const nodes = data.nodes || [];
  const conns = data.connections || [];

  const center = {
    id:'__q__', label: query.length>24 ? query.slice(0,24)+'…' : query,
    category:'center', isCenter:true, fx:_cwW/2, fy:_cwH/2,
  };
  const siteNodes = nodes.map(n => ({ ...n, isCenter:false }));
  _cwNodes = [center, ...siteNodes];

  const seen = new Set();
  _cwLinks = [];

  // Cross-links from AI
  conns.forEach(([a,b]) => {
    const k = [a,b].sort().join('||');
    if (!seen.has(k)) { seen.add(k); _cwLinks.push({source:a,target:b}); }
  });

  // All sites to center
  siteNodes.forEach(n => {
    const k = ['__q__',n.id].sort().join('||');
    if (!seen.has(k)) { seen.add(k); _cwLinks.push({source:'__q__',target:n.id}); }
  });

  _cwSimulate();
}

function _cwSimulate() {
  if (_cwSim) _cwSim.stop();

  const svg  = d3.select('#cobweb-svg');
  const linG = svg.select('#links-g');
  const nodG = svg.select('#nodes-g');

  svg.attr('width',_cwW).attr('height',_cwH);

  _cwSim = d3.forceSimulation(_cwNodes)
    .force('link',      d3.forceLink(_cwLinks).id(d=>d.id).distance(d=>(d.source.isCenter||d.target.isCenter)?155:105).strength(.4))
    .force('charge',    d3.forceManyBody().strength(-200))
    .force('center',    d3.forceCenter(_cwW/2,_cwH/2))
    .force('collision', d3.forceCollide().radius(d=>d.isCenter?42:28))
    .alphaDecay(.025);

  const link = linG.selectAll('.cw-link')
    .data(_cwLinks).join('line')
    .attr('class','cw-link')
    .attr('stroke', d => {
      const s = typeof d.source==='object' ? d.source : _cwNodes.find(n=>n.id===d.source);
      return CAT_COLORS[s?.category] || CAT_COLORS.other;
    })
    .attr('stroke-width', 1).attr('opacity', 0);

  const node = nodG.selectAll('.cw-node')
    .data(_cwNodes).join('g')
    .attr('class','cw-node')
    .call(d3.drag()
      .on('start', (ev,d) => { if(!ev.active) _cwSim.alphaTarget(.3).restart(); d.fx=d.x; d.fy=d.y; })
      .on('drag',  (ev,d) => { d.fx=ev.x; d.fy=ev.y; })
      .on('end',   (ev,d) => { if(!ev.active) _cwSim.alphaTarget(0); if(!d.isCenter){d.fx=null;d.fy=null;} })
    )
    .on('click', (ev,d) => { ev.stopPropagation(); if(!d.isCenter) _showNodeInfo(d); });

  node.append('circle')
    .attr('r', d => d.isCenter?22:_nRadius(d))
    .attr('fill', d => (CAT_COLORS[d.category]||CAT_COLORS.other)+'22')
    .attr('stroke', d => CAT_COLORS[d.category]||CAT_COLORS.other)
    .attr('stroke-width', d => d.isCenter?2:1.5)
    .attr('filter', 'url(#glow)');

  node.append('circle')
    .attr('r', d => d.isCenter?7:3.5)
    .attr('fill', d => CAT_COLORS[d.category]||CAT_COLORS.other);

  node.append('text')
    .attr('class', d => d.isCenter?'cw-label-center':'cw-label')
    .attr('dy', d => d.isCenter?38:_nRadius(d)+14)
    .text(d => d.label);

  // Run ticks then reveal
  for(let i=0;i<100;i++) _cwSim.tick();
  _cwSim.on('tick', () => {
    link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    node.attr('transform',d=>`translate(${d.x},${d.y})`);
  });
  node.transition().duration(500).delay((_,i)=>i*25).attr('opacity',1);
  link.transition().duration(700).delay(150).attr('opacity',d=>{
    const s=typeof d.source==='object'?d.source:null;
    return s?.isCenter?.5:.22;
  });
}

function _nRadius(d) { return 6 + (d.weight||5)*1.1; }

function _showNodeInfo(d) {
  const clr = CAT_COLORS[d.category]||CAT_COLORS.other;
  document.getElementById('ni-cat').textContent  = (d.category||'other').toUpperCase();
  document.getElementById('ni-cat').style.color  = clr;
  document.getElementById('ni-name').textContent = d.label;
  document.getElementById('ni-name').style.color = clr;
  document.getElementById('ni-desc').textContent = d.description||'No description available.';
  const lnk = document.getElementById('ni-link');
  if (d.url && d.url!=='#') {
    lnk.href = d.url.startsWith('http')?d.url:'https://'+d.url;
    lnk.style.display='inline-block';
  } else {
    lnk.style.display='none';
  }
  document.getElementById('node-info').style.display='block';
}

function _resetSearch() {
  document.getElementById('search-input').value='';
  document.getElementById('search-wrap').classList.remove('active');
  document.getElementById('ai-bar').style.display='none';
  document.getElementById('node-info').style.display='none';
  _cwClear();
}

function _cwClear() {
  _cwNodes=[]; _cwLinks=[];
  if(_cwSim) { _cwSim.stop(); _cwSim=null; }
  d3.select('#links-g').selectAll('*').remove();
  d3.select('#nodes-g').selectAll('*').remove();
}


// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
function showMsg(el, msg) { el.textContent=msg; el.classList.remove('hidden'); }
function hideEl(id) {
  const el = typeof id==='string' ? document.getElementById(id) : id;
  if (el) el.style.display='none';
}
function showEl(id) {
  const el = typeof id==='string' ? document.getElementById(id) : id;
  if (el) el.style.display='flex';
}


// ══════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  sbInit();
  authBindUI();

  // Galaxy starts after first paint
  requestAnimationFrame(() => {
    galaxyInit();
    animCounter('counter', 1847293, 2400);
  });
});
