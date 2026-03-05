  // Get these from: https://supabase.com/dashboard → Settings → API
// ═══════════════════════════════════════════════════
// js/config.js — Fill in your credentials here
  SUPABASE_URL:      'https://tdbgpvscwaysndrloltl.supabase.co',
// ═══════════════════════════════════════════════════

const CONFIG = {
  // Supabase project credentials
  // Get these from: https://supabase.com/dashboard → Settings → API
  SUPABASE_URL:      'https://jeajdcozdeejhbirbmxq.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplYWpkY296ZGVlamhiaXJibXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODQxNjMsImV4cCI6MjA4Njg2MDE2M30.o4mtcjP37RymYar6w_mvFJYUaDrp9dBqubtwL-Yljps',
  
  // Edge function URL (auto-built from Supabase URL)
  // Edge function URL (auto-built from Supabase URL)
  get EDGE_CHAT_URL() {
  get EDGE_CHAT_URL() {
    return `${this.SUPABASE_URL}/functions/v1/chat`;
    return `${this.SUPABASE_URL}/functions/v1/chat`;
  }
};
  }
};
// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════
// auth.js — Supabase Authentication (Email + OAuth)
// auth.js — Supabase Authentication (Email + OAuth)
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════

const Auth = (() => {
const Auth = (() => {
  let _client = null;
  let _client = null;
  let _session = null;

  let _session = null;

  // Redirect back to this page after OAuth
  // Redirect back to this page after OAuth
  const REDIRECT_URL = window.location.origin + window.location.pathname;
  const REDIRECT_URL = window.location.origin + window.location.pathname;


  // ── Init ──────────────────────────────────────────
  // ── Init ──────────────────────────────────────────
  function init() {
  function init() {
    _client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    _client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);


    _client.auth.onAuthStateChange((_event, session) => {
    _client.auth.onAuthStateChange((_event, session) => {
      _session = session;
      _session = session;
      if (session) {
      if (session) {
        window.dispatchEvent(new CustomEvent('auth:signin', { detail: session.user }));
        window.dispatchEvent(new CustomEvent('auth:signin', { detail: session.user }));
      } else {
      } else {
        window.dispatchEvent(new CustomEvent('auth:signout'));
        window.dispatchEvent(new CustomEvent('auth:signout'));
      }
      }
    });

    });

    _client.auth.getSession().then(({ data }) => {
    _client.auth.getSession().then(({ data }) => {
      if (data.session) {
      if (data.session) {
        _session = data.session;
        _session = data.session;
        window.dispatchEvent(new CustomEvent('auth:signin', { detail: data.session.user }));
      }
        window.dispatchEvent(new CustomEvent('auth:signin', { detail: data.session.user }));
    });

      }
    _bindUI();
  }

  // ── Bind UI ───────────────────────────────────────
    });

  function _bindUI() {
    _bindUI();
  }

  // ── Bind UI ───────────────────────────────────────
  function _bindUI() {
    // Tabs
    // Tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        const target = tab.dataset.tab;
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        tab.classList.add('active');
        document.getElementById(`form-${target}`)?.classList.add('active');
      });
    });

    // Email sign in
    document.getElementById('signin-btn')?.addEventListener('click', _handleSignIn);
        document.getElementById(`form-${target}`)?.classList.add('active');
      });
    });

    // Email sign in
    document.getElementById('signin-password')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') _handleSignIn();
    });

    // Email sign up
    document.getElementById('signin-btn')?.addEventListener('click', _handleSignIn);
    document.getElementById('signin-password')?.addEventListener('keydown', e => {
    document.getElementById('signup-btn')?.addEventListener('click', _handleSignUp);
      if (e.key === 'Enter') _handleSignIn();
    });

    // Email sign up
    document.getElementById('signup-confirm')?.addEventListener('keydown', e => {
    document.getElementById('signup-btn')?.addEventListener('click', _handleSignUp);
    document.getElementById('signup-confirm')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') _handleSignUp();
      if (e.key === 'Enter') _handleSignUp();
    });

    });

    // OAuth buttons
    // OAuth buttons
    document.getElementById('oauth-google')?.addEventListener('click',  () => _oauthSignIn('google'));
    document.getElementById('oauth-google')?.addEventListener('click',  () => _oauthSignIn('google'));
    document.getElementById('oauth-github')?.addEventListener('click',  () => _oauthSignIn('github'));
    document.getElementById('oauth-github')?.addEventListener('click',  () => _oauthSignIn('github'));
    document.getElementById('oauth-discord')?.addEventListener('click', () => _oauthSignIn('discord'));

    // Close
    document.getElementById('oauth-discord')?.addEventListener('click', () => _oauthSignIn('discord'));

    // Close
    document.getElementById('auth-close')?.addEventListener('click', closeModal);
    document.getElementById('auth-close')?.addEventListener('click', closeModal);
    document.getElementById('auth-overlay')?.addEventListener('click', e => {
    document.getElementById('auth-overlay')?.addEventListener('click', e => {
      if (e.target === document.getElementById('auth-overlay')) closeModal();
      if (e.target === document.getElementById('auth-overlay')) closeModal();
    });

    });

    // Sign out
    // Sign out
    document.getElementById('signout-btn')?.addEventListener('click', signOut);
    document.getElementById('signout-btn')?.addEventListener('click', signOut);
  }

  }
  // ── OAuth ─────────────────────────────────────────
  async function _oauthSignIn(provider) {

  // ── OAuth ─────────────────────────────────────────
    const btn = document.getElementById(`oauth-${provider}`);
  async function _oauthSignIn(provider) {
    const btn = document.getElementById(`oauth-${provider}`);
    if (btn) { btn.disabled = true; btn.textContent = 'CONNECTING...'; }
    if (btn) { btn.disabled = true; btn.textContent = 'CONNECTING...'; }


    const { error } = await _client.auth.signInWithOAuth({
    const { error } = await _client.auth.signInWithOAuth({
      provider,
      provider,
      options: { redirectTo: REDIRECT_URL },
      options: { redirectTo: REDIRECT_URL },
    });
    });


    if (error) {
    if (error) {
      console.error(`${provider} OAuth error:`, error.message);
      console.error(`${provider} OAuth error:`, error.message);
      if (btn) { btn.disabled = false; btn.textContent = _providerLabel(provider); }
      if (btn) { btn.disabled = false; btn.textContent = _providerLabel(provider); }
    }
    }
    // On success, browser redirects — no further action needed
    // On success, browser redirects — no further action needed
  }

  }

  function _providerLabel(provider) {
  function _providerLabel(provider) {
    const labels = { google: '▲ CONTINUE WITH GOOGLE', github: '⌥ CONTINUE WITH GITHUB', discord: '◈ CONTINUE WITH DISCORD' };
    const labels = { google: '▲ CONTINUE WITH GOOGLE', github: '⌥ CONTINUE WITH GITHUB', discord: '◈ CONTINUE WITH DISCORD' };
    return labels[provider] || provider.toUpperCase();
    return labels[provider] || provider.toUpperCase();
  }
  }


  // ── Email Sign In ─────────────────────────────────
  // ── Email Sign In ─────────────────────────────────
  async function _handleSignIn() {
  async function _handleSignIn() {
    const email    = document.getElementById('signin-email').value.trim();
    const email    = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const password = document.getElementById('signin-password').value;
    const errEl    = document.getElementById('signin-error');
    const errEl    = document.getElementById('signin-error');
    const btn      = document.getElementById('signin-btn');
    const btn      = document.getElementById('signin-btn');


    if (!email || !password) { _showError(errEl, 'Please fill in all fields.'); return; }
    if (!email || !password) { _showError(errEl, 'Please fill in all fields.'); return; }


    _setLoading(btn, true);
    _setLoading(btn, true);
    _hideMsg(errEl);
    _hideMsg(errEl);


    const { error } = await _client.auth.signInWithPassword({ email, password });
    const { error } = await _client.auth.signInWithPassword({ email, password });
    if (error) { _setLoading(btn, false); _showError(errEl, error.message); }
    if (error) { _setLoading(btn, false); _showError(errEl, error.message); }
    else { closeModal(); }
    else { closeModal(); }
  }
  }


  // ── Email Sign Up ─────────────────────────────────
  // ── Email Sign Up ─────────────────────────────────
  async function _handleSignUp() {
  async function _handleSignUp() {
    const email    = document.getElementById('signup-email').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const password = document.getElementById('signup-password').value;
    const confirm  = document.getElementById('signup-confirm').value;
    const confirm  = document.getElementById('signup-confirm').value;
    const errEl    = document.getElementById('signup-error');
    const errEl    = document.getElementById('signup-error');
    const sucEl    = document.getElementById('signup-success');
    const sucEl    = document.getElementById('signup-success');
    const btn      = document.getElementById('signup-btn');
    const btn      = document.getElementById('signup-btn');


    if (!email || !password || !confirm) { _showError(errEl, 'Please fill in all fields.'); return; }
    if (!email || !password || !confirm) { _showError(errEl, 'Please fill in all fields.'); return; }
    if (password !== confirm)            { _showError(errEl, 'Passwords do not match.');    return; }
    if (password !== confirm)            { _showError(errEl, 'Passwords do not match.');    return; }
    if (password.length < 6)            { _showError(errEl, 'Minimum 6 characters.');       return; }
    if (password.length < 6)            { _showError(errEl, 'Minimum 6 characters.');       return; }


    _setLoading(btn, true);
    _setLoading(btn, true);
    _hideMsg(errEl);
    _hideMsg(errEl);
    _hideMsg(sucEl);
    _hideMsg(sucEl);


    const { error } = await _client.auth.signUp({ email, password });
    const { error } = await _client.auth.signUp({ email, password });
    _setLoading(btn, false);
    _setLoading(btn, false);
    if (error) { _showError(errEl, error.message); }
    if (error) { _showError(errEl, error.message); }
    else { sucEl.classList.remove('hidden'); }
    else { sucEl.classList.remove('hidden'); }
  }

  }

  // ── Sign Out ──────────────────────────────────────
  // ── Sign Out ──────────────────────────────────────
  async function signOut() {
  async function signOut() {
    await _client.auth.signOut();
    await _client.auth.signOut();
  }
  }


  // ── Helpers ───────────────────────────────────────
  // ── Helpers ───────────────────────────────────────
  function openModal()  { document.getElementById('auth-overlay').classList.remove('hidden'); }
  function openModal()  { document.getElementById('auth-overlay').classList.remove('hidden'); }
  function closeModal() { document.getElementById('auth-overlay').classList.add('hidden'); }
  function closeModal() { document.getElementById('auth-overlay').classList.add('hidden'); }


  function _showError(el, msg) { el.textContent = msg; el.classList.remove('hidden'); }
  function _showError(el, msg) { el.textContent = msg; el.classList.remove('hidden'); }
  function _hideMsg(el)        { el.classList.add('hidden'); }
  function _hideMsg(el)        { el.classList.add('hidden'); }


  function _setLoading(btn, loading) {
  function _setLoading(btn, loading) {
    const text   = btn.querySelector('.btn-text');
    const text   = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');
    const loader = btn.querySelector('.btn-loader');
    btn.disabled = loading;
    btn.disabled = loading;
    text?.classList.toggle('hidden', loading);
    text?.classList.toggle('hidden', loading);
    loader?.classList.toggle('hidden', !loading);
    loader?.classList.toggle('hidden', !loading);
    loader?.classList.toggle('visible', loading);
    loader?.classList.toggle('visible', loading);
  }

  }

  function getUser()   { return _session?.user ?? null; }
  function getUser()   { return _session?.user ?? null; }
  function getClient() { return _client; }

  function getClient() { return _client; }

  return { init, openModal, closeModal, signOut, getUser, getClient };
  return { init, openModal, closeModal, signOut, getUser, getClient };
})();
})();
// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════
// js/galaxy.js — Three.js 3D Holographic Galaxy
// js/galaxy.js — Three.js 3D Holographic Galaxy
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════

const Galaxy = (() => {

const Galaxy = (() => {

  // ── Cluster Data ──────────────────────────────────
  // ── Cluster Data ──────────────────────────────────
  const CLUSTERS = [
  const CLUSTERS = [
    {
    {
      id: 'social',    label: 'Social Media',  color: '#ff6b6b',
      id: 'social',    label: 'Social Media',  color: '#ff6b6b',
      hx: -1.8, hy:  0.4, hz:  0.5,
      hx: -1.8, hy:  0.4, hz:  0.5,
      sites: [
      sites: [
        { name: 'Twitter/X',   url: 'https://x.com',           layer: 1 },
        { name: 'Twitter/X',   url: 'https://x.com',           layer: 1 },
        { name: 'Instagram',   url: 'https://instagram.com',    layer: 1 },
        { name: 'Instagram',   url: 'https://instagram.com',    layer: 1 },
        { name: 'TikTok',      url: 'https://tiktok.com',       layer: 1 },
        { name: 'TikTok',      url: 'https://tiktok.com',       layer: 1 },
        { name: 'Reddit',      url: 'https://reddit.com',       layer: 1 },
        { name: 'Reddit',      url: 'https://reddit.com',       layer: 1 },
        { name: 'Facebook',    url: 'https://facebook.com',     layer: 1 },
        { name: 'Facebook',    url: 'https://facebook.com',     layer: 1 },
        { name: 'LinkedIn',    url: 'https://linkedin.com',     layer: 1 },
        { name: 'LinkedIn',    url: 'https://linkedin.com',     layer: 1 },
        { name: 'Snapchat',    url: 'https://snapchat.com',     layer: 1 },
        { name: 'Snapchat',    url: 'https://snapchat.com',     layer: 1 },
        { name: 'Threads',     url: 'https://threads.net',      layer: 1 },
        { name: 'Threads',     url: 'https://threads.net',      layer: 1 },
        { name: 'Discord',     url: 'https://discord.com',      layer: 2 },
        { name: 'Discord',     url: 'https://discord.com',      layer: 2 },
        { name: 'BeReal',      url: 'https://bere.al',          layer: 2 },
        { name: 'BeReal',      url: 'https://bere.al',          layer: 2 },
        { name: 'Tumblr',      url: 'https://tumblr.com',       layer: 2 },
        { name: 'Tumblr',      url: 'https://tumblr.com',       layer: 2 },
        { name: 'Mastodon',    url: 'https://mastodon.social',  layer: 2 },
        { name: 'Mastodon',    url: 'https://mastodon.social',  layer: 2 },
        { name: 'Cohost',      url: 'https://cohost.org',       layer: 3 },
        { name: 'Cohost',      url: 'https://cohost.org',       layer: 3 },
        { name: 'Pillowfort',  url: 'https://pillowfort.social',layer: 3 },
        { name: 'Pillowfort',  url: 'https://pillowfort.social',layer: 3 },
      ]
      ]
    },
    },
    {
    {
      id: 'ai',        label: 'AI Tools',       color: '#00f5ff',
      id: 'ai',        label: 'AI Tools',       color: '#00f5ff',
      hx:  0.2, hy:  1.2, hz: -0.8,
      hx:  0.2, hy:  1.2, hz: -0.8,
      sites: [
      sites: [
        { name: 'ChatGPT',     url: 'https://chat.openai.com',  layer: 1 },
        { name: 'ChatGPT',     url: 'https://chat.openai.com',  layer: 1 },
        { name: 'Claude',      url: 'https://claude.ai',         layer: 1 },
        { name: 'Claude',      url: 'https://claude.ai',         layer: 1 },
        { name: 'Gemini',      url: 'https://gemini.google.com', layer: 1 },
        { name: 'Gemini',      url: 'https://gemini.google.com', layer: 1 },
        { name: 'Cyanix AI',   url: '#',                         layer: 1 },
        { name: 'Cyanix AI',   url: '#',                         layer: 1 },
        { name: 'Perplexity',  url: 'https://perplexity.ai',    layer: 1 },
        { name: 'Perplexity',  url: 'https://perplexity.ai',    layer: 1 },
        { name: 'Midjourney',  url: 'https://midjourney.com',   layer: 1 },
        { name: 'Midjourney',  url: 'https://midjourney.com',   layer: 1 },
        { name: 'Runway',      url: 'https://runwayml.com',     layer: 2 },
        { name: 'Runway',      url: 'https://runwayml.com',     layer: 2 },
        { name: 'ElevenLabs',  url: 'https://elevenlabs.io',    layer: 2 },
        { name: 'ElevenLabs',  url: 'https://elevenlabs.io',    layer: 2 },
        { name: 'Cursor',      url: 'https://cursor.sh',         layer: 2 },
        { name: 'Cursor',      url: 'https://cursor.sh',         layer: 2 },
        { name: 'Sora',        url: 'https://sora.com',          layer: 2 },
        { name: 'Sora',        url: 'https://sora.com',          layer: 2 },
        { name: 'Pika',        url: 'https://pika.art',          layer: 2 },
        { name: 'Pika',        url: 'https://pika.art',          layer: 2 },
      ]
      ]
    },
    },
    {
    {
      id: 'gaming',    label: 'Gaming',          color: '#a855f7',
      id: 'gaming',    label: 'Gaming',          color: '#a855f7',
      hx:  2.0, hy: -0.3, hz:  0.2,
      hx:  2.0, hy: -0.3, hz:  0.2,
      sites: [
      sites: [
        { name: 'Steam',        url: 'https://store.steampowered.com', layer: 1 },
        { name: 'Steam',        url: 'https://store.steampowered.com', layer: 1 },
        { name: 'Twitch',       url: 'https://twitch.tv',              layer: 1 },
        { name: 'Twitch',       url: 'https://twitch.tv',              layer: 1 },
        { name: 'Epic Games',   url: 'https://epicgames.com',          layer: 1 },
        { name: 'Epic Games',   url: 'https://epicgames.com',          layer: 1 },
        { name: 'Roblox',       url: 'https://roblox.com',             layer: 1 },
        { name: 'Roblox',       url: 'https://roblox.com',             layer: 1 },
        { name: 'Fortnite',     url: 'https://fortnite.com',           layer: 1 },
        { name: 'Fortnite',     url: 'https://fortnite.com',           layer: 1 },
        { name: 'Minecraft',    url: 'https://minecraft.net',          layer: 1 },
        { name: 'Minecraft',    url: 'https://minecraft.net',          layer: 1 },
        { name: 'Valorant',     url: 'https://playvalorant.com',       layer: 2 },
        { name: 'Valorant',     url: 'https://playvalorant.com',       layer: 2 },
        { name: 'Xbox',         url: 'https://xbox.com',               layer: 2 },
        { name: 'Xbox',         url: 'https://xbox.com',               layer: 2 },
        { name: 'PlayStation',  url: 'https://playstation.com',        layer: 2 },
        { name: 'PlayStation',  url: 'https://playstation.com',        layer: 2 },
        { name: 'GOG',          url: 'https://gog.com',                layer: 2 },
        { name: 'GOG',          url: 'https://gog.com',                layer: 2 },
        { name: 'itch.io',      url: 'https://itch.io',                layer: 3 },
        { name: 'itch.io',      url: 'https://itch.io',                layer: 3 },
        { name: 'Newgrounds',   url: 'https://newgrounds.com',         layer: 3 },
        { name: 'Newgrounds',   url: 'https://newgrounds.com',         layer: 3 },
      ]
      ]
    },
    },
    {
    {
      id: 'news',      label: 'News & Media',    color: '#f59e0b',
      id: 'news',      label: 'News & Media',    color: '#f59e0b',
      hx: -0.5, hy: -1.4, hz:  0.6,
      hx: -0.5, hy: -1.4, hz:  0.6,
      sites: [
      sites: [
        { name: 'BBC',          url: 'https://bbc.com',         layer: 1 },
        { name: 'BBC',          url: 'https://bbc.com',         layer: 1 },
        { name: 'Reuters',      url: 'https://reuters.com',     layer: 1 },
        { name: 'Reuters',      url: 'https://reuters.com',     layer: 1 },
        { name: 'The Verge',    url: 'https://theverge.com',    layer: 1 },
        { name: 'The Verge',    url: 'https://theverge.com',    layer: 1 },
        { name: 'TechCrunch',   url: 'https://techcrunch.com',  layer: 1 },
        { name: 'TechCrunch',   url: 'https://techcrunch.com',  layer: 1 },
        { name: 'Wired',        url: 'https://wired.com',       layer: 1 },
        { name: 'Wired',        url: 'https://wired.com',       layer: 1 },
        { name: 'Hacker News',  url: 'https://news.ycombinator.com', layer: 2 },
        { name: 'Hacker News',  url: 'https://news.ycombinator.com', layer: 2 },
        { name: 'Bloomberg',    url: 'https://bloomberg.com',   layer: 2 },
        { name: 'Bloomberg',    url: 'https://bloomberg.com',   layer: 2 },
        { name: 'Axios',        url: 'https://axios.com',       layer: 2 },
        { name: 'Axios',        url: 'https://axios.com',       layer: 2 },
        { name: 'Substack',     url: 'https://substack.com',    layer: 2 },
        { name: 'Substack',     url: 'https://substack.com',    layer: 2 },
        { name: 'The Guardian', url: 'https://theguardian.com', layer: 2 },
        { name: 'The Guardian', url: 'https://theguardian.com', layer: 2 },
      ]
      ]
    },
    },
    {
    {
      id: 'darkweb',   label: 'Dark Web',        color: '#374151',
      id: 'darkweb',   label: 'Dark Web',        color: '#374151',
      hx:  1.2, hy:  1.6, hz:  1.0,
      hx:  1.2, hy:  1.6, hz:  1.0,
      sites: [
      sites: [
        { name: '[REDACTED]',   url: '#', layer: 4 },
        { name: '[REDACTED]',   url: '#', layer: 4 },
        { name: '[CLASSIFIED]', url: '#', layer: 4 },
        { name: '[CLASSIFIED]', url: '#', layer: 4 },
        { name: '[UNKNOWN]',    url: '#', layer: 4 },
        { name: '[UNKNOWN]',    url: '#', layer: 4 },
        { name: '[ENCRYPTED]',  url: '#', layer: 4 },
        { name: '[ENCRYPTED]',  url: '#', layer: 4 },
        { name: '[HIDDEN]',     url: '#', layer: 4 },
        { name: '[HIDDEN]',     url: '#', layer: 4 },
      ]
      ]
    },
    },
    {
    {
      id: 'startups',  label: 'Startups',        color: '#10b981',
      id: 'startups',  label: 'Startups',        color: '#10b981',
      hx: -1.2, hy:  1.0, hz: -0.5,
      hx: -1.2, hy:  1.0, hz: -0.5,
      sites: [
      sites: [
        { name: 'Y Combinator', url: 'https://ycombinator.com', layer: 1 },
        { name: 'Y Combinator', url: 'https://ycombinator.com', layer: 1 },
        { name: 'Product Hunt', url: 'https://producthunt.com',  layer: 1 },
        { name: 'Product Hunt', url: 'https://producthunt.com',  layer: 1 },
        { name: 'Vercel',       url: 'https://vercel.com',       layer: 1 },
        { name: 'Vercel',       url: 'https://vercel.com',       layer: 1 },
        { name: 'Supabase',     url: 'https://supabase.com',     layer: 1 },
        { name: 'Supabase',     url: 'https://supabase.com',     layer: 1 },
        { name: 'Figma',        url: 'https://figma.com',        layer: 1 },
        { name: 'Figma',        url: 'https://figma.com',        layer: 1 },
        { name: 'Notion',       url: 'https://notion.so',        layer: 1 },
        { name: 'Notion',       url: 'https://notion.so',        layer: 1 },
        { name: 'Linear',       url: 'https://linear.app',       layer: 2 },
        { name: 'Linear',       url: 'https://linear.app',       layer: 2 },
        { name: 'AngelList',    url: 'https://angel.co',         layer: 2 },
        { name: 'AngelList',    url: 'https://angel.co',         layer: 2 },
        { name: 'Indie Hackers',url: 'https://indiehackers.com', layer: 2 },
        { name: 'Indie Hackers',url: 'https://indiehackers.com', layer: 2 },
        { name: 'Lemon Squeezy',url: 'https://lemonsqueezy.com', layer: 3 },
        { name: 'Lemon Squeezy',url: 'https://lemonsqueezy.com', layer: 3 },
      ]
      ]
    },
    },
    {
    {
      id: 'education', label: 'Education',       color: '#3b82f6',
      id: 'education', label: 'Education',       color: '#3b82f6',
      hx:  0.8, hy: -1.8, hz: -0.4,
      hx:  0.8, hy: -1.8, hz: -0.4,
      sites: [
      sites: [
        { name: 'Khan Academy', url: 'https://khanacademy.org',  layer: 1 },
        { name: 'Khan Academy', url: 'https://khanacademy.org',  layer: 1 },
        { name: 'Coursera',     url: 'https://coursera.org',     layer: 1 },
        { name: 'Coursera',     url: 'https://coursera.org',     layer: 1 },
        { name: 'YouTube',      url: 'https://youtube.com',      layer: 1 },
        { name: 'YouTube',      url: 'https://youtube.com',      layer: 1 },
        { name: 'Wikipedia',    url: 'https://wikipedia.org',    layer: 1 },
        { name: 'Wikipedia',    url: 'https://wikipedia.org',    layer: 1 },
        { name: 'Duolingo',     url: 'https://duolingo.com',     layer: 1 },
        { name: 'Duolingo',     url: 'https://duolingo.com',     layer: 1 },
        { name: 'Udemy',        url: 'https://udemy.com',        layer: 2 },
        { name: 'Udemy',        url: 'https://udemy.com',        layer: 2 },
        { name: 'Brilliant',    url: 'https://brilliant.org',    layer: 2 },
        { name: 'Brilliant',    url: 'https://brilliant.org',    layer: 2 },
        { name: 'Codecademy',   url: 'https://codecademy.com',  layer: 2 },
        { name: 'Codecademy',   url: 'https://codecademy.com',  layer: 2 },
        { name: 'MIT OCW',      url: 'https://ocw.mit.edu',     layer: 2 },
        { name: 'MIT OCW',      url: 'https://ocw.mit.edu',     layer: 2 },
        { name: 'Sci-Hub',      url: '#',                        layer: 3 },
        { name: 'Sci-Hub',      url: '#',                        layer: 3 },
      ]
      ]
    },
    },
    {
    {
      id: 'ecommerce', label: 'E-Commerce',      color: '#f97316',
      id: 'ecommerce', label: 'E-Commerce',      color: '#f97316',
      hx: -2.2, hy: -0.8, hz: -0.2,
      hx: -2.2, hy: -0.8, hz: -0.2,
      sites: [
      sites: [
        { name: 'Amazon',    url: 'https://amazon.com',   layer: 1 },
        { name: 'Amazon',    url: 'https://amazon.com',   layer: 1 },
        { name: 'Shopify',   url: 'https://shopify.com',  layer: 1 },
        { name: 'Shopify',   url: 'https://shopify.com',  layer: 1 },
        { name: 'Etsy',      url: 'https://etsy.com',     layer: 1 },
        { name: 'Etsy',      url: 'https://etsy.com',     layer: 1 },
        { name: 'eBay',      url: 'https://ebay.com',     layer: 1 },
        { name: 'eBay',      url: 'https://ebay.com',     layer: 1 },
        { name: 'Stripe',    url: 'https://stripe.com',   layer: 1 },
        { name: 'Stripe',    url: 'https://stripe.com',   layer: 1 },
        { name: 'Gumroad',   url: 'https://gumroad.com',  layer: 2 },
        { name: 'Gumroad',   url: 'https://gumroad.com',  layer: 2 },
        { name: 'Depop',     url: 'https://depop.com',    layer: 2 },
        { name: 'Depop',     url: 'https://depop.com',    layer: 2 },
        { name: 'StockX',    url: 'https://stockx.com',   layer: 2 },
        { name: 'StockX',    url: 'https://stockx.com',   layer: 2 },
        { name: 'Mercari',   url: 'https://mercari.com',  layer: 2 },
        { name: 'Mercari',   url: 'https://mercari.com',  layer: 2 },
      ]
      ]
    },
    },
  ];
  ];


  // ── State ─────────────────────────────────────────
  // ── State ─────────────────────────────────────────
  let scene, camera, renderer, animId;
  let scene, camera, renderer, animId;
  let starField, clusterGroups = [];
  let starField, clusterGroups = [];
  let raycaster, mouse;
  let raycaster, mouse;
  let hoveredPoint = null;
  let hoveredPoint = null;
  let activeLayer  = 1;
  let activeLayer  = 1;


  // All interactive points as flat array
  // All interactive points as flat array
  let interactivePoints = []; // { mesh, cluster, site, worldPos }
  let interactivePoints = []; // { mesh, cluster, site, worldPos }


  // Mouse drag orbit
  // Mouse drag orbit
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let spherical  = { theta: 0.3, phi: Math.PI / 2.5, radius: 5 };
  let spherical  = { theta: 0.3, phi: Math.PI / 2.5, radius: 5 };
  let targetSpherical = { ...spherical };
  let targetSpherical = { ...spherical };
  let autoRotate = true;

  let autoRotate = true;

  // Touch
  // Touch
  let lastTouchDist = null;

  let lastTouchDist = null;

  // ── Public Init ───────────────────────────────────
  // ── Public Init ───────────────────────────────────
  function init() {
  function init() {
    const canvas = document.getElementById('galaxy-canvas');
    const canvas = document.getElementById('galaxy-canvas');
    // Use window dimensions — canvas.clientWidth can return 0 before layout
    // Use window dimensions — canvas.clientWidth can return 0 before layout
    const W = window.innerWidth;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const H = window.innerHeight;

    // Scene
    // Scene
    scene = new THREE.Scene();
    scene = new THREE.Scene();


    // Camera
    // Camera
    camera = new THREE.PerspectiveCamera(60, W / H, 0.01, 200);
    camera = new THREE.PerspectiveCamera(60, W / H, 0.01, 200);
    _updateCamera();
    _updateCamera();


    // Renderer — wrapped in try/catch in case WebGL is unavailable
    // Renderer — wrapped in try/catch in case WebGL is unavailable
    try {
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch(e) {
    } catch(e) {
      console.error('WebGL init failed:', e);
      console.error('WebGL init failed:', e);
      return;
      return;
    }
    }
    renderer.setSize(W, H, false);
    renderer.setSize(W, H, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000008, 1);
    renderer.setClearColor(0x000008, 1);


    // Raycaster
    // Raycaster
    raycaster = new THREE.Raycaster();
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.05;
    raycaster.params.Points.threshold = 0.05;
    mouse = new THREE.Vector2();
    mouse = new THREE.Vector2();


    _buildBackground();
    _buildBackground();
    _buildClusters();
    _buildClusters();
    _buildLegend();
    _buildLegend();
    _bindEvents(canvas);
    _bindEvents(canvas);
    _loop();
    _loop();
  }
  }


  // ── Glow Texture ─────────────────────────────────
  // ── Glow Texture ─────────────────────────────────
  function _makeGlowTexture(color = '#ffffff', size = 64) {
  function _makeGlowTexture(color = '#ffffff', size = 64) {
    const c = document.createElement('canvas');
    const c = document.createElement('canvas');
    c.width = c.height = size;
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const ctx = c.getContext('2d');
    const g   = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    const g   = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0,   color);
    g.addColorStop(0,   color);
    g.addColorStop(0.2, color + 'cc');
    g.addColorStop(0.2, color + 'cc');
    g.addColorStop(0.5, color + '44');
    g.addColorStop(0.5, color + '44');
    g.addColorStop(1,   'transparent');
    g.addColorStop(1,   'transparent');
    ctx.fillStyle = g;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
    return new THREE.CanvasTexture(c);
  }

  }

  // ── Background Stars ─────────────────────────────
  // ── Background Stars ─────────────────────────────
  function _buildBackground() {
  function _buildBackground() {
    const COUNT = 6000;
    const COUNT = 6000;
    const positions = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
    const sizes     = new Float32Array(COUNT);


    for (let i = 0; i < COUNT; i++) {
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 20 + Math.random() * 60;
      const r     = 20 + Math.random() * 60;
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      positions[i*3+2] = r * Math.cos(phi);


      const bright = 0.4 + Math.random() * 0.6;
      const bright = 0.4 + Math.random() * 0.6;
      const hue    = Math.random() > 0.7 ? new THREE.Color(0.55, 0.8, 1) : new THREE.Color(bright, bright, bright);
      const hue    = Math.random() > 0.7 ? new THREE.Color(0.55, 0.8, 1) : new THREE.Color(bright, bright, bright);
      colors[i*3]   = hue.r;
      colors[i*3]   = hue.r;
      colors[i*3+1] = hue.g;
      colors[i*3+1] = hue.g;
      colors[i*3+2] = hue.b;
      colors[i*3+2] = hue.b;
      sizes[i] = 0.5 + Math.random() * 1.5;
      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    }

    const geo = new THREE.BufferGeometry();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));


    const mat = new THREE.PointsMaterial({
    const mat = new THREE.PointsMaterial({
      size:           0.08,
      size:           0.08,
      vertexColors:   true,
      vertexColors:   true,
      transparent:    true,
      transparent:    true,
      opacity:        0.8,
      opacity:        0.8,
      map:            _makeGlowTexture('#ffffff', 32),
      map:            _makeGlowTexture('#ffffff', 32),
      blending:       THREE.AdditiveBlending,
      blending:       THREE.AdditiveBlending,
      depthWrite:     false,
      depthWrite:     false,
      sizeAttenuation:true,
      sizeAttenuation:true,
    });
    });


    starField = new THREE.Points(geo, mat);
    starField = new THREE.Points(geo, mat);
    scene.add(starField);
    scene.add(starField);
  }
  }


  // ── Cluster Groups ────────────────────────────────
  // ── Cluster Groups ────────────────────────────────
  function _buildClusters() {
  function _buildClusters() {
    CLUSTERS.forEach(cluster => {
    CLUSTERS.forEach(cluster => {
      const group = new THREE.Group();
      const group = new THREE.Group();
      group.userData.clusterId = cluster.id;
      group.userData.clusterId = cluster.id;


      const clr = new THREE.Color(cluster.color);
      const clr = new THREE.Color(cluster.color);


      // Core star
      // Core star
      const coreTex = _makeGlowTexture(cluster.color, 128);
      const coreTex = _makeGlowTexture(cluster.color, 128);
      const coreMat = new THREE.PointsMaterial({
      const coreMat = new THREE.PointsMaterial({
        size:            0.25,
        size:            0.25,
        map:             coreTex,
        map:             coreTex,
        transparent:     true,
        transparent:     true,
        opacity:         1,
        opacity:         1,
        blending:        THREE.AdditiveBlending,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
        depthWrite:      false,
        sizeAttenuation: true,
        sizeAttenuation: true,
      });
      });
      const coreGeo  = new THREE.BufferGeometry();
      const coreGeo  = new THREE.BufferGeometry();
      const corePos  = new Float32Array([0, 0, 0]);
      const corePos  = new Float32Array([0, 0, 0]);
      coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
      coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
      const corePoint = new THREE.Points(coreGeo, coreMat);
      const corePoint = new THREE.Points(coreGeo, coreMat);
      group.add(corePoint);
      group.add(corePoint);


      // Nebula glow (large transparent sphere)
      // Nebula glow (large transparent sphere)
      const nebulaGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const nebulaGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const nebulaMat = new THREE.MeshBasicMaterial({
      const nebulaMat = new THREE.MeshBasicMaterial({
        color: clr,
        color: clr,
        transparent: true,
        transparent: true,
        opacity: 0.04,
        opacity: 0.04,
        blending: THREE.AdditiveBlending,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthWrite: false,
        side: THREE.BackSide,
        side: THREE.BackSide,
      });
      });
      group.add(new THREE.Mesh(nebulaGeo, nebulaMat));
      group.add(new THREE.Mesh(nebulaGeo, nebulaMat));


      // Satellite sites
      // Satellite sites
      cluster.sites.forEach(site => {
      cluster.sites.forEach(site => {
        const angle  = Math.random() * Math.PI * 2;
        const angle  = Math.random() * Math.PI * 2;
        const incl   = (Math.random() - 0.5) * Math.PI * 0.6;
        const incl   = (Math.random() - 0.5) * Math.PI * 0.6;
        const dist   = 0.2 + Math.random() * 0.5;
        const dist   = 0.2 + Math.random() * 0.5;
        const x = dist * Math.cos(angle) * Math.cos(incl);
        const x = dist * Math.cos(angle) * Math.cos(incl);
        const y = dist * Math.sin(incl);
        const y = dist * Math.sin(incl);
        const z = dist * Math.sin(angle) * Math.cos(incl);
        const z = dist * Math.sin(angle) * Math.cos(incl);


        const siteTex = _makeGlowTexture(cluster.color, 64);
        const siteTex = _makeGlowTexture(cluster.color, 64);
        const siteMat = new THREE.PointsMaterial({
        const siteMat = new THREE.PointsMaterial({
          size:            site.layer === 1 ? 0.1 : site.layer === 2 ? 0.07 : 0.05,
          size:            site.layer === 1 ? 0.1 : site.layer === 2 ? 0.07 : 0.05,
          map:             siteTex,
          map:             siteTex,
          transparent:     true,
          transparent:     true,
          opacity:         site.layer === 1 ? 0.9 : site.layer === 2 ? 0.6 : 0.35,
          opacity:         site.layer === 1 ? 0.9 : site.layer === 2 ? 0.6 : 0.35,
          blending:        THREE.AdditiveBlending,
          blending:        THREE.AdditiveBlending,
          depthWrite:      false,
          depthWrite:      false,
          sizeAttenuation: true,
        });
          sizeAttenuation: true,
        });
        const siteGeo = new THREE.BufferGeometry();
        const siteGeo = new THREE.BufferGeometry();
        siteGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));
        siteGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));
        const sitePoint = new THREE.Points(siteGeo, siteMat);
        const sitePoint = new THREE.Points(siteGeo, siteMat);
        sitePoint.userData = { cluster, site };
        sitePoint.userData = { cluster, site };
        group.add(sitePoint);
        group.add(sitePoint);


        interactivePoints.push({
        interactivePoints.push({
          mesh:     sitePoint,
          mesh:     sitePoint,
          cluster:  cluster,
          cluster:  cluster,
          site:     site,
          site:     site,
          worldPos: new THREE.Vector3(x, y, z),
          worldPos: new THREE.Vector3(x, y, z),
        });
        });
      });

      });

      group.position.set(cluster.hx, cluster.hy, cluster.hz);
      group.position.set(cluster.hx, cluster.hy, cluster.hz);
      clusterGroups.push(group);
      clusterGroups.push(group);
      scene.add(group);
      scene.add(group);
    });
    });
  }
  }


  // ── Legend ────────────────────────────────────────
  // ── Legend ────────────────────────────────────────
  function _buildLegend() {
  function _buildLegend() {
    const container = document.getElementById('legend-items');
    const container = document.getElementById('legend-items');
    container.innerHTML = '';
    container.innerHTML = '';
    CLUSTERS.forEach(c => {
    CLUSTERS.forEach(c => {
      const item = document.createElement('div');
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.className = 'legend-item';
      item.innerHTML = `<span class="legend-dot" style="background:${c.color};box-shadow:0 0 6px ${c.color}"></span>${c.label.toUpperCase()}`;
      item.innerHTML = `<span class="legend-dot" style="background:${c.color};box-shadow:0 0 6px ${c.color}"></span>${c.label.toUpperCase()}`;
      item.addEventListener('click', () => {
      item.addEventListener('click', () => {
        const g = clusterGroups.find(g => g.userData.clusterId === c.id);
        const g = clusterGroups.find(g => g.userData.clusterId === c.id);
        if (g) _flyTo(g.position);
        if (g) _flyTo(g.position);
      });
      });
      container.appendChild(item);
      container.appendChild(item);
    });
    });


    // Layer toggles
    // Layer toggles
    document.querySelectorAll('.layer-item').forEach(el => {
    document.querySelectorAll('.layer-item').forEach(el => {
      el.addEventListener('click', () => {
      el.addEventListener('click', () => {
        const layer = parseInt(el.dataset.layer);
        const layer = parseInt(el.dataset.layer);
        activeLayer = layer;
        activeLayer = layer;
        document.querySelectorAll('.layer-item').forEach(li => li.classList.remove('active'));
        document.querySelectorAll('.layer-item').forEach(li => li.classList.remove('active'));
        el.classList.add('active');
        el.classList.add('active');
        _applyLayer();
        _applyLayer();
      });
      });
    });
    });
  }
  }


  function _applyLayer() {
  function _applyLayer() {
    interactivePoints.forEach(({ mesh, site }) => {
    interactivePoints.forEach(({ mesh, site }) => {
      mesh.visible = site.layer <= activeLayer;
      mesh.visible = site.layer <= activeLayer;
    });
    });
  }

  }

  // ── Camera fly-to ─────────────────────────────────
  // ── Camera fly-to ─────────────────────────────────
  function _flyTo(pos) {
  function _flyTo(pos) {
    autoRotate = false;
    autoRotate = false;
    const dir = pos.clone().normalize();
    const dir = pos.clone().normalize();
    targetSpherical.theta = Math.atan2(dir.x, dir.z);
    targetSpherical.theta = Math.atan2(dir.x, dir.z);
    targetSpherical.phi   = Math.acos(Math.max(-1, Math.min(1, dir.y)));
    targetSpherical.phi   = Math.acos(Math.max(-1, Math.min(1, dir.y)));
    targetSpherical.radius = 2.5;
    targetSpherical.radius = 2.5;
    setTimeout(() => { autoRotate = true; }, 3000);
    setTimeout(() => { autoRotate = true; }, 3000);
  }
  }


  // ── Camera Update ─────────────────────────────────
  // ── Camera Update ─────────────────────────────────
  function _updateCamera() {
  function _updateCamera() {
    const { theta, phi, radius } = spherical;
    const { theta, phi, radius } = spherical;
    camera.position.set(
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta)
      radius * Math.sin(phi) * Math.cos(theta)
    );
    );
    camera.lookAt(0, 0, 0);
    camera.lookAt(0, 0, 0);
  }

  }

  // ── Events ────────────────────────────────────────
  // ── Events ────────────────────────────────────────
  function _bindEvents(canvas) {
  function _bindEvents(canvas) {
    // Mouse
    // Mouse
    canvas.addEventListener('mousedown', e => {
    canvas.addEventListener('mousedown', e => {
      isDragging  = true;
      isDragging  = true;
      autoRotate  = false;
      autoRotate  = false;
      prevMouse   = { x: e.clientX, y: e.clientY };
      prevMouse   = { x: e.clientX, y: e.clientY };
    });

    });

    window.addEventListener('mouseup', () => {
    window.addEventListener('mouseup', () => {
      isDragging = false;
      isDragging = false;
      autoRotate = true;
      autoRotate = true;
    });

    });

    canvas.addEventListener('mousemove', e => {
    canvas.addEventListener('mousemove', e => {
      // Update mouse for raycasting
      // Update mouse for raycasting
      const rect = canvas.getBoundingClientRect();
      const rect = canvas.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;


      // Orbit drag
      // Orbit drag
      if (isDragging) {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        const dy = e.clientY - prevMouse.y;
        targetSpherical.theta -= dx * 0.005;
        targetSpherical.theta -= dx * 0.005;
        targetSpherical.phi    = Math.max(0.2, Math.min(Math.PI - 0.2, targetSpherical.phi + dy * 0.005));
        targetSpherical.phi    = Math.max(0.2, Math.min(Math.PI - 0.2, targetSpherical.phi + dy * 0.005));
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    });
        prevMouse = { x: e.clientX, y: e.clientY };

      }
    });

    canvas.addEventListener('wheel', e => {
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      e.preventDefault();
      targetSpherical.radius = Math.max(1.5, Math.min(12, targetSpherical.radius + e.deltaY * 0.005));
      targetSpherical.radius = Math.max(1.5, Math.min(12, targetSpherical.radius + e.deltaY * 0.005));
    }, { passive: false });
    }, { passive: false });


    canvas.addEventListener('click', _handleClick);
    canvas.addEventListener('click', _handleClick);


    // Touch
    // Touch
    canvas.addEventListener('touchstart', e => {
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
      if (e.touches.length === 1) {
        isDragging = true;
        isDragging = true;
        autoRotate = false;
        autoRotate = false;
        prevMouse  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        prevMouse  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      }
    }, { passive: true });

    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && isDragging) {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        const dy = e.touches[0].clientY - prevMouse.y;
        targetSpherical.theta -= dx * 0.006;
        targetSpherical.theta -= dx * 0.006;
        targetSpherical.phi    = Math.max(0.2, Math.min(Math.PI - 0.2, targetSpherical.phi + dy * 0.006));
        targetSpherical.phi    = Math.max(0.2, Math.min(Math.PI - 0.2, targetSpherical.phi + dy * 0.006));
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      if (e.touches.length === 2) {
      if (e.touches.length === 2) {
        const dx   = e.touches[0].clientX - e.touches[1].clientX;
        const dx   = e.touches[0].clientX - e.touches[1].clientX;
        const dy   = e.touches[0].clientY - e.touches[1].clientY;
        const dy   = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (lastTouchDist !== null) {
        if (lastTouchDist !== null) {
          targetSpherical.radius = Math.max(1.5, Math.min(12, targetSpherical.radius - (dist - lastTouchDist) * 0.01));
          targetSpherical.radius = Math.max(1.5, Math.min(12, targetSpherical.radius - (dist - lastTouchDist) * 0.01));
        }
        }
        lastTouchDist = dist;
        lastTouchDist = dist;
      }
      }
    }, { passive: true });

    }, { passive: true });

    canvas.addEventListener('touchend', () => {
    canvas.addEventListener('touchend', () => {
      isDragging    = false;
      isDragging    = false;
      lastTouchDist = null;
      lastTouchDist = null;
      setTimeout(() => { autoRotate = true; }, 2000);
      setTimeout(() => { autoRotate = true; }, 2000);
    });

    });

    window.addEventListener('resize', _onResize);
    window.addEventListener('resize', _onResize);
  }

  }

  function _handleClick(e) {
  function _handleClick(e) {
    const rect     = renderer.domElement.getBoundingClientRect();
    const rect     = renderer.domElement.getBoundingClientRect();
    const clickMx  = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    const clickMx  = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    const clickMy  = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const clickMy  = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const clickVec = new THREE.Vector2(clickMx, clickMy);
    const clickVec = new THREE.Vector2(clickMx, clickMy);


    raycaster.setFromCamera(clickVec, camera);
    raycaster.setFromCamera(clickVec, camera);


    for (const { mesh, site } of interactivePoints) {
    for (const { mesh, site } of interactivePoints) {
      if (!mesh.visible) continue;
      if (!mesh.visible) continue;
      const hits = raycaster.intersectObject(mesh);
      const hits = raycaster.intersectObject(mesh);
      if (hits.length > 0) {
      if (hits.length > 0) {
        if (site.url && site.url !== '#') {
        if (site.url && site.url !== '#') {
          window.open(site.url, '_blank', 'noopener,noreferrer');
          window.open(site.url, '_blank', 'noopener,noreferrer');
        }
        }
        return;
        return;
      }
      }
    }
    }
  }

  }

  function _onResize() {
  function _onResize() {
    const W = window.innerWidth;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const H = window.innerHeight;
    camera.aspect = W / H;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
  }
    renderer.setSize(W, H, false);

  }

  // ── Tooltip ───────────────────────────────────────
  // ── Tooltip ───────────────────────────────────────
  function _updateTooltip(hovered) {
  function _updateTooltip(hovered) {
    const tt = document.getElementById('galaxy-tooltip');
    const tt = document.getElementById('galaxy-tooltip');
    if (!hovered) {
    if (!hovered) {
      tt.classList.remove('visible');
      tt.classList.remove('visible');
      return;
      return;
    }
    }
    const { cluster, site, screenPos } = hovered;
    const { cluster, site, screenPos } = hovered;
    tt.querySelector('.tt-name').textContent    = site.name;
    tt.querySelector('.tt-name').textContent    = site.name;
    tt.querySelector('.tt-cluster').textContent = cluster.label.toUpperCase();
    tt.querySelector('.tt-cluster').textContent = cluster.label.toUpperCase();
    tt.querySelector('.tt-cluster').style.color = cluster.color;
    tt.querySelector('.tt-cluster').style.color = cluster.color;
    tt.querySelector('.tt-url').textContent     = site.url === '#' ? '[CLASSIFIED]' : site.url.replace('https://','');
    tt.querySelector('.tt-url').textContent     = site.url === '#' ? '[CLASSIFIED]' : site.url.replace('https://','');


    // Position tooltip near the point
    // Position tooltip near the point
    const canvas = renderer.domElement;
    const canvas = renderer.domElement;
    const rect   = canvas.getBoundingClientRect();
    const rect   = canvas.getBoundingClientRect();
    const px = (screenPos.x + 1) / 2 * rect.width  + rect.left;
    const px = (screenPos.x + 1) / 2 * rect.width  + rect.left;
    const py = (1 - (screenPos.y + 1) / 2) * rect.height + rect.top;
    const py = (1 - (screenPos.y + 1) / 2) * rect.height + rect.top;
    tt.style.left = Math.min(px + 14, window.innerWidth - 200) + 'px';
    tt.style.left = Math.min(px + 14, window.innerWidth - 200) + 'px';
    tt.style.top  = Math.max(py - 60, 10) + 'px';
    tt.style.top  = Math.max(py - 60, 10) + 'px';
    tt.classList.add('visible');
    tt.classList.add('visible');
  }

  }

  // ── Render Loop ───────────────────────────────────
  // ── Render Loop ───────────────────────────────────
  function _loop() {
  function _loop() {
    animId = requestAnimationFrame(_loop);
    animId = requestAnimationFrame(_loop);
    const t = performance.now() * 0.001;
    const t = performance.now() * 0.001;


    // Auto-rotate
    // Auto-rotate
    if (autoRotate) {
    if (autoRotate) {
      targetSpherical.theta += 0.001;
    }
      targetSpherical.theta += 0.001;

    }

    // Smooth spherical interpolation
    // Smooth spherical interpolation
    spherical.theta  += (targetSpherical.theta  - spherical.theta)  * 0.06;
    spherical.theta  += (targetSpherical.theta  - spherical.theta)  * 0.06;
    spherical.phi    += (targetSpherical.phi    - spherical.phi)    * 0.06;
    spherical.phi    += (targetSpherical.phi    - spherical.phi)    * 0.06;
    spherical.radius += (targetSpherical.radius - spherical.radius) * 0.06;
    spherical.radius += (targetSpherical.radius - spherical.radius) * 0.06;
    _updateCamera();

    _updateCamera();

    // Gently rotate cluster groups on their own axes
    // Gently rotate cluster groups on their own axes
    clusterGroups.forEach((g, i) => {
    clusterGroups.forEach((g, i) => {
      g.rotation.y = t * 0.04 * (i % 2 === 0 ? 1 : -1);
      g.rotation.y = t * 0.04 * (i % 2 === 0 ? 1 : -1);
      g.rotation.x = Math.sin(t * 0.02 + i) * 0.05;
      g.rotation.x = Math.sin(t * 0.02 + i) * 0.05;
    });

    });

    // Slowly rotate background stars
    // Slowly rotate background stars
    if (starField) starField.rotation.y = t * 0.008;
    if (starField) starField.rotation.y = t * 0.008;


    // Raycasting for hover
    // Raycasting for hover
    raycaster.setFromCamera(mouse, camera);
    raycaster.setFromCamera(mouse, camera);
    let found = null;
    let found = null;
    for (const p of interactivePoints) {
    for (const p of interactivePoints) {
      if (!p.mesh.visible) continue;
      if (!p.mesh.visible) continue;
      const hits = raycaster.intersectObject(p.mesh);
      const hits = raycaster.intersectObject(p.mesh);
      if (hits.length > 0) {
      if (hits.length > 0) {
        // Project world pos to screen
        // Project world pos to screen
        const wpos = p.mesh.getWorldPosition(new THREE.Vector3());
        const wpos = p.mesh.getWorldPosition(new THREE.Vector3());
        wpos.project(camera);
        wpos.project(camera);
        found = { ...p, screenPos: { x: wpos.x, y: wpos.y } };
        found = { ...p, screenPos: { x: wpos.x, y: wpos.y } };
        document.getElementById('galaxy-canvas').style.cursor = 'pointer';
        document.getElementById('galaxy-canvas').style.cursor = 'pointer';
        break;
        break;
      }
      }
    }
    }
    if (!found) document.getElementById('galaxy-canvas').style.cursor = isDragging ? 'grabbing' : 'grab';
    if (!found) document.getElementById('galaxy-canvas').style.cursor = isDragging ? 'grabbing' : 'grab';
    if (found !== hoveredPoint) {
    if (found !== hoveredPoint) {
      hoveredPoint = found;
      hoveredPoint = found;
      _updateTooltip(found);
      _updateTooltip(found);
    }

    }

    renderer.render(scene, camera);
    renderer.render(scene, camera);
  }

  }

  // ── Destroy ───────────────────────────────────────
  // ── Destroy ───────────────────────────────────────
  function destroy() {
  function destroy() {
    cancelAnimationFrame(animId);
    cancelAnimationFrame(animId);
    renderer.dispose();
    renderer.dispose();
    window.removeEventListener('resize', _onResize);
  }
    window.removeEventListener('resize', _onResize);

  }

  return { init, destroy };
})();
  return { init, destroy };
// ═══════════════════════════════════════════════════
})();
// ═══════════════════════════════════════════════════
// js/cobweb.js — Cobweb Search Interface + Cyanix AI
// js/cobweb.js — Cobweb Search Interface + Cyanix AI
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════

const Cobweb = (() => {

const Cobweb = (() => {

  // ── Category Colors ───────────────────────────────
  // ── Category Colors ───────────────────────────────
  const CAT_COLORS = {
  const CAT_COLORS = {
    social:    '#ff6b6b',
    social:    '#ff6b6b',
    ai:        '#00f5ff',
    ai:        '#00f5ff',
    gaming:    '#a855f7',
    gaming:    '#a855f7',
    news:      '#f59e0b',
    news:      '#f59e0b',
    education: '#3b82f6',
    education: '#3b82f6',
    ecommerce: '#f97316',
    ecommerce: '#f97316',
    startups:  '#10b981',
    startups:  '#10b981',
    other:     '#94a3b8',
    other:     '#94a3b8',
    center:    '#ffffff',
    center:    '#ffffff',
  };
  };


  // ── State ─────────────────────────────────────────
  // ── State ─────────────────────────────────────────
  let bgCanvas, bgCtx, bgAnimId;
  let bgCanvas, bgCtx, bgAnimId;
  let svg, linkGroup, nodeGroup;
  let svg, linkGroup, nodeGroup;
  let simulation = null;
  let simulation = null;
  let currentNodes = [], currentLinks = [];
  let currentNodes = [], currentLinks = [];
  let W, H;
  let W, H;


  // ── Init ──────────────────────────────────────────
  // ── Init ──────────────────────────────────────────
  function init() {
  function init() {
    _initBgParticles();
    _initBgParticles();
    _initSVG();
    _initSVG();
    _bindUI();
    _bindUI();
    _resize();
    _resize();
    window.addEventListener('resize', _resize);
  }
    window.addEventListener('resize', _resize);

  }

  // ── Background Particles ──────────────────────────
  // ── Background Particles ──────────────────────────
  function _initBgParticles() {
  function _initBgParticles() {
    bgCanvas = document.getElementById('cobweb-bg-canvas');
    bgCanvas = document.getElementById('cobweb-bg-canvas');
    bgCtx    = bgCanvas.getContext('2d');
    bgCtx    = bgCanvas.getContext('2d');
    bgCanvas.width  = window.innerWidth;
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    bgCanvas.height = window.innerHeight;


    const particles = Array.from({ length: 120 }, () => ({
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * bgCanvas.width,
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      y: Math.random() * bgCanvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    }));

    function drawBg() {
    function drawBg() {
      bgAnimId = requestAnimationFrame(drawBg);
      bgAnimId = requestAnimationFrame(drawBg);
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);


      particles.forEach(p => {
      particles.forEach(p => {
        p.x += p.vx;
        p.x += p.vx;
        p.y += p.vy;
        p.y += p.vy;
        if (p.x < 0) p.x = bgCanvas.width;
        if (p.x < 0) p.x = bgCanvas.width;
        if (p.x > bgCanvas.width) p.x = 0;
        if (p.x > bgCanvas.width) p.x = 0;
        if (p.y < 0) p.y = bgCanvas.height;
        if (p.y < 0) p.y = bgCanvas.height;
        if (p.y > bgCanvas.height) p.y = 0;

        if (p.y > bgCanvas.height) p.y = 0;

        bgCtx.beginPath();
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(0,245,255,${p.alpha})`;
        bgCtx.fillStyle = `rgba(0,245,255,${p.alpha})`;
        bgCtx.fill();
        bgCtx.fill();
      });
      });


      // Draw faint connecting lines between nearby particles
      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 80) {
          if (d < 80) {
            bgCtx.beginPath();
            bgCtx.beginPath();
            bgCtx.moveTo(particles[i].x, particles[i].y);
            bgCtx.moveTo(particles[i].x, particles[i].y);
            bgCtx.lineTo(particles[j].x, particles[j].y);
            bgCtx.lineTo(particles[j].x, particles[j].y);
            bgCtx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - d / 80)})`;
            bgCtx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - d / 80)})`;
            bgCtx.lineWidth = 0.5;
            bgCtx.lineWidth = 0.5;
            bgCtx.stroke();
            bgCtx.stroke();
          }
          }
        }
        }
      }
      }
    }
    }
    drawBg();
    drawBg();
  }

  }

  // ── SVG Init ──────────────────────────────────────
  // ── SVG Init ──────────────────────────────────────
  function _initSVG() {
  function _initSVG() {
    svg       = d3.select('#cobweb-svg');
    svg       = d3.select('#cobweb-svg');
    linkGroup = svg.select('#cobweb-links');
    linkGroup = svg.select('#cobweb-links');
    nodeGroup = svg.select('#cobweb-nodes');
    nodeGroup = svg.select('#cobweb-nodes');
  }
  }


  // ── Resize ────────────────────────────────────────
  // ── Resize ────────────────────────────────────────
  function _resize() {
  function _resize() {
    W = window.innerWidth;
    W = window.innerWidth;
    H = window.innerHeight;
    H = window.innerHeight;
    if (bgCanvas) {
    if (bgCanvas) {
      bgCanvas.width  = W;
      bgCanvas.width  = W;
      bgCanvas.height = H;
    }
      bgCanvas.height = H;
    }
    svg.attr('width', W).attr('height', H);
    svg.attr('width', W).attr('height', H);
    if (simulation) {
    if (simulation) {
      simulation.force('center', d3.forceCenter(W / 2, H / 2));
      simulation.force('center', d3.forceCenter(W / 2, H / 2));
      simulation.alpha(0.3).restart();
      simulation.alpha(0.3).restart();
    }
  }
    }

  }

  // ── UI Bindings ───────────────────────────────────
  // ── UI Bindings ───────────────────────────────────
  function _bindUI() {
  function _bindUI() {
    const input  = document.getElementById('search-input');
    const input  = document.getElementById('search-input');
    const btn    = document.getElementById('search-btn');
    const btn    = document.getElementById('search-btn');
    const newBtn = document.getElementById('new-search-btn');
    const newBtn = document.getElementById('new-search-btn');


    btn.addEventListener('click', _doSearch);
    btn.addEventListener('click', _doSearch);
    input.addEventListener('keydown', e => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') _doSearch();
      if (e.key === 'Enter') _doSearch();
    });

    });

    document.querySelectorAll('.quick-tag').forEach(tag => {
    document.querySelectorAll('.quick-tag').forEach(tag => {
      tag.addEventListener('click', () => {
      tag.addEventListener('click', () => {
        input.value = tag.dataset.q;
        input.value = tag.dataset.q;
        _doSearch();
        _doSearch();
      });
      });
    });
    });


    newBtn.addEventListener('click', _resetSearch);
    newBtn.addEventListener('click', _resetSearch);


    document.getElementById('node-panel-close').addEventListener('click', () => {
    document.getElementById('node-panel-close').addEventListener('click', () => {
      document.getElementById('node-panel').classList.add('hidden');
      document.getElementById('node-panel').classList.add('hidden');
    });
  }
    });

  }

  // ── Search ────────────────────────────────────────
  // ── Search ────────────────────────────────────────
  async function _doSearch() {
  async function _doSearch() {
    const query = document.getElementById('search-input').value.trim();
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;
    if (!query) return;


    // Show loading, hide others
    // Show loading, hide others
    document.getElementById('cobweb-loading').classList.remove('hidden');
    document.getElementById('cobweb-loading').classList.remove('hidden');
    document.getElementById('ai-answer').classList.add('hidden');
    document.getElementById('ai-answer').classList.add('hidden');
    document.getElementById('node-panel').classList.add('hidden');
    document.getElementById('node-panel').classList.add('hidden');
    document.getElementById('search-core').classList.add('search-active');
    document.getElementById('search-core').classList.add('search-active');


    // Clear previous graph
    // Clear previous graph
    _clearGraph();
    _clearGraph();


    try {
    try {
      const result = await _callCyanixAI(query);
      const result = await _callCyanixAI(query);
      _renderGraph(query, result);
      _renderGraph(query, result);
      _showAnswer(result.answer || '');
      _showAnswer(result.answer || '');
    } catch (err) {
    } catch (err) {
      console.error('Cyanix AI error:', err);
      console.error('Cyanix AI error:', err);
      _showAnswer('Connection lost in the void. Try again 🌌');
      _showAnswer('Connection lost in the void. Try again 🌌');
    } finally {
    } finally {
      document.getElementById('cobweb-loading').classList.add('hidden');
      document.getElementById('cobweb-loading').classList.add('hidden');
    }
    }
  }
  }


  // ── Call Supabase Edge Function ────────────────────
  // ── Call Supabase Edge Function ────────────────────
  async function _callCyanixAI(query) {
  async function _callCyanixAI(query) {
    const user   = Auth.getUser();
    const user   = Auth.getUser();
    const client = Auth.getClient();
    const client = Auth.getClient();


    // Get session token for auth header
    // Get session token for auth header
    const { data: { session } } = await client.auth.getSession();
    const { data: { session } } = await client.auth.getSession();
    const token = session?.access_token;
    const token = session?.access_token;


    const res = await fetch(CONFIG.EDGE_CHAT_URL, {
    const res = await fetch(CONFIG.EDGE_CHAT_URL, {
      method: 'POST',
      method: 'POST',
      headers: {
      headers: {
        'Content-Type':  'application/json',
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
        'Authorization': `Bearer ${token}`,
        'apikey':        CONFIG.SUPABASE_ANON_KEY,
        'apikey':        CONFIG.SUPABASE_ANON_KEY,
      },
      },
      body: JSON.stringify({ query }),
      body: JSON.stringify({ query }),
    });

    });

    if (!res.ok) throw new Error(`Edge function error: ${res.status}`);
    if (!res.ok) throw new Error(`Edge function error: ${res.status}`);
    return await res.json();
    return await res.json();
  }
  }


  // ── Render Graph ──────────────────────────────────
  // ── Render Graph ──────────────────────────────────
  function _renderGraph(query, data) {
  function _renderGraph(query, data) {
    const nodes = data.nodes || [];
    const nodes = data.nodes || [];
    const conns = data.connections || [];
    const conns = data.connections || [];


    // Build D3 nodes
    // Build D3 nodes
    const centerNode = {
    const centerNode = {
      id:       '__center__',
      id:       '__center__',
      label:    query.length > 22 ? query.slice(0, 22) + '…' : query,
      label:    query.length > 22 ? query.slice(0, 22) + '…' : query,
      category: 'center',
      category: 'center',
      isCenter: true,
      isCenter: true,
      fx:       W / 2,
      fx:       W / 2,
      fy:       H / 2,
      fy:       H / 2,
    };

    };

    const siteNodes = nodes.map(n => ({
    const siteNodes = nodes.map(n => ({
      ...n,
      ...n,
      isCenter: false,
      isCenter: false,
    }));

    }));

    currentNodes = [centerNode, ...siteNodes];
    currentNodes = [centerNode, ...siteNodes];


    // Build D3 links
    // Build D3 links
    const linkSet = new Set();
    const linkSet = new Set();
    conns.forEach(([a, b]) => {
    conns.forEach(([a, b]) => {
      const key = [a, b].sort().join('::');
      const key = [a, b].sort().join('::');
      if (!linkSet.has(key)) {
      if (!linkSet.has(key)) {
        linkSet.add(key);
        linkSet.add(key);
        currentLinks.push({ source: a, target: b });
        currentLinks.push({ source: a, target: b });
      }
      }
    });

    });

    // Auto-link all sites to center
    // Auto-link all sites to center
    siteNodes.forEach(n => {
    siteNodes.forEach(n => {
      const key = ['__center__', n.id].sort().join('::');
      const key = ['__center__', n.id].sort().join('::');
      if (!linkSet.has(key)) {
      if (!linkSet.has(key)) {
        linkSet.add(key);
        linkSet.add(key);
        currentLinks.push({ source: '__center__', target: n.id });
        currentLinks.push({ source: '__center__', target: n.id });
      }
      }
    });

    });

    _runSimulation();
    _runSimulation();
  }

  }

  // ── D3 Force Simulation ───────────────────────────
  // ── D3 Force Simulation ───────────────────────────
  function _runSimulation() {
  function _runSimulation() {
    if (simulation) simulation.stop();
    if (simulation) simulation.stop();


    simulation = d3.forceSimulation(currentNodes)
    simulation = d3.forceSimulation(currentNodes)
      .force('link', d3.forceLink(currentLinks).id(d => d.id).distance(d => {
      .force('link', d3.forceLink(currentLinks).id(d => d.id).distance(d => {
        if (d.source.isCenter || d.target.isCenter) return 150 + Math.random() * 80;
        if (d.source.isCenter || d.target.isCenter) return 150 + Math.random() * 80;
        return 100 + Math.random() * 60;
        return 100 + Math.random() * 60;
      }).strength(0.4))
      }).strength(0.4))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide().radius(d => d.isCenter ? 40 : 30))
      .force('collision', d3.forceCollide().radius(d => d.isCenter ? 40 : 30))
      .alphaDecay(0.02);
      .alphaDecay(0.02);


    // Draw links
    // Draw links
    const link = linkGroup.selectAll('.cobweb-link')
    const link = linkGroup.selectAll('.cobweb-link')
      .data(currentLinks)
      .data(currentLinks)
      .join('line')
      .join('line')
      .attr('class', 'cobweb-link')
      .attr('class', 'cobweb-link')
      .attr('stroke', d => {
      .attr('stroke', d => {
        const src = typeof d.source === 'object' ? d.source : currentNodes.find(n => n.id === d.source);
        const src = typeof d.source === 'object' ? d.source : currentNodes.find(n => n.id === d.source);
        const clr = CAT_COLORS[src?.category] || CAT_COLORS.other;
        const clr = CAT_COLORS[src?.category] || CAT_COLORS.other;
        return clr;
        return clr;
      })
      })
      .attr('stroke-width', 1)
      .attr('stroke-width', 1)
      .attr('opacity', 0);
      .attr('opacity', 0);


    // Draw nodes
    // Draw nodes
    const node = nodeGroup.selectAll('.cobweb-node')
    const node = nodeGroup.selectAll('.cobweb-node')
      .data(currentNodes)
      .data(currentNodes)
      .join('g')
      .join('g')
      .attr('class', 'cobweb-node')
      .attr('class', 'cobweb-node')
      .call(
      .call(
        d3.drag()
        d3.drag()
          .on('start', (event, d) => {
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
            d.fx = d.x; d.fy = d.y;
          })
          })
          .on('drag', (event, d) => {
          .on('drag', (event, d) => {
            d.fx = event.x; d.fy = event.y;
            d.fx = event.x; d.fy = event.y;
          })
          })
          .on('end', (event, d) => {
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (!event.active) simulation.alphaTarget(0);
            if (!d.isCenter) { d.fx = null; d.fy = null; }
            if (!d.isCenter) { d.fx = null; d.fy = null; }
          })
          })
      )
      )
      .on('click', (event, d) => {
      .on('click', (event, d) => {
        event.stopPropagation();
        event.stopPropagation();
        if (!d.isCenter) _showNodePanel(d);
        if (!d.isCenter) _showNodePanel(d);
      });

      });

    // Circles
    // Circles
    node.append('circle')
    node.append('circle')
      .attr('r', d => d.isCenter ? 20 : _nodeRadius(d))
      .attr('r', d => d.isCenter ? 20 : _nodeRadius(d))
      .attr('fill', d => {
      .attr('fill', d => {
        const clr = CAT_COLORS[d.category] || CAT_COLORS.other;
        const clr = CAT_COLORS[d.category] || CAT_COLORS.other;
        return clr + '22';
        return clr + '22';
      })
      })
      .attr('stroke', d => CAT_COLORS[d.category] || CAT_COLORS.other)
      .attr('stroke', d => CAT_COLORS[d.category] || CAT_COLORS.other)
      .attr('stroke-width', d => d.isCenter ? 2 : 1.5)
      .attr('stroke-width', d => d.isCenter ? 2 : 1.5)
      .attr('filter', 'url(#glow-filter)');
      .attr('filter', 'url(#glow-filter)');


    // Inner dot
    node.append('circle')
    // Inner dot
    node.append('circle')
      .attr('r', d => d.isCenter ? 6 : 3)
      .attr('r', d => d.isCenter ? 6 : 3)
      .attr('fill', d => CAT_COLORS[d.category] || CAT_COLORS.other);
      .attr('fill', d => CAT_COLORS[d.category] || CAT_COLORS.other);


    // Labels
    // Labels
    node.append('text')
    node.append('text')
      .attr('class', d => `cobweb-label${d.isCenter ? ' center-label' : ''}`)
      .attr('class', d => `cobweb-label${d.isCenter ? ' center-label' : ''}`)
      .attr('dy', d => d.isCenter ? 36 : _nodeRadius(d) + 14)
      .attr('dy', d => d.isCenter ? 36 : _nodeRadius(d) + 14)
      .text(d => d.label)
      .text(d => d.label)
      .attr('fill', d => d.isCenter ? '#fff' : 'rgba(226,232,240,0.85)');
      .attr('fill', d => d.isCenter ? '#fff' : 'rgba(226,232,240,0.85)');


    // Animate in
    // Animate in
    node.attr('opacity', 0);
    node.attr('opacity', 0);
    link.attr('opacity', 0);
    link.attr('opacity', 0);


    simulation.on('tick', () => {
    simulation.on('tick', () => {
      link
      link
        .attr('x1', d => d.source.x)
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
        .attr('y2', d => d.target.y);


      node.attr('transform', d => `translate(${d.x},${d.y})`);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    });

    // Staggered entry
    // Staggered entry
    simulation.on('end', () => {
    simulation.on('end', () => {
      node.transition().duration(600).delay((d, i) => i * 40).attr('opacity', 1);
      node.transition().duration(600).delay((d, i) => i * 40).attr('opacity', 1);
      link.transition().duration(800).delay(200).attr('opacity', d => {
      link.transition().duration(800).delay(200).attr('opacity', d => {
        const src = typeof d.source === 'object' ? d.source : null;
        const src = typeof d.source === 'object' ? d.source : null;
        return src?.isCenter ? 0.5 : 0.25;
        return src?.isCenter ? 0.5 : 0.25;
      });
      });
    });

    });

    // Force a few ticks then show
    // Force a few ticks then show
    for (let i = 0; i < 80; i++) simulation.tick();
    for (let i = 0; i < 80; i++) simulation.tick();
    simulation.on('end', null);
    simulation.on('end', null);
    node.transition().duration(500).delay((d, i) => i * 30).attr('opacity', 1);
    node.transition().duration(500).delay((d, i) => i * 30).attr('opacity', 1);
    link.transition().duration(600).delay(100).attr('opacity', d => {
    link.transition().duration(600).delay(100).attr('opacity', d => {
      const src = typeof d.source === 'object' ? d.source : null;
      const src = typeof d.source === 'object' ? d.source : null;
      return src?.isCenter ? 0.5 : 0.25;
      return src?.isCenter ? 0.5 : 0.25;
    });
    });
  }

  }

  function _nodeRadius(d) {
  function _nodeRadius(d) {
    const weight = d.weight || 5;
    const weight = d.weight || 5;
    return 6 + weight * 1.2;
    return 6 + weight * 1.2;
  }

  }

  // ── Node Info Panel ───────────────────────────────
  // ── Node Info Panel ───────────────────────────────
  function _showNodePanel(d) {
  function _showNodePanel(d) {
    const panel   = document.getElementById('node-panel');
    const panel   = document.getElementById('node-panel');
    const catEl   = document.getElementById('np-category');
    const catEl   = document.getElementById('np-category');
    const nameEl  = document.getElementById('np-name');
    const nameEl  = document.getElementById('np-name');
    const descEl  = document.getElementById('np-desc');
    const descEl  = document.getElementById('np-desc');
    const linkEl  = document.getElementById('np-link');
    const linkEl  = document.getElementById('np-link');
    const clr     = CAT_COLORS[d.category] || CAT_COLORS.other;

    const clr     = CAT_COLORS[d.category] || CAT_COLORS.other;

    catEl.textContent  = (d.category || 'unknown').toUpperCase();
    catEl.textContent  = (d.category || 'unknown').toUpperCase();
    catEl.style.color  = clr;
    catEl.style.color  = clr;
    nameEl.textContent = d.label;
    nameEl.textContent = d.label;
    nameEl.style.color = clr;
    nameEl.style.color = clr;
    descEl.textContent = d.description || 'No description available.';
    descEl.textContent = d.description || 'No description available.';


    if (d.url && d.url !== '#') {
    if (d.url && d.url !== '#') {
      linkEl.href            = d.url.startsWith('http') ? d.url : 'https://' + d.url;
      linkEl.href            = d.url.startsWith('http') ? d.url : 'https://' + d.url;
      linkEl.style.display   = 'inline-block';
      linkEl.style.display   = 'inline-block';
    } else {
    } else {
      linkEl.style.display   = 'none';
      linkEl.style.display   = 'none';
    }

    }

    panel.classList.remove('hidden');
    panel.classList.remove('hidden');
  }

  }

  // ── AI Answer ─────────────────────────────────────
  // ── AI Answer ─────────────────────────────────────
  function _showAnswer(text) {
  function _showAnswer(text) {
    if (!text) return;
    if (!text) return;
    const panel  = document.getElementById('ai-answer');
    const panel  = document.getElementById('ai-answer');
    const textEl = document.getElementById('ai-answer-text');
    const textEl = document.getElementById('ai-answer-text');
    textEl.textContent = text;
    textEl.textContent = text;
    panel.classList.remove('hidden');
    panel.classList.remove('hidden');
  }
  }


  // ── Reset ─────────────────────────────────────────
  // ── Reset ─────────────────────────────────────────
  function _resetSearch() {
  function _resetSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').value = '';
    document.getElementById('search-core').classList.remove('search-active');
    document.getElementById('search-core').classList.remove('search-active');
    document.getElementById('ai-answer').classList.add('hidden');
    document.getElementById('ai-answer').classList.add('hidden');
    document.getElementById('node-panel').classList.add('hidden');
    document.getElementById('node-panel').classList.add('hidden');
    _clearGraph();
  }
    _clearGraph();

  }

  function _clearGraph() {
  function _clearGraph() {
    currentNodes = [];
    currentNodes = [];
    currentLinks = [];
    currentLinks = [];
    if (simulation) { simulation.stop(); simulation = null; }
    if (simulation) { simulation.stop(); simulation = null; }
    linkGroup.selectAll('*').remove();
    linkGroup.selectAll('*').remove();
    nodeGroup.selectAll('*').remove();
    nodeGroup.selectAll('*').remove();
  }
  }


  // ── Destroy ───────────────────────────────────────
  // ── Destroy ───────────────────────────────────────
  function destroy() {
  function destroy() {
    cancelAnimationFrame(bgAnimId);
    cancelAnimationFrame(bgAnimId);
    if (simulation) simulation.stop();
    window.removeEventListener('resize', _resize);
  }

  return { init, destroy };
})();
// ═══════════════════════════════════════════════════
// js/main.js — App Controller
    if (simulation) simulation.stop();
// ═══════════════════════════════════════════════════

    window.removeEventListener('resize', _resize);
  }

(function () {
  return { init, destroy };
})();
  let galaxyInitialized  = false;
// ═══════════════════════════════════════════════════
// js/main.js — App Controller
  let cobwebInitialized  = false;

// ═══════════════════════════════════════════════════

(function () {
  // ── Boot ──────────────────────────────────────────
  let galaxyInitialized  = false;
  let cobwebInitialized  = false;

  function boot() {
  // ── Boot ──────────────────────────────────────────
  function boot() {
    // Init auth (handles Supabase + UI)
    // Init auth (handles Supabase + UI)
    Auth.init();
    Auth.init();


    // Start galaxy immediately
    // Start galaxy immediately
    _initGalaxy();
    _initGalaxy();


    // Enter button
    // Enter button
    document.getElementById('enter-btn').addEventListener('click', () => {
    document.getElementById('enter-btn').addEventListener('click', () => {
      const user = Auth.getUser();
      const user = Auth.getUser();
      if (user) {
      if (user) {
        _showCobweb(user);
      } else {
        _showCobweb(user);
      } else {
        Auth.openModal();
        Auth.openModal();
      }
      }
    });

    });

    // Auth events
    // Auth events
    window.addEventListener('auth:signin', e => {
    window.addEventListener('auth:signin', e => {
      Auth.closeModal();
      Auth.closeModal();
      _showCobweb(e.detail);
    });

      _showCobweb(e.detail);
    });

    window.addEventListener('auth:signout', () => {
    window.addEventListener('auth:signout', () => {
      _showGalaxy();
      _showGalaxy();
    });

    });

    // Animate stat counter
    // Animate stat counter
    _animateCounter('stat-sites', 0, 1847293, 2200);
    _animateCounter('stat-sites', 0, 1847293, 2200);
  }

  }

  // ── Galaxy ────────────────────────────────────────
  // ── Galaxy ────────────────────────────────────────
  function _initGalaxy() {
  function _initGalaxy() {
    if (!galaxyInitialized) {
    if (!galaxyInitialized) {
      // rAF ensures browser has completed layout before we read window dimensions
      // rAF ensures browser has completed layout before we read window dimensions
      requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Galaxy.init();
        Galaxy.init();
        galaxyInitialized = true;
        galaxyInitialized = true;
      });
    }
      });
  }
    }

  }

  function _showGalaxy() {
  function _showGalaxy() {
    const galaxyView = document.getElementById('galaxy-view');
    const galaxyView = document.getElementById('galaxy-view');
    const cobwebView = document.getElementById('cobweb-view');
    const cobwebView = document.getElementById('cobweb-view');


    cobwebView.classList.remove('active');
    cobwebView.classList.remove('active');
    cobwebView.classList.add('hidden');
    cobwebView.classList.add('hidden');


    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      galaxyView.classList.remove('hidden');
      galaxyView.classList.remove('hidden');
      requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        galaxyView.classList.add('active');
        galaxyView.classList.add('active');
      });
      });
    });
    });
  }

  }
  // ── Cobweb ────────────────────────────────────────

  // ── Cobweb ────────────────────────────────────────
  function _showCobweb(user) {
  function _showCobweb(user) {
    const galaxyView = document.getElementById('galaxy-view');
    const galaxyView = document.getElementById('galaxy-view');
    const cobwebView = document.getElementById('cobweb-view');

    const cobwebView = document.getElementById('cobweb-view');

    // Update user display
    // Update user display
    const emailEl = document.getElementById('user-email-display');
    const emailEl = document.getElementById('user-email-display');
    if (emailEl && user?.email) {
    if (emailEl && user?.email) {
      emailEl.textContent = user.email;
      emailEl.textContent = user.email;
    }

    }

    // Transition
    // Transition
    galaxyView.classList.remove('active');
    galaxyView.classList.remove('active');
    setTimeout(() => {
    setTimeout(() => {
      galaxyView.classList.add('hidden');
      galaxyView.classList.add('hidden');


      cobwebView.classList.remove('hidden');
      cobwebView.classList.remove('hidden');
      requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cobwebView.classList.add('active');
      });

        cobwebView.classList.add('active');
      });

      // Init cobweb once
      // Init cobweb once
      if (!cobwebInitialized) {
      if (!cobwebInitialized) {
        Cobweb.init();
        cobwebInitialized = true;
        Cobweb.init();
      }
        cobwebInitialized = true;
      }
    }, 600);
    }, 600);
  }
  }


  // ── Counter Animation ─────────────────────────────
  // ── Counter Animation ─────────────────────────────
  function _animateCounter(id, from, to, duration) {
  function _animateCounter(id, from, to, duration) {
    const el    = document.getElementById(id);
    const el    = document.getElementById(id);
    if (!el) return;
    if (!el) return;
    const start = performance.now();
    const start = performance.now();
    function step(now) {
    function step(now) {
      const t   = Math.min((now - start) / duration, 1);
      const t   = Math.min((now - start) / duration, 1);
      const val = Math.floor(from + (to - from) * _easeOut(t));
      const val = Math.floor(from + (to - from) * _easeOut(t));
      el.textContent = val.toLocaleString();
      el.textContent = val.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      if (t < 1) requestAnimationFrame(step);
    }
    }
    requestAnimationFrame(step);
    requestAnimationFrame(step);
  }

  }

  function _easeOut(t) {
  function _easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
    return 1 - Math.pow(1 - t, 3);
  }

  }

  // ── Start ─────────────────────────────────────────
  // ── Start ─────────────────────────────────────────
  if (document.readyState === 'loading') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
    document.addEventListener('DOMContentLoaded', boot);
  } else {
  } else {
    boot();
    boot();
  }
  }
})();
})();
