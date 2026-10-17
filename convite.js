/* Baile do Limiar — correspondência encantada da Casa Tepes.
   Script clássico (sem módulos) para abrir também por file://. */
(() => {
'use strict';

/* O texto da tinta oculta fica codificado para não aparecer em prévias nem no código-fonte à primeira vista.
   Fonte legível: textos/oculto.html (gerado por ferramentas/embutir-oculto.mjs). */
const OCULTO = /*OCULTO*/'PHAgY2xhc3M9InNhdWRhY2FvIj48ZW0+QW9zIG9saG9zIGRlIHF1ZW0gZW5jb250cm91IGVzdGFzIHBhbGF2cmFzLDwvZW0+PC9wPgo8cD5QZXJkb2FpLW1lIHBlbGEgbmF0dXJlemEgaW5jb211bSBkZXN0YSBjb3JyZXNwb25kw6puY2lhLiBIw6EgdmVyZGFkZXMgcXVlIG7Do28gcG9kZW0gc2VyIGVzY3JpdGFzIMOgcyBjbGFyYXMsIHNvYnJldHVkbyBxdWFuZG8gbsOjbyBzZSBzYWJlIGVtIHF1YWlzIG3Do29zIHVtYSBjYXJ0YSBwb2RlcsOhIHJlcG91c2FyLjwvcD4KPHAgY2xhc3M9ImRlc3RhcXVlIj48c3Ryb25nPkFsZ28gdGVycsOtdmVsIGVzdMOhIHBhcmEgYWNvbnRlY2VyIHF1YW5kbyBzb2FyIGEgw7psdGltYSBiYWRhbGFkYSBkbyBEaWEgZG8gTGltaWFyLjwvc3Ryb25nPjwvcD4KPHA+TsOjbyBzZSB0cmF0YSBkZSB1bSBwcmVzc2VudGltZW50bywgdGFtcG91Y28gZGUgdW1hIHN1cGVyc3Rpw6fDo28uIFNlaSBxdWUgaMOhIGFsZ28gc2VuZG8gcHJlcGFyYWRvIHBhcmEgZXN0YSBub2l0ZSwgZSB0ZW1vIHF1ZSwgcXVhbmRvIHN1YXMgdmVyZGFkZWlyYXMgaW50ZW7Dp8O1ZXMgZm9yZW0gcmV2ZWxhZGFzLCBqw6Egc2VqYSB0YXJkZSBkZW1haXMuPC9wPgo8cD5Ow6NvIHBvc3NvIGNvbmZpYXIgZXN0YXMgc3VzcGVpdGFzIGEgbmluZ3XDqW0gbmVzdGEgY2FzYS4gTmVtIG1lc21vIMOgcXVlbGVzIHF1ZSBtZSBzw6NvIG1haXMgcHLDs3hpbW9zLjwvcD4KPHA+UGXDp28tdm9zIGFwZW5hcyBxdWUgY29tcGFyZcOnYWlzIGFvIGJhaWxlIGUgbsOjbyBkZW1vbnN0cmVpcyBjb25oZWNpbWVudG8gZGVzdGEgbWVuc2FnZW0uPC9wPgo8cD5BcMOzcyBvIGphbnRhciwgcHJvY3VyYWktbWUgZHVyYW50ZSBhIDxzdHJvbmc+RGFuw6dhIGRlIE3DoXNjYXJhczwvc3Ryb25nPi4gU29iIG8gYW5vbmltYXRvIHF1ZSBlbGEgbm9zIGNvbmNlZGUsIHRhbHZleiBwb3NzYW1vcyBjb252ZXJzYXIgc2VtIGRlc3BlcnRhciBzdXNwZWl0YXMuPC9wPgo8cD5BdMOpIGzDoSwgb2JzZXJ2YWkuIEVzY3V0YWkuIEUgbsOjbyB0b21laXMgYSBob3NwaXRhbGlkYWRlIGRlc3RhIGNhc2EgY29tbyBnYXJhbnRpYSBkZSBzZWd1cmFuw6dhLjwvcD4KPHAgY2xhc3M9InBhci1maW5hbCI+PHN0cm9uZz5TZSBtZXVzIHJlY2Vpb3MgZm9yZW0gaW5mdW5kYWRvcywgdGVyLXZvcy1laSByb3ViYWRvIGFwZW5hcyB1bWEgZGFuw6dhLjwvc3Ryb25nPjwvcD4KPHAgY2xhc3M9InBhci1maW5hbCI+PHN0cm9uZz5TZSBlc3RpdmVyIGNlcnRhLCB0YWx2ZXogc2VqYSBhIMO6bHRpbWEgcXVlIHRlcmVtb3MuPC9zdHJvbmc+PC9wPgo8cCBjbGFzcz0iZmVjaG8iPjxlbT5RdWUgZXN0YXMgcGFsYXZyYXMgcGVybWFuZcOnYW0gc29tZW50ZSBlbnRyZSBuw7NzLjwvZW0+PC9wPgo8cCBjbGFzcz0iYXNzaW5hdHVyYSI+PHN0cm9uZyBjbGFzcz0ibm9tZSI+T2bDqWxpYTwvc3Ryb25nPjwvcD4='/*FIM*/;

const NS = 'http://www.w3.org/2000/svg';
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const espera = ms => new Promise(r => setTimeout(r, ms));
const f2 = n => (Math.round(n * 100) / 100).toString();
const ease = {
  out: t => 1 - Math.pow(1 - t, 3),
  inOut: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outBack: t => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};
function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function ruido1(x) {
  const i = Math.floor(x), f = x - i;
  const h = n => { n = (n << 13) ^ n; return 1 - ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824; };
  const u = f * f * (3 - 2 * f);
  return lerp(h(i), h(i + 1), u);
}
/* tween cancelável: devolve { promessa, parar } */
function tween(dur, fn, easing = ease.out) {
  let vivo = true, resolver;
  const promessa = new Promise(res => { resolver = res; });
  if (dur <= 0) { fn(1); resolver(); return { promessa, parar() {} }; }
  const t0 = performance.now();
  const passo = agora => {
    if (!vivo) return;
    const k = clamp((agora - t0) / dur, 0, 1);
    fn(easing(k));
    if (k < 1) requestAnimationFrame(passo); else resolver();
  };
  requestAnimationFrame(passo);
  return { promessa, parar() { vivo = false; resolver(); } };
}

/* ───────────────────── preferências e sessão ───────────────────── */
const mqReduz = matchMedia('(prefers-reduced-motion: reduce)');
let reduzido = mqReduz.matches;
mqReduz.addEventListener?.('change', e => { reduzido = e.matches; });

const guardar = {
  ler(k) { try { return sessionStorage.getItem('limiar:' + k); } catch { return null; } },
  por(k, v) { try { sessionStorage.setItem('limiar:' + k, v); } catch {} },
  limpar() { try { ['estado', 'modo'].forEach(k => sessionStorage.removeItem('limiar:' + k)); } catch {} },
  lerLocal(k) { try { return localStorage.getItem('limiar:' + k); } catch { return null; } },
  porLocal(k, v) { try { localStorage.setItem('limiar:' + k, v); } catch {} },
};

/* ───────────────────── elementos ───────────────────── */
const corpo = document.body;
const raiz = document.documentElement;
const envelope = $('#envelope');
const envelopeGiro = $('#envelopeGiro');
const aba = $('#aba');
const lacreBtn = $('#lacre');
const lacreArte = $('#lacreArte');
const fragmentosEl = $('#fragmentos');
const vagaEnvelope = $('#vagaEnvelope');
const vagaLeitura = $('#vagaLeitura');
const leitura = $('#leitura');
const luz = $('#luz');
const vela = $('#vela');
const btnSom = $('#btnSom');
const volumeEl = $('#volume');
const btnReiniciar = $('#btnReiniciar');
const fita = $('#fita');
const verConvite = $('#verConvite');
const verOculta = $('#verOculta');
const pular = $('#pular');
const dica = $('#dica');
const anuncio = $('#anuncio');
const musica = $('#musica');

const folha = $('#modeloFolha').content.firstElementChild.cloneNode(true);
const corpoFolha = $('.folha-corpo', folha);
const camadaPublica = $('#camadaPublica', folha);
const camadaOculta = $('#camadaOculta', folha);
const marca = $('#marca', folha);
const moldura = $('.moldura', folha);
const papelEl = $('.folha-papel', folha);
const dobraEl = $('.dobra', folha);
const fibrasPista = $('.fibras-pista', folha);
const fibrasRevelacao = $('.fibras-revelacao', folha);

/* ───────────────────── estados ───────────────────── */
const E = {
  CARREGANDO: 'carregando', SELADO: 'selado', TRINCADO: 'trincado', ABERTO: 'aberto',
  EXTRAINDO: 'extraindo', ESCREVENDO: 'escrevendo', LEITURA: 'leitura',
  REVELANDO: 'revelando', REVELADO: 'revelado',
};
let estado = E.CARREGANDO;
function mudarEstado(e) { estado = e; corpo.dataset.estado = e; }
function anunciar(t) { anuncio.textContent = ''; setTimeout(() => { anuncio.textContent = t; }, 60); }

/* ───────────────────── medidas ───────────────────── */
const L = {};
let emAnimacao = false;
function medir() {
  L.vw = innerWidth; L.vh = innerHeight;
  L.mobile = L.vw < 700;
  L.envW = Math.round(Math.min(620, L.vw * .86, L.vh * .5 * 1.449));
  L.envH = Math.round(L.envW / 1.449);
  L.R = Math.round(Math.min(660, L.vw - (L.mobile ? 24 : 64)));
  L.estreito = L.R < 520;
  L.p = Math.round(L.R / 1.6);
  L.sEnv = (L.envW * .88) / L.R;
  L.seloD = Math.round(L.envW * .25);
  L.velaL = L.mobile ? 78 : 104;
  L.raioLuz = L.mobile ? 128 : 182;
}

/* ───────────────────── som ───────────────────── */
const Som = {
  ctx: null, master: null, gMusica: null, iniciado: false, musicaOk: true,
  mudo: guardar.lerLocal('mudo') === '1',
  vol: clamp(parseFloat(guardar.lerLocal('volume') ?? '0.3'), 0, 1),
  ruido: null, arrasto: null, fade: 0, fadeTw: null,
};
const curva = v => Math.pow(v, 1.6);
function alvoMusica() { return Som.mudo ? 0 : curva(Som.vol) * .9; }
function aplicarVolume(rampa = .25) {
  const a = alvoMusica();
  if (Som.gMusica) {
    const t = Som.ctx.currentTime, g = Som.gMusica.gain;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(a * Som.fade, t + rampa);
  } else {
    musica.volume = clamp(a * Som.fade, 0, 1);
  }
  if (Som.master) Som.master.gain.value = Som.mudo ? 0 : clamp(Som.vol * 1.5, 0, 1);
  btnSom.setAttribute('aria-pressed', Som.mudo ? 'true' : 'false');
  btnSom.setAttribute('aria-label', Som.mudo ? 'Ativar a música' : 'Silenciar a música');
}
function iniciarAudio() {
  if (Som.iniciado) return;
  Som.iniciado = true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    Som.ctx = new AC();
    Som.master = Som.ctx.createGain();
    Som.master.connect(Som.ctx.destination);
    /* por http(s), a música passa pelo WebAudio (permite volume no iOS);
       por file://, o navegador silenciaria essa rota, então fica no elemento */
    if (location.protocol !== 'file:') {
      const fonte = Som.ctx.createMediaElementSource(musica);
      Som.gMusica = Som.ctx.createGain();
      Som.gMusica.gain.value = 0;
      fonte.connect(Som.gMusica).connect(Som.ctx.destination);
    }
    const n = Som.ctx.sampleRate;
    Som.ruido = Som.ctx.createBuffer(1, n * 2, n);
    const d = Som.ruido.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch { Som.ctx = null; }
  aplicarVolume(0);
  tocarMusica();
}
function tocarMusica() {
  if (!Som.musicaOk) return;
  Som.ctx?.resume?.();
  const p = musica.play();
  if (!p) return;
  p.then(() => {
    Som.fadeTw?.parar();
    Som.fadeTw = tween(reduzido ? 600 : 3800, k => { Som.fade = k; aplicarVolume(.05); }, t => t);
  }).catch(err => {
    if (err && err.name === 'NotAllowedError') { Som.iniciado = false; }
    else falhaMusica();
  });
}
function falhaMusica() {
  Som.musicaOk = false;
  btnSom.classList.add('indisponivel');
  btnSom.title = 'Música indisponível';
}
musica.addEventListener('error', falhaMusica);

function sfxRuido({ dur, freq, freqFim, q = 1, tipo = 'bandpass', ganho = .1, ataque = .003, atraso = 0 }) {
  const c = Som.ctx; if (!c || !Som.ruido || Som.mudo) return;
  const t = c.currentTime + atraso;
  const src = c.createBufferSource(); src.buffer = Som.ruido;
  const f = c.createBiquadFilter(); f.type = tipo; f.Q.value = q;
  f.frequency.setValueAtTime(freq, t);
  if (freqFim) f.frequency.exponentialRampToValueAtTime(freqFim, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(ganho, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(Som.master);
  src.start(t, Math.random() * 1.2); src.stop(t + dur + .05);
}
function sfxTom({ freq, freqFim, dur, ganho = .05, ataque = .01, tipo = 'sine', atraso = 0 }) {
  const c = Som.ctx; if (!c || Som.mudo) return;
  const t = c.currentTime + atraso;
  const o = c.createOscillator(); o.type = tipo; o.frequency.setValueAtTime(freq, t);
  if (freqFim) o.frequency.exponentialRampToValueAtTime(freqFim, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(ganho, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(Som.master); o.start(t); o.stop(t + dur + .05);
}
const sfx = {
  racha(n) {
    const forca = [0, .5, .75, 1][n];
    sfxRuido({ dur: .06 + .03 * n, freq: 2600 - n * 300, q: 1.3, ganho: .16 * forca });
    for (let i = 0; i < 2 + n * 3; i++) sfxRuido({ dur: .018, freq: 3200 + Math.random() * 2400, q: 2, ganho: .07 * forca, atraso: .008 + Math.random() * (.03 + n * .05) });
    if (n >= 2) sfxTom({ freq: 150, freqFim: 70, dur: .18 + .08 * n, ganho: .06 * forca, ataque: .004 });
  },
  aba() { sfxRuido({ dur: .55, freq: 420, freqFim: 1500, q: .7, ganho: .05, ataque: .16 }); },
  papel() { sfxRuido({ dur: .5, freq: 900, freqFim: 2400, q: .6, ganho: .05, ataque: .1 }); },
  dobra() { sfxRuido({ dur: .13, freq: 1500, q: .9, ganho: .045, ataque: .01 }); sfxRuido({ dur: .05, freq: 3400, q: 1.5, ganho: .025, atraso: .07 }); },
  tinta() { sfxRuido({ dur: 2.6, freq: 6200, tipo: 'highpass', q: .4, ganho: .012, ataque: .9 }); },
  magia() {
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      sfxTom({ freq: f, dur: 4.6 - i * .3, ganho: .026, ataque: .9 + i * .18, atraso: i * .12 }));
    sfxRuido({ dur: 3.4, freq: 5200, tipo: 'highpass', q: .3, ganho: .018, ataque: 1.4 });
  },
  arrastoIniciar() {
    const c = Som.ctx; if (!c || !Som.ruido || Som.arrasto) return;
    const src = c.createBufferSource(); src.buffer = Som.ruido; src.loop = true;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = .8;
    const g = c.createGain(); g.gain.value = 0;
    src.connect(f).connect(g).connect(Som.master); src.start();
    Som.arrasto = { src, g };
  },
  arrasto(v) {
    if (!Som.arrasto || Som.mudo) return;
    const t = Som.ctx.currentTime;
    Som.arrasto.g.gain.setTargetAtTime(clamp(v * .00045, 0, .05), t, .05);
  },
  arrastoParar() {
    if (!Som.arrasto) return;
    const { src, g } = Som.arrasto; Som.arrasto = null;
    const t = Som.ctx.currentTime;
    g.gain.setTargetAtTime(0, t, .05); src.stop(t + .3);
  },
};

/* ───────────────────── texturas geradas ───────────────────── */
function paraURL(c) {
  return new Promise(res => {
    if (c.toBlob) c.toBlob(b => res(b ? URL.createObjectURL(b) : c.toDataURL()), 'image/png');
    else res(c.toDataURL());
  });
}
function fibras(g, r, N, quantas, cor, largura = [.4, 1.2]) {
  g.lineCap = 'round';
  for (let i = 0; i < quantas; i++) {
    const x = r() * N, y = r() * N, comp = 4 + r() * 26, ang = r() * Math.PI * 2, curva = (r() - .5) * comp * .7;
    const x2 = x + Math.cos(ang) * comp, y2 = y + Math.sin(ang) * comp;
    const mx = (x + x2) / 2 + Math.cos(ang + Math.PI / 2) * curva, my = (y + y2) / 2 + Math.sin(ang + Math.PI / 2) * curva;
    g.strokeStyle = cor(); g.lineWidth = lerp(largura[0], largura[1], r());
    const borda = x < 34 || y < 34 || x > N - 34 || y > N - 34;
    const desl = borda ? [-N, 0, N] : [0];
    for (const dx of desl) for (const dy of desl) {
      g.beginPath(); g.moveTo(x + dx, y + dy); g.quadraticCurveTo(mx + dx, my + dy, x2 + dx, y2 + dy); g.stroke();
    }
  }
}
function manchas(g, r, N, quantas, cor) {
  for (let i = 0; i < quantas; i++) {
    const x = r() * N, y = r() * N, raio = 24 + r() * 120;
    const c = cor(r);
    for (const dx of [-N, 0, N]) for (const dy of [-N, 0, N]) {
      const xx = x + dx, yy = y + dy;
      if (xx + raio < 0 || xx - raio > N || yy + raio < 0 || yy - raio > N) continue;
      const gr = g.createRadialGradient(xx, yy, 0, xx, yy, raio);
      gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(xx - raio, yy - raio, raio * 2, raio * 2);
    }
  }
}
function grao(g, r, N, amp, azul = .9) {
  const im = g.getImageData(0, 0, N, N), d = im.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - .5) * amp;
    d[i] += n; d[i + 1] += n; d[i + 2] += n * azul;
  }
  g.putImageData(im, 0, 0);
}
function texturaPapel() {
  const N = 512, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'), r = rng(2627);
  g.fillStyle = '#efe5cf'; g.fillRect(0, 0, N, N);
  manchas(g, r, N, 70, r => r() < .62 ? `rgba(150,112,64,${.025 + r() * .045})` : `rgba(255,252,240,${.05 + r() * .07})`);
  fibras(g, r, N, 1500, () => r() < .7 ? `rgba(118,90,52,${.05 + r() * .1})` : `rgba(255,253,246,${.22 + r() * .32})`);
  grao(g, r, N, 13);
  return paraURL(c);
}
function texturaFibrasVioleta() {
  const N = 512, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'), r = rng(2627);
  /* mesma semente do papel: as fibras violeta coincidem com as fibras reais */
  manchas(g, r, N, 70, () => 'rgba(0,0,0,0)');
  fibras(g, r, N, 1500, () => r() < .7 ? `rgba(150,92,255,${.35 + r() * .45})` : `rgba(205,170,255,${.25 + r() * .35})`, [.6, 1.6]);
  return paraURL(c);
}
function texturaNegra() {
  const N = 512, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'), r = rng(1313);
  g.fillStyle = '#141116'; g.fillRect(0, 0, N, N);
  manchas(g, r, N, 90, r => r() < .55 ? `rgba(120,112,130,${.035 + r() * .05})` : `rgba(0,0,0,${.18 + r() * .2})`);
  fibras(g, r, N, 700, () => `rgba(170,160,180,${.03 + r() * .05})`);
  grao(g, r, N, 10, 1.05);
  return paraURL(c);
}

/* ───────────────────── brasão Tepes (geometria do brasão aprovado) ───────────────────── */
const BR = {
  escudo: 'M-100 -120 H100 V-10 C100 60 50 100 0 120 C-50 100 -100 60 -100 -10 Z',
  asa: 'M0 0 C30 -40 70 -60 120 -58 C110 -40 112 -28 120 -14 C102 -20 92 -10 92 6 C78 -6 64 -2 58 14 C48 2 30 4 22 18 C18 8 10 4 0 6Z',
  costelas: 'M72 -50 L120 -14 M72 -50 L92 6 M72 -50 L58 14 M72 -50 L22 18',
  cruz: 'M-62 -58 H62 L56 -44 H8 V70 L0 88 L-8 70 V-44 H-56Z',
  topo: 'M-62 -58 H62 L56 -44 H-56Z',
  pet: 'M0 0 C-18 -10 -22 -34 0 -42 C22 -34 18 -10 0 0Z',
  gota: 'M0 90 C4 96 7 100 7 104 A7 7 0 0 1 -7 104 C-7 100 -4 96 0 90Z',
};
const ROT5 = [0, 72, 144, 216, 288];
function hachuras(id, st) {
  let a = '', b = '';
  for (let k = -270; k <= 110; k += 9) a += `M${k} 130 L${k + 260} -130 `;
  for (let y = -116; y <= 120; y += 9) b += `M0 ${y} H100 `;
  for (let x = 5; x <= 100; x += 9) b += `M${x} -120 V120 `;
  return `<clipPath id="${id}-e"><rect x="-100" y="-120" width="100" height="240"/></clipPath>
    <path d="${a}" clip-path="url(#${id}-e)" fill="none" ${st}/><path d="${b}" fill="none" ${st}/>
    <path d="M0 -120 V120" fill="none" ${st}/>`;
}
function brasao(o, id) {
  const petalas = () => ROT5.map(a => `<path d="${BR.pet}" transform="rotate(${a})"/>`).join('');
  const asas = d => `<path d="${d}" transform="translate(-6 -40) scale(-.55 .55)"/><path d="${d}" transform="translate(6 -40) scale(.55)"/>`;
  return `
  <clipPath id="${id}-c"><path d="${BR.escudo}"/></clipPath>
  <g clip-path="url(#${id}-c)">
    <path d="${BR.escudo}" ${o.campo}/>
    ${o.hachura ? hachuras(id, o.hachura) : ''}
    <g transform="translate(0 -14) scale(1.15)">
      <g ${o.asa}>${asas(BR.asa)}</g>
      ${o.costela ? `<g fill="none" ${o.costela}>${asas(BR.costelas)}</g>` : ''}
      <path d="${BR.cruz}" ${o.cruz}/>
      <path d="${BR.topo}" ${o.topo}/>
      ${o.sulco ? `<path d="M0 -40 V64" fill="none" ${o.sulco}/>` : ''}
    </g>
    <g transform="translate(0 8) scale(1.05)">
      <g ${o.petala}>${petalas()}</g>
      <g transform="rotate(36) scale(.62)" ${o.petalaIn}>${petalas()}</g>
      <circle r="7" ${o.miolo}/>
      <circle r="2.4" ${o.gema}/>
    </g>
    <path d="${BR.gota}" ${o.gota}/>
  </g>
  <path d="${BR.escudo}" fill="none" ${o.borda}/>
  ${o.bordaIn ? `<path d="${BR.escudo}" fill="none" transform="translate(0 -3) scale(.91)" ${o.bordaIn}/>` : ''}`;
}
const cinza = v => `rgb(${v},${v},${v})`;
const BRASAO_RELEVO = {
  campo: `fill="${cinza(116)}"`,
  hachura: `stroke="${cinza(98)}" stroke-width="2.6"`,
  asa: `fill="${cinza(156)}" stroke="${cinza(104)}" stroke-width="2.2"`,
  costela: `stroke="${cinza(122)}" stroke-width="3"`,
  cruz: `fill="${cinza(182)}" stroke="${cinza(96)}" stroke-width="2.6"`,
  topo: `fill="${cinza(198)}" stroke="${cinza(96)}" stroke-width="2.6"`,
  sulco: `stroke="${cinza(150)}" stroke-width="3"`,
  petala: `fill="${cinza(176)}" stroke="${cinza(92)}" stroke-width="3.6"`,
  petalaIn: `fill="${cinza(206)}" stroke="${cinza(118)}" stroke-width="3.2"`,
  miolo: `fill="${cinza(148)}" stroke="${cinza(214)}" stroke-width="2.4"`,
  gema: `fill="${cinza(238)}"`,
  gota: `fill="${cinza(180)}" stroke="${cinza(100)}" stroke-width="1.8"`,
  borda: `stroke="${cinza(176)}" stroke-width="11"`,
  bordaIn: `stroke="${cinza(84)}" stroke-width="2.6"`,
};

/* ───────────────────── utilidades de SVG ───────────────────── */
let medidor = null;
function svgMedidor() {
  if (!medidor) {
    medidor = document.createElementNS(NS, 'svg');
    medidor.setAttribute('width', '0'); medidor.setAttribute('height', '0');
    medidor.style.position = 'absolute'; medidor.style.visibility = 'hidden';
    corpo.appendChild(medidor);
  }
  return medidor;
}
function caminhoSuave(pts) {
  const n = pts.length;
  let d = `M${f2(pts[0][0])} ${f2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += ` C${f2(p1[0] + (p2[0] - p0[0]) / 6)} ${f2(p1[1] + (p2[1] - p0[1]) / 6)} ${f2(p2[0] - (p3[0] - p1[0]) / 6)} ${f2(p2[1] - (p3[1] - p1[1]) / 6)} ${f2(p2[0])} ${f2(p2[1])}`;
  }
  return d + 'Z';
}
/* trepadeira de rosas em prata ao longo de uma borda */
function trepadeira(d, { dentro, afast = 20, passo = 34, amp = 5, escala = 1.35, inicio = 26, fim = 26, pre }) {
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d); svgMedidor().appendChild(p);
  const L = p.getTotalLength();
  const ponto = s => {
    const a = p.getPointAtLength(clamp(s, 0, L)), b = p.getPointAtLength(clamp(s + 1, 0, L));
    let tx = b.x - a.x, ty = b.y - a.y; const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
    return { x: a.x, y: a.y, tx, ty };
  };
  const meio = ponto(L / 2);
  const t1 = Math.hypot(meio.x - ty(meio) * 20 - dentro[0], meio.y + meio.tx * 20 - dentro[1]);
  function ty(q) { return q.ty; }
  const t2 = Math.hypot(meio.x + meio.ty * 20 - dentro[0], meio.y - meio.tx * 20 - dentro[1]);
  const lado = t1 < t2 ? 1 : -1;            /* normal = lado * (-ty, tx) */
  const em = (s, extra = 0) => {
    const q = ponto(s); const nx = -q.ty * lado, ny = q.tx * lado;
    const o = afast + Math.sin((s - inicio) * Math.PI / passo) * amp + extra;
    return { x: q.x + nx * o, y: q.y + ny * o, ang: Math.atan2(q.ty, q.tx) * 180 / Math.PI, nx, ny };
  };
  let haste = '';
  for (let s = inicio; s <= L - fim; s += 4) { const q = em(s); haste += (haste ? 'L' : 'M') + f2(q.x) + ' ' + f2(q.y) + ' '; }
  let flores = '';
  let k = 0;
  for (let s = inicio + passo / 2; s <= L - fim; s += passo, k++) {
    const q = em(s);
    flores += `<use href="#${pre}-rosa" transform="translate(${f2(q.x)} ${f2(q.y)}) rotate(${f2(q.ang + k * 47)}) scale(${escala})"/>`;
  }
  for (let s = inicio + passo; s <= L - fim; s += passo) {
    const q = em(s);
    flores += `<use href="#${pre}-folha" transform="translate(${f2(q.x)} ${f2(q.y)}) rotate(${f2(q.ang - 35)}) scale(${escala * .9})"/>`;
    flores += `<use href="#${pre}-folha" transform="translate(${f2(q.x)} ${f2(q.y)}) rotate(${f2(q.ang + 145)}) scale(${escala * .75})"/>`;
  }
  p.remove();
  return `<path class="haste" d="${haste}"/>${flores}`;
}
function defsPrata(pre) {
  return `
    <linearGradient id="${pre}-prata" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7c7783"/><stop offset=".48" stop-color="#ebe7ef"/><stop offset="1" stop-color="#8b8692"/>
    </linearGradient>
    <g id="${pre}-rosa">
      <path d="M0 -6 C3.6 -6 6 -3.4 6 0 C6 3.6 3.4 6 0 6 C-3.6 6 -6 3.6 -6 0 C-6 -2.6 -4.4 -4.6 -2.2 -5.6" fill="none" stroke="url(#${pre}-prata)" stroke-width="1.35"/>
      <path d="M-2.6 -2 C-1 -3.6 2.4 -3 2.8 -.4 C3.2 2.2 .6 3.6 -1.4 2.6 C-3 1.8 -2.6 -.4 -1 -.8 C.4 -1.2 1.2 .2 .4 1" fill="none" stroke="url(#${pre}-prata)" stroke-width="1.1"/>
    </g>
    <g id="${pre}-folha">
      <path d="M0 0 C3 -3.6 8 -3.6 11 0 C8 3.6 3 3.6 0 0Z" fill="url(#${pre}-prata)"/>
      <path d="M1 0 H9" stroke="#1a171c" stroke-width=".5"/>
    </g>`;
}
const DAMASCO_MEIO = `
  <path class="d-tr" d="M6 -78 C26 -96 58 -92 64 -70 C69 -52 52 -42 42 -52 C34 -60 42 -70 50 -66"/>
  <path class="d-tr" d="M6 -40 C40 -54 96 -54 118 -28 C134 -8 120 14 100 10 C84 6 84 -12 98 -14 C108 -15 112 -6 106 -2"/>
  <path class="d-tr" d="M6 -6 C34 -6 58 4 66 22 C72 38 60 52 46 46 C34 40 40 26 50 28"/>
  <path class="d-tr" d="M6 28 C22 44 26 66 14 80 C8 86 2 84 4 78"/>
  <path class="d-tr" d="M60 -62 C80 -66 96 -78 104 -92"/>
  <path class="d-ch" d="M104 -92 C110 -101 121 -101 123 -94 C116 -91 110 -90 104 -92Z"/>
  <path class="d-ch" d="M118 -28 C128 -40 143 -40 149 -32 C141 -27 128 -26 118 -28Z"/>
  <path class="d-ch" d="M66 22 C78 15 91 19 93 28 C85 30 74 28 66 22Z"/>
  <path class="d-ch" d="M26 -88 C30 -100 40 -104 46 -100 C42 -94 34 -90 26 -88Z"/>
  <circle class="d-ch" cx="74" cy="-14" r="3.4"/><circle class="d-ch" cx="30" cy="60" r="2.6"/><circle class="d-ch" cx="86" cy="-50" r="2.2"/>`;
const DAMASCO = `
  <g>${DAMASCO_MEIO}</g><g transform="scale(-1 1)">${DAMASCO_MEIO}</g>
  <path class="d-ch" d="M-3.5 -104 L0 -116 L3.5 -104 V-62 H22 L18 -55 H3.5 V70 L0 86 L-3.5 70 V-55 H-18 L-22 -62 H-3.5 Z"/>
  <path class="d-ch" d="M0 -32 L9 -16 L0 0 L-9 -16Z" opacity=".9"/>`;

/* ───────────────────── envelope ───────────────────── */
const G = {
  bolso: 'M0 0 Q250 196 500 352 Q750 196 1000 0 V683 Q1000 690 993 690 H7 Q0 690 0 683 Z',
  boca: 'M0 0 Q250 196 500 352 Q750 196 1000 0 Z',
  bocaE: 'M0 0 Q250 196 500 352', bocaD: 'M1000 0 Q750 196 500 352',
  baixo: 'M0 690 C180 566 372 456 500 438 C628 456 820 566 1000 690',
  baixoE: 'M0 690 C180 566 372 456 500 438', baixoD: 'M1000 690 C820 566 628 456 500 438',
  aba: 'M0 0 H1000 C930 70 760 230 580 372 C545 400 525 418 500 424 C475 418 455 400 420 372 C240 230 70 70 0 0 Z',
  abaE: 'M0 0 C70 70 240 230 420 372 C455 400 475 418 500 424', abaD: 'M1000 0 C930 70 760 230 580 372 C545 400 525 418 500 424',
  seloY: 398,
};
function padraoForro(id) {
  return `<pattern id="${id}" width="44" height="60" patternUnits="userSpaceOnUse">
    <rect width="44" height="60" fill="#1d0a27"/>
    <path d="M22 0 C34 10 34 20 22 30 C10 40 10 50 22 60 M22 0 C10 10 10 20 22 30 C34 40 34 50 22 60" fill="none" stroke="#3b1a50" stroke-width="1.3"/>
    <path d="M0 22 C3 26 3 34 0 38 C-3 34 -3 26 0 22Z M44 22 C47 26 47 34 44 38 C41 34 41 26 44 22Z" fill="#33164a"/>
    <circle cx="22" cy="30" r="2" fill="#4a2464"/><circle cx="0" cy="0" r="1.6" fill="#4a2464"/><circle cx="44" cy="60" r="1.6" fill="#4a2464"/>
  </pattern>`;
}
function padraoTextura(id, url, envW) {
  const t = 512 * 1000 / envW;        /* mantém o grão em ~1:1 com os pixels */
  return `<pattern id="${id}" width="${f2(t)}" height="${f2(t)}" patternUnits="userSpaceOnUse"><image href="${url}" width="${f2(t)}" height="${f2(t)}" preserveAspectRatio="none"/></pattern>`;
}
const estiloPrata = pre => `<style>
  #${pre} .haste{fill:none;stroke:#b9b3c0;stroke-opacity:.8;stroke-width:1.15}
  #${pre} .d-tr{fill:none;stroke:url(#${pre}-prata);stroke-width:3.4;stroke-linecap:round}
  #${pre} .d-ch{fill:url(#${pre}-prata)}
</style>`;
let urlNegro = '';
function construirEnvelope() {
  const W = L.envW;
  const costas = $('#envCostas'), frente = $('#envFrente'), fora = $('#abaFora'), dentro = $('#abaDentro');
  for (const s of [costas, frente, fora, dentro]) { s.setAttribute('viewBox', '0 0 1000 690'); s.setAttribute('preserveAspectRatio', 'none'); }

  costas.innerHTML = `<defs>${padraoForro('c-forro')}
      <linearGradient id="c-fundo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".05"/><stop offset=".55" stop-color="#000" stop-opacity=".55"/>
      </linearGradient></defs>
    <rect width="1000" height="690" rx="7" fill="url(#c-forro)"/>
    <path d="${G.boca}" fill="url(#c-fundo)"/>`;

  frente.id = 'envFrente';
  frente.innerHTML = `<defs>${padraoTextura('f-tex', urlNegro, W)}${defsPrata('f')}
      <clipPath id="f-boca"><path d="${G.boca}"/></clipPath>
      <filter id="f-borrao" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>
      <linearGradient id="f-abaixo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".055"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>${estiloPrata('envFrente')}
    <g clip-path="url(#f-boca)"><path d="${G.bocaE} L1000 0" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="30" filter="url(#f-borrao)"/></g>
    <path class="bolso" d="${G.bolso}" fill="#151217"/>
    <path d="${G.bolso}" fill="url(#f-tex)"/>
    <path d="${G.baixo} Z" fill="url(#f-abaixo)"/>
    <path d="${G.baixo}" fill="none" stroke="#000" stroke-opacity=".7" stroke-width="3"/>
    <path d="${G.baixo}" transform="translate(0 2.6)" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="1.6"/>
    <path d="${G.bocaE} ${G.bocaD.replace('M1000 0', 'M1000 0')}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
    ${trepadeira(G.bocaE, { dentro: [500, 620], pre: 'f' })}
    ${trepadeira(G.bocaD, { dentro: [500, 620], pre: 'f' })}
    ${trepadeira(G.baixoE, { dentro: [500, 685], pre: 'f', inicio: 30 })}
    ${trepadeira(G.baixoD, { dentro: [500, 685], pre: 'f', inicio: 30 })}`;

  fora.id = 'abaFora';
  fora.innerHTML = `<defs>${padraoTextura('a-tex', urlNegro, W)}${defsPrata('a')}
      <linearGradient id="a-luz" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".045"/><stop offset=".7" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/>
      </linearGradient></defs>${estiloPrata('abaFora')}
    <path d="${G.aba}" fill="#18141a"/>
    <path d="${G.aba}" fill="url(#a-tex)"/>
    <path d="${G.aba}" fill="url(#a-luz)"/>
    <path d="${G.abaE}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="2.2"/>
    <path d="${G.abaD}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="2.2"/>
    ${trepadeira(G.abaE, { dentro: [500, 120], pre: 'a', fim: 60 })}
    ${trepadeira(G.abaD, { dentro: [500, 120], pre: 'a', fim: 60 })}
    <g transform="translate(500 200) scale(.68)">${DAMASCO}</g>`;

  dentro.innerHTML = `<defs>${padraoForro('d-forro')}
      <linearGradient id="d-sombra" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".4" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".25"/>
      </linearGradient></defs>
    <path d="${G.aba}" fill="url(#d-forro)"/>
    <path d="${G.aba}" fill="url(#d-sombra)"/>
    <path d="${G.abaE}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="3"/>
    <path d="${G.abaD}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="3"/>`;
}

/* ───────────────────── selo de cera com o brasão em relevo ───────────────────── */
const Lacre = (() => {
  const C = 110;
  const r = rng(77);
  const fases = Array.from({ length: 8 }, () => r() * Math.PI * 2);
  const amps = [0, 0, 2.6, 2.1, 1.6, 1.1, .8, .55];
  const lobos = Array.from({ length: 3 }, () => ({ a: r() * Math.PI * 2, w: .2 + r() * .25, h: 4 + r() * 5 }));
  const raio = a => {
    let v = 92;
    for (let k = 2; k < 8; k++) v += amps[k] * Math.sin(k * a + fases[k]);
    for (const l of lobos) { const d = Math.atan2(Math.sin(a - l.a), Math.cos(a - l.a)); v += l.h * Math.exp(-(d * d) / (2 * l.w * l.w)); }
    return v;
  };
  const pts = [];
  for (let i = 0; i < 96; i++) { const a = i / 96 * Math.PI * 2, rr = raio(a); pts.push([C + Math.cos(a) * rr, C + Math.sin(a) * rr]); }
  const bolha = caminhoSuave(pts);
  let contas = '';
  for (let i = 0; i < 44; i++) { const a = i / 44 * Math.PI * 2; contas += `<circle cx="${f2(C + Math.cos(a) * 65.4)}" cy="${f2(C + Math.sin(a) * 65.4)}" r="1.15"/>`; }

  let svg, gFendasH, gFendasT, luzD, luzE, brilho;
  let raios = null, centro = [C, C], ramos = [];

  function montar() {
    lacreArte.innerHTML = `<svg viewBox="0 0 220 220" xmlns="${NS}">
      <defs>
        <clipPath id="L-clip"><path d="${bolha}"/></clipPath>
        <filter id="L-b7" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="L-b3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>
        <filter id="L-b1"><feGaussianBlur stdDeviation="1.1"/></filter>
        <filter id="L-cera" x="0" y="0" width="220" height="220" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation=".75" result="sg"/>
          <feColorMatrix in="sg" type="luminanceToAlpha" result="h0"/>
          <feTurbulence type="fractalNoise" baseFrequency=".085" numOctaves="2" seed="9" result="tn"/>
          <feColorMatrix in="tn" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .07 0 0 0 0" result="ta"/>
          <feComposite in="h0" in2="ta" operator="arithmetic" k2="1" k3="1" result="h"/>
          <feDiffuseLighting in="h" surfaceScale="13" diffuseConstant="1.08" lighting-color="#ffe7cf" result="dif">
            <fePointLight id="L-luzD" x="-200" y="-260" z="300"/>
          </feDiffuseLighting>
          <feSpecularLighting in="h" surfaceScale="13" specularConstant=".85" specularExponent="22" lighting-color="#ffd7ad" result="esp">
            <fePointLight id="L-luzE" x="-200" y="-260" z="300"/>
          </feSpecularLighting>
          <feFlood flood-color="#5d2480" result="cor"/>
          <feComposite in="cor" in2="dif" operator="arithmetic" k1="1.3" k2=".16" result="tinta"/>
          <feComposite in="esp" in2="tinta" operator="arithmetic" k2=".8" k3="1"/>
        </filter>
        <radialGradient id="L-sss" cx=".3" cy=".28" r=".75">
          <stop offset="0" stop-color="#c890ff" stop-opacity=".42"/><stop offset=".55" stop-color="#7a35b0" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g clip-path="url(#L-clip)">
        <g filter="url(#L-cera)">
          <path d="${bolha}" fill="${cinza(152)}" filter="url(#L-b7)"/>
          <circle cx="${C}" cy="${C}" r="76" fill="none" stroke="${cinza(194)}" stroke-width="13" filter="url(#L-b3)"/>
          <circle cx="${C}" cy="${C}" r="67.5" fill="${cinza(94)}" filter="url(#L-b1)"/>
          <circle cx="${C}" cy="${C}" r="63" fill="none" stroke="${cinza(140)}" stroke-width="2.3"/>
          <circle cx="${C}" cy="${C}" r="59.6" fill="none" stroke="${cinza(122)}" stroke-width="1.1"/>
          <g fill="${cinza(142)}">${contas}</g>
          <g transform="translate(${C} ${C + 3}) scale(.335)">${brasao(BRASAO_RELEVO, 'L-br')}</g>
          <g id="L-fendasH" fill="none" stroke="${cinza(20)}" stroke-linecap="round" stroke-linejoin="round"></g>
        </g>
        <g id="L-fendasT" fill="none" stroke="#0c0313" stroke-linecap="round" stroke-linejoin="round"></g>
        <path id="L-brilho" d="${bolha}" fill="url(#L-sss)"/>
      </g>
    </svg>`;
    svg = lacreArte.firstElementChild;
    gFendasH = svg.querySelector('#L-fendasH');
    gFendasT = svg.querySelector('#L-fendasT');
    luzD = svg.querySelector('#L-luzD');
    luzE = svg.querySelector('#L-luzE');
    brilho = svg.querySelector('#L-sss');
  }

  function luzDe(dx, dy) {
    if (!luzD) return;
    /* compensa o giro do envelope (-3.5°) */
    const a = 3.5 * Math.PI / 180, x = dx * Math.cos(a) - dy * Math.sin(a), y = dx * Math.sin(a) + dy * Math.cos(a);
    const lx = C + x * 430, ly = C + y * 430;
    for (const l of [luzD, luzE]) { l.setAttribute('x', f2(lx)); l.setAttribute('y', f2(ly)); }
    brilho.setAttribute('cx', f2(.5 + x * .26)); brilho.setAttribute('cy', f2(.5 + y * .26));
  }

  function gerarRaios(off) {
    const rr = rng(Math.floor(Math.random() * 1e9));
    centro = [C + clamp(off.x, -16, 16), C + clamp(off.y, -16, 16)];
    const K = 7, a0 = Math.atan2(off.y || -.3, off.x || .4);
    const angs = [];
    for (let i = 0; i < K; i++) angs.push(a0 + i * Math.PI * 2 / K + (rr() - .5) * .45);
    raios = angs.map(a => {
      const pts = [[centro[0], centro[1]]];
      let desvio = 0;
      for (let s = 6; s <= 130; s += 6) {
        desvio = clamp(desvio + (rr() - .5) * 3.4, -5, 5);
        pts.push([centro[0] + Math.cos(a) * s - Math.sin(a) * desvio, centro[1] + Math.sin(a) * s + Math.cos(a) * desvio]);
      }
      return { a, pts };
    });
    ramos = raios.map(rq => {
      const i = 3 + Math.floor(rr() * 6), base = rq.pts[i];
      const a = rq.a + (rr() < .5 ? 1 : -1) * (.5 + rr() * .4), comp = 10 + rr() * 14;
      return [base, [base[0] + Math.cos(a) * comp * .5 + (rr() - .5) * 3, base[1] + Math.sin(a) * comp * .5 + (rr() - .5) * 3], [base[0] + Math.cos(a) * comp, base[1] + Math.sin(a) * comp]];
    });
  }
  const linha = pts => 'M' + pts.map(p => f2(p[0]) + ' ' + f2(p[1])).join(' L');
  function ate(pts, comp) {
    const n = Math.max(2, Math.round(comp / 6) + 1);
    return pts.slice(0, n);
  }
  function fendas(n) {
    if (!raios) gerarRaios({ x: 0, y: 0 });
    const tracos = [];
    if (n >= 1) { tracos.push([ate(raios[0].pts, n === 1 ? 44 : 130), n === 1 ? 2.2 : 3.2]); tracos.push([ramos[0], 1.6]); }
    if (n >= 2) {
      tracos.push([ate(raios[2].pts, n === 2 ? 74 : 130), 2.6]);
      tracos.push([ate(raios[4].pts, n === 2 ? 58 : 130), 2.4]);
      tracos.push([ate(raios[5].pts, n === 2 ? 30 : 130), 2]);
      tracos.push([ramos[2], 1.5], [ramos[4], 1.4]);
    }
    if (n >= 3) {
      for (const i of [1, 3, 6]) tracos.push([raios[i].pts, 2.4]);
      tracos.push([ramos[1], 1.3], [ramos[5], 1.3]);
    }
    /* sulco no mapa de altura (sombra e borda iluminada) + fenda escura com fio de luz na borda */
    gFendasH.innerHTML = tracos.map(([p, w]) => `<path d="${linha(p)}" stroke-width="${f2(w * 2.8)}"/>`).join('');
    gFendasT.innerHTML = tracos.map(([p, w]) => `<path d="${linha(p)}" stroke-width="${f2(w * 1.25)}" stroke-opacity=".95"/>`).join('')
      + tracos.map(([p, w]) => `<path d="${linha(p)}" transform="translate(-.9 -.9)" stroke="#d9a8ff" stroke-opacity=".35" stroke-width="${f2(w * .45)}"/>`).join('');
  }
  function imagem() {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  }
  /* cunhas entre raios consecutivos: são os pedaços que se partem */
  function cunhas() {
    const ord = [...raios].sort((a, b) => a.a - b.a);
    return ord.map((rq, i) => {
      const prox = ord[(i + 1) % ord.length];
      let a1 = rq.a, a2 = prox.a; if (a2 <= a1) a2 += Math.PI * 2;
      const arco = [];
      for (let k = 1; k < 6; k++) { const a = lerp(a1, a2, k / 6); arco.push([centro[0] + Math.cos(a) * 132, centro[1] + Math.sin(a) * 132]); }
      const poli = [...rq.pts, ...arco, ...[...prox.pts].reverse()];
      const am = (a1 + a2) / 2;
      const rc = Math.min(raio(am) * .62, 60);
      return { poli, cx: centro[0] + Math.cos(am) * rc, cy: centro[1] + Math.sin(am) * rc, am };
    });
  }
  return { montar, luzDe, gerarRaios, fendas, imagem, cunhas, get svg() { return svg; } };
})();

/* ───────────────────── fragmentos de cera ───────────────────── */
let fragmentos = null;    /* parâmetros guardados para reposicionar */
function criarFragmentos(url, animar) {
  fragmentosEl.innerHTML = '';
  const D = L.seloD;
  const cx = L.envW / 2, cy = L.envH * G.seloY / 690;
  const k = D / 140;
  if (!fragmentos) {
    const rr = rng(Math.floor(Math.random() * 1e9));
    const pedacos = Lacre.cunhas().map(c => {
      let dx = Math.cos(c.am), dy = Math.sin(c.am);
      if (dy < .1) { dy = dy * .3 + .25; dx *= 1.3; }
      const m = Math.hypot(dx, dy); dx /= m; dy /= m;
      const dist = 16 + rr() * 30;
      return { ...c, tx: dx * dist, ty: dy * dist + 6, rot: (rr() - .5) * 46, dur: 720 + rr() * 260, atraso: rr() * 70 };
    });
    const migalhas = Array.from({ length: 9 }, () => {
      const a = Math.PI * (.05 + rr() * .9) + (rr() < .25 ? Math.PI : 0);
      const dist = 52 + rr() * 80;
      return { a, tam: 3 + rr() * 5, tx: Math.cos(a) * dist, ty: Math.sin(a) * dist * .8 + 8, rot: (rr() - .5) * 600, dur: 620 + rr() * 300, x0: Math.cos(a) * 40, y0: Math.sin(a) * 40 };
    });
    fragmentos = { pedacos, migalhas };
  }
  const sombra = (h) => `drop-shadow(${f2(cssNum('--sx') * (2.5 + h * 8))}px ${f2(cssNum('--sy') * (2.5 + h * 8) + 1 + h * 3)}px ${f2(2 + h * 6)}px rgba(0,0,0,.72))`;
  for (const p of fragmentos.pedacos) {
    const w = document.createElement('div'); w.className = 'frag';
    w.style.width = w.style.height = D + 'px';
    w.style.left = (cx - D / 2) + 'px'; w.style.top = (cy - D / 2) + 'px';
    w.style.transformOrigin = `${f2(p.cx / 220 * 100)}% ${f2(p.cy / 220 * 100)}%`;
    const i = document.createElement('i');
    i.style.backgroundImage = `url("${url}")`;
    i.style.clipPath = `polygon(${p.poli.map(q => `${f2(q[0] / 220 * 100)}% ${f2(q[1] / 220 * 100)}%`).join(',')})`;
    w.appendChild(i); fragmentosEl.appendChild(w);
    const fim = `translate(${f2(p.tx * k * 1.05)}px, ${f2(p.ty * k * 1.05)}px) rotate(${f2(p.rot * 1.04)}deg)`;
    if (!animar) { w.style.transform = fim; w.style.filter = sombra(0); continue; }
    w.animate([
      { transform: 'translate(0,0) rotate(0deg) scale(1)', filter: sombra(0) },
      { transform: `translate(${f2(p.tx * k * .5)}px, ${f2(p.ty * k * .5 - 7 * k)}px) rotate(${f2(p.rot * .55)}deg) scale(1.07)`, filter: sombra(1), offset: .34 },
      { transform: `translate(${f2(p.tx * k)}px, ${f2(p.ty * k)}px) rotate(${f2(p.rot)}deg) scale(1)`, filter: sombra(0), offset: .7 },
      { transform: `translate(${f2(p.tx * k * 1.035)}px, ${f2(p.ty * k * 1.035 - 1.5 * k)}px) rotate(${f2(p.rot * 1.03)}deg) scale(1.018)`, filter: sombra(.25), offset: .83 },
      { transform: fim, filter: sombra(0) },
    ], { duration: p.dur, delay: p.atraso, easing: 'cubic-bezier(.22,.6,.3,1)', fill: 'both' });
  }
  for (const m of fragmentos.migalhas) {
    const e = document.createElement('div'); e.className = 'migalha';
    const t = m.tam * k;
    e.style.width = f2(t) + 'px'; e.style.height = f2(t * (.7 + (m.tam % 1) * .5)) + 'px';
    const x0 = cx + m.x0 * k - t / 2, y0 = cy + m.y0 * k - t / 2;
    const fim = `translate(${f2(x0 + m.tx * k)}px, ${f2(y0 + m.ty * k)}px) rotate(${f2(m.rot)}deg)`;
    fragmentosEl.appendChild(e);
    if (!animar) { e.style.transform = fim; continue; }
    e.animate([
      { transform: `translate(${f2(x0)}px, ${f2(y0)}px) rotate(0deg) scale(1)`, opacity: 0 },
      { transform: `translate(${f2(x0 + m.tx * k * .55)}px, ${f2(y0 + m.ty * k * .55 - 10 * k)}px) rotate(${f2(m.rot * .6)}deg) scale(1.15)`, opacity: 1, offset: .35 },
      { transform: `translate(${f2(x0 + m.tx * k * .95)}px, ${f2(y0 + m.ty * k * .95)}px) rotate(${f2(m.rot * .95)}deg) scale(1)`, offset: .75 },
      { transform: fim, opacity: 1 },
    ], { duration: m.dur, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'both' });
  }
}
function cssNum(v) { return parseFloat(getComputedStyle(raiz).getPropertyValue(v)) || 0; }

/* ───────────────────── a folha ───────────────────── */
function decodificar(b64) {
  const bin = atob(b64), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
function envolverPalavras(camada) {
  const andar = n => {
    for (const c of [...n.childNodes]) {
      if (c.nodeType === 3) {
        const partes = c.textContent.split(/(\s+)/);
        if (!c.textContent.trim()) continue;
        const frag = document.createDocumentFragment();
        for (const p of partes) {
          if (!p) continue;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else { const s = document.createElement('span'); s.className = 't'; s.textContent = p; frag.appendChild(s); }
        }
        c.replaceWith(frag);
      } else if (c.nodeType === 1) andar(c);
    }
  };
  andar(camada);
  camada._itens = [...camada.querySelectorAll('.t, .divisor')];
}
function distribuirTinta(camada, total, inverso = false) {
  const itens = camada._itens;
  const r = rng(itens.length * 31 + (inverso ? 7 : 0));
  const grupos = [];
  for (let i = 0; i < itens.length;) { const n = 1 + Math.floor(r() * 3); grupos.push(itens.slice(i, i + n)); i += n; }
  const passo = total / grupos.length;
  grupos.forEach((g, gi) => g.forEach((el, k) => {
    const d = gi * passo + k * .045 + r() * passo * .4;
    el.style.setProperty(inverso ? '--d2' : '--d', f2(d) + 's');
  }));
  for (const nome of camada.querySelectorAll('.nome')) {
    const ts = nome.querySelectorAll('.t');
    const ult = ts[ts.length - 1];
    const d = parseFloat(ult?.style.getPropertyValue(inverso ? '--d2' : '--d')) || 0;
    nome.style.setProperty(inverso ? '--d2' : '--d', f2(d + .25) + 's');
  }
}

/* brasão gravado: as hachuras e os contornos são recortados por máscaras, para que nenhuma linha
   atravesse asas, cruz ou flor e a textura do papel continue visível por baixo */
const COSTELAS_G = 'M0 2 L120 -56 M0 2 L120 -14 M0 2 L92 6 M0 2 L58 14';
function brasaoGravado(id, peso = 1) {
  const h = 7, w = v => f2(v * peso);
  let roxo = '', negro = '';
  for (let k = -360; k <= 140; k += h) roxo += `M${k} 130 L${k + 250} -130 `;
  for (let y = -118; y <= 122; y += h) negro += `M0 ${y} H102 `;
  for (let x = h / 2; x <= 102; x += h) negro += `M${x} -122 V122 `;
  const pet = ROT5.map(a => `<path d="${BR.pet}" transform="rotate(${a})"/>`).join('');
  const asas = d => `<path d="${d}" transform="translate(-4 -44) scale(-.62 .62)"/><path d="${d}" transform="translate(4 -44) scale(.62)"/>`;
  const T = 'translate(0 -10) scale(1.1)', F = 'translate(0 8)';
  const tudo = '<rect x="-130" y="-150" width="260" height="300" fill="#fff"/>';
  const cruzM = (l) => `<g transform="${T}" fill="#000" stroke="#000" stroke-width="${w(l)}" stroke-linejoin="round"><path d="${BR.cruz}"/></g>`;
  const florM = (l) => `<g transform="${F}" fill="#000" stroke="#000" stroke-width="${w(l)}" stroke-linejoin="round">${pet}</g>`;
  const M = (n, c) => `<mask id="${id}-${n}" maskUnits="userSpaceOnUse" x="-130" y="-150" width="260" height="300">${c}</mask>`;
  return `
  ${M('h', `<path d="${BR.escudo}" fill="#fff"/>${cruzM(8)}<g transform="${T}" fill="#000" stroke="#000" stroke-width="${w(5)}">${asas(BR.asa)}</g>${florM(9)}<path d="${BR.gota}" fill="#000" stroke="#000" stroke-width="${w(6)}"/>`)}
  ${M('a', tudo + cruzM(7))}
  ${M('c', tudo + florM(8))}
  <clipPath id="${id}-e"><rect x="-102" y="-122" width="102" height="244"/></clipPath>
  <clipPath id="${id}-d"><rect x="0" y="-122" width="102" height="244"/></clipPath>
  <g mask="url(#${id}-h)" class="tracos" stroke-width="${w(.9)}" opacity=".5">
    <path d="${roxo}" clip-path="url(#${id}-e)"/><path d="${negro}" clip-path="url(#${id}-d)"/>
    <path d="M0 -120 V120" stroke-width="${w(1.3)}"/>
  </g>
  <g mask="url(#${id}-a)"><g transform="${T}" class="cheio" stroke="currentColor" stroke-width="${w(1.1)}" stroke-linejoin="round">${asas(BR.asa)}</g></g>
  <g transform="${T}" fill="none" style="stroke: var(--marfim)" stroke-width="${w(1.5)}" opacity=".85">${asas(COSTELAS_G)}</g>
  <g mask="url(#${id}-c)"><g transform="${T}" class="tracos" stroke-width="${w(2.4)}">
    <path d="${BR.cruz}"/><path d="${BR.topo}"/><path d="M-50 -51 H50 M0 -36 V60" stroke-width="${w(.8)}" opacity=".55"/>
  </g></g>
  <g transform="${F}">
    <g class="tracos" stroke-width="${w(2.2)}">${pet}</g>
    <g transform="rotate(36) scale(.6)" class="tracos" stroke-width="${w(2.6)}" style="fill: currentColor; fill-opacity: .2">${pet}</g>
    <circle r="7.5" class="cheio"/><circle r="3" style="fill: var(--marfim)"/>
  </g>
  <path d="${BR.gota}" fill="#8e1f2c" stroke="currentColor" stroke-width="${w(1.1)}"/>
  <path d="${BR.escudo}" class="tracos" stroke-width="${w(4.2)}"/>
  <path d="${BR.escudo}" class="tracos" stroke-width="${w(1.1)}" transform="scale(.9)"/>`;
}
/* cabeçalho "papelaria fina": brasão solto e reto, filete interrompido com floreios caligráficos */
function desenharMoldura() {
  const R = L.R, T = L.total, est = L.estreito, m = est ? 10 : 16, cx = R / 2;
  const k = est ? .62 : .78, ce = est ? .72 : 1;
  const yc = m + 86 * k, sb = .52 * k, yr = f2(yc + 8 * k);
  const abre = 102 * k, ponta = (est ? 30 : 54);
  const estrela = (x, y, rr) => {
    let d = '';
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 - Math.PI / 2, q = i % 2 ? rr * .3 : (i % 4 ? rr * .6 : rr); d += (i ? 'L' : 'M') + f2(x + Math.cos(a) * q) + ' ' + f2(y + Math.sin(a) * q); }
    return `<path class="cheio" d="${d}Z"/>`;
  };
  const canto = `<g class="tracos"><path stroke-width="1" d="M0 26 V0 H26"/><path stroke-width=".6" d="M6 34 C6 15 15 6 34 6"/></g><circle class="cheio" r="2.4"/>`;
  const floreio = (x, d) => `<g transform="translate(${f2(x)} ${yr}) scale(${f2(d * k)} ${f2(k)})" class="tracos">
      <path stroke-width="${f2(1.5 / k)}" d="M0 0 C-10 0 -18 -12 -10 -18 C-3 -23 6 -14 -2 -8 C-7 -4 -12 -9 -8 -12"/>
      <path stroke-width="${f2(1 / k)}" d="M0 0 C-14 4 -26 14 -40 6 C-48 1 -44 -6 -38 -4"/></g>`;
  const c0 = m + 12;
  const yb = T - m - 26;
  moldura.setAttribute('width', R); moldura.setAttribute('height', T);
  moldura.setAttribute('viewBox', `0 0 ${R} ${T}`);
  moldura.innerHTML = `
    <rect class="tracos" x="${m}" y="${m}" width="${R - 2 * m}" height="${T - 2 * m}" stroke-width="1.1"/>
    <g transform="translate(${c0} ${c0}) scale(${ce})">${canto}</g>
    <g transform="translate(${R - c0} ${c0}) scale(${-ce} ${ce})">${canto}</g>
    <g transform="translate(${c0} ${T - c0}) scale(${ce} ${-ce})">${canto}</g>
    <g transform="translate(${R - c0} ${T - c0}) scale(${-ce} ${-ce})">${canto}</g>
    <g class="tracos">
      <path stroke-width="1.2" d="M${ponta + 4} ${yr} H${f2(cx - abre)} M${f2(cx + abre)} ${yr} H${R - ponta - 4}"/>
      <path stroke-width=".55" d="M${ponta + 40 * ce} ${f2(+yr + 5 * k)} H${f2(cx - abre - 8 * k)} M${f2(cx + abre + 8 * k)} ${f2(+yr + 5 * k)} H${R - ponta - 40 * ce}"/>
      <path stroke-width=".9" d="M${m + 2.5} ${T / 2 - 9} l3 9 l-3 9 l-3 -9z M${R - m - 2.5} ${T / 2 - 9} l3 9 l-3 9 l-3 -9z"/>
      <path stroke-width=".9" d="M${f2(cx - 30 * k)} ${f2(yc + 82 * k)} H${f2(cx - 12 * k)} M${f2(cx + 12 * k)} ${f2(yc + 82 * k)} H${f2(cx + 30 * k)}"/>
      <path stroke-width=".9" d="M${cx - 44} ${yb} H${cx - 14} M${cx + 14} ${yb} H${cx + 44}"/>
    </g>
    <circle class="cheio" cx="${ponta}" cy="${yr}" r="2.2"/><circle class="cheio" cx="${R - ponta}" cy="${yr}" r="2.2"/>
    ${floreio(cx - abre, -1)}${floreio(cx + abre, 1)}
    <g transform="translate(${f2(cx)} ${f2(yc)}) scale(${f2(sb)})">${brasaoGravado('M-br', 1.45)}</g>
    ${estrela(cx, yc - 76 * k, est ? 4.5 : 6)}
    ${estrela(cx, yc + 82 * k, est ? 4 : 5)}
    ${estrela(cx, yb, 6)}`;
}
function recortarBorda() {
  const R = L.R, T = L.total, r = rng(R * 7 + T), pts = [];
  const j = () => r() * 1.7;
  for (let x = 0; x <= R; x += 11) pts.push([x, j()]);
  for (let y = 11; y <= T; y += 11) pts.push([R - j(), y]);
  for (let x = R - 11; x >= 0; x -= 11) pts.push([x, T - j()]);
  for (let y = T - 11; y > 0; y -= 11) pts.push([j(), y]);
  papelEl.style.clipPath = `polygon(${pts.map(p => `${f2(p[0])}px ${f2(p[1])}px`).join(',')})`;
}
function aplicarFolha() {
  const est = L.estreito;
  folha.style.setProperty('--R', L.R + 'px');
  folha.style.setProperty('--p', L.p + 'px');
  folha.style.setProperty('--topo', (est ? 132 : 164) + 'px');
  folha.style.setProperty('--lado', (est ? 24 : 58) + 'px');
  folha.style.setProperty('--base', (est ? 58 : 70) + 'px');
  folha.style.setProperty('--fs', (est ? 17.5 : 19.5) + 'px');
  const H = Math.max(camadaPublica.offsetHeight, camadaOculta.offsetHeight);
  /* painéis iguais que cobrem o conteúdo sem sobra */
  L.n = Math.max(2, Math.ceil(H / (L.R / 1.6) - .12));
  L.p = Math.ceil(H / L.n);
  L.sEnv = (L.envW * .88) / L.R;
  folha.style.setProperty('--p', L.p + 'px');
  L.total = L.n * L.p;
  folha.style.setProperty('--total', L.total + 'px');
  desenharMoldura();
  recortarBorda();
  posicionarMarca();
}
function alturaFolha(h) { L.h = h; folha.style.setProperty('--h', h + 'px'); }
function posicionarMarca() {
  const nome = camadaPublica.querySelector('.nome');
  if (!nome) return;
  /* offsets sem transformações: soma os offsetTop/Left até a camada */
  let x = 0, y = 0, el = nome;
  while (el && el !== camadaPublica) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
  const gap = L.estreito ? 24 : 30;
  marca.style.left = f2(x - gap) + 'px';
  marca.style.top = f2(y + nome.offsetHeight * .48) + 'px';
}

/* ───────────────────── envelope no palco ───────────────────── */
function aplicarEnvelope() {
  envelope.style.setProperty('--envW', L.envW + 'px');
  envelope.style.setProperty('--envH', L.envH + 'px');
  lacreBtn.style.setProperty('--seloD', L.seloD + 'px');
  lacreBtn.style.left = (L.envW / 2) + 'px';
  lacreBtn.style.top = f2(L.envH * G.seloY / 690) + 'px';
}
let puxar = 0, inclinar = 0;
function posicionarFolhaEnvelope() {
  if (folha.parentNode !== vagaEnvelope) return;
  const s = L.sEnv;
  const x = (L.envW - L.R * s) / 2, y = L.envH * .06;
  folha.style.transform = `translate(${f2(x)}px, ${f2(y - puxar)}px) rotate(${f2(inclinar)}deg) scale(${f2(s)})`;
  folha.style.setProperty('--sd', f2(4 + puxar * .1) + 'px');
}

/* ───────────────────── vela ───────────────────── */
const V = { x: 0, y: 0, movida: false, arr: null, vx: 0, tilt: 0, inclina: 0, mudou: true };
function chama() { return { x: V.x, y: V.y - 1.183 * L.velaL }; }
function limitarVela() {
  const l = L.velaL;
  V.x = clamp(V.x, l * .5, L.vw - l * .5);
  V.y = clamp(V.y, 1.3 * l + 6, L.vh - .22 * l);
}
function posicionarVela() {
  limitarVela();
  const l = L.velaL;
  vela.style.setProperty('--velaL', l + 'px');
  vela.style.transform = `translate3d(${f2(V.x - l / 2)}px, ${f2(V.y - 1.767 * l)}px, 0)`;
  V.mudou = true;
}
function lugarVela(fase) {
  const l = L.velaL;
  if (fase === 'envelope') {
    const esq = L.vw / 2 - L.envW / 2;
    if (esq > l * 1.6) { V.x = esq - l * .7; V.y = L.vh / 2 + L.envH * .42; }
    else { V.x = l * .62 + 6; V.y = Math.max(1.4 * l + 10, L.vh / 2 - L.envH / 2 - 26); }
  } else {
    const dir = L.vw - (L.vw / 2 + L.R / 2);
    if (dir > l * 1.9) { V.x = L.vw / 2 + L.R / 2 + Math.min(dir / 2, l * 1.25); V.y = L.vh * .74; }
    else { V.x = L.vw - l * .55 - 4; V.y = L.vh - l * .22 - 6; }
  }
  limitarVela();
}
function moverVelaPara(x, y, dur = 900) {
  const x0 = V.x, y0 = V.y;
  return tween(reduzido ? 0 : dur, k => { V.x = lerp(x0, x, k); V.y = lerp(y0, y, k); posicionarVela(); }, ease.inOut).promessa;
}
vela.addEventListener('pointerdown', e => {
  if (e.button > 0 || estado === E.CARREGANDO) return;
  e.preventDefault();
  vela.setPointerCapture(e.pointerId);
  V.arr = { id: e.pointerId, ox: e.clientX - V.x, oy: e.clientY - V.y, ux: e.clientX, ut: performance.now() };
  vela.classList.add('segurando');
});
vela.addEventListener('pointermove', e => {
  if (!V.arr || e.pointerId !== V.arr.id) return;
  const agora = performance.now(), dt = Math.max(8, agora - V.arr.ut);
  V.vx = lerp(V.vx, (e.clientX - V.arr.ux) / dt * 16, .35);
  V.arr.ux = e.clientX; V.arr.ut = agora;
  V.x = e.clientX - V.arr.ox; V.y = e.clientY - V.arr.oy;
  V.movida = true;
  posicionarVela();
  interagiu();
});
function soltarVela(e) {
  if (!V.arr || (e && e.pointerId !== V.arr.id)) return;
  V.arr = null; vela.classList.remove('segurando');
}
vela.addEventListener('pointerup', soltarVela);
vela.addEventListener('pointercancel', soltarVela);
vela.addEventListener('lostpointercapture', soltarVela);
vela.addEventListener('keydown', e => {
  const passo = e.shiftKey ? 48 : 16;
  const mapa = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const m = mapa[e.key]; if (!m) return;
  e.preventDefault();
  V.x += m[0] * passo; V.y += m[1] * passo; V.vx = m[0] * 3; V.movida = true;
  posicionarVela(); interagiu();
});

/* ───────────────────── luz e exploração (laço por quadro) ───────────────────── */
const X = { prog: 0, ms: 0, ultimo: 0, quadro: 0, ativo: false, ultMx: '', fv: 0 };
function quadro(t) {
  const dt = Math.min(200, t - (X.ultimo || t)); X.ultimo = t; X.quadro++;
  const f = reduzido ? 1 : 1 + .045 * ruido1(t * .0021) + .025 * ruido1(t * .0067 + 9) + .012 * Math.sin(t * .019);
  const c = chama();

  /* inclinação da vela e da chama pelo movimento */
  V.vx *= .86;
  V.tilt = lerp(V.tilt, clamp(V.vx * .9, -8, 8), .2);
  V.inclina = lerp(V.inclina, clamp(-V.vx * 2.2, -20, 20), .18);
  if (!reduzido) {
    vela.style.setProperty('--tilt', f2(V.tilt) + 'deg');
    vela.style.setProperty('--inclina', f2(V.inclina) + 'deg');
    vela.style.setProperty('--aura', f2(clamp(.85 + (f - 1) * 4, .55, 1.1)));
  }

  if (X.quadro % 2 === 0 || V.mudou) {
    luz.style.setProperty('--lx', f2(c.x) + 'px');
    luz.style.setProperty('--ly', f2(c.y) + 'px');
    luz.style.setProperty('--lf', f2(f));
  }

  if (V.mudou) {
    V.mudou = false;
    /* sombras projetadas a partir da vela */
    const alvo = corpo.classList.contains('lendo') ? { x: L.vw / 2, y: L.vh * .45 } : { x: L.vw / 2, y: L.vh / 2 };
    let dx = alvo.x - c.x, dy = alvo.y - c.y; const d = Math.hypot(dx, dy) || 1;
    const mag = clamp(d / 650, .35, 1);
    raiz.style.setProperty('--sx', f2(dx / d * mag));
    raiz.style.setProperty('--sy', f2(dy / d * mag));
    if (!corpo.classList.contains('lendo')) {
      const r = lacreBtn.getBoundingClientRect();
      const lx = c.x - (r.left + r.width / 2), ly = c.y - (r.top + r.height / 2), m = Math.hypot(lx, ly) || 1;
      Lacre.luzDe(lx / m, ly / m);
    }
  }

  if (corpo.classList.contains('lendo')) atualizarFolhaLuz(c, f, dt);
  requestAnimationFrame(quadro);
}
function atualizarFolhaLuz(c, f, dt) {
  const r = corpoFolha.getBoundingClientRect();
  /* o halo sobe um pouco acima da chama: o corpo da vela (e o dedo) não cobrem o trecho revelado */
  const mx = c.x - r.left, my = c.y - r.top - L.raioLuz * .32;
  const perto = mx > -L.raioLuz * 1.6 && my > -L.raioLuz * 1.6 && mx < r.width + L.raioLuz * 1.6 && my < r.height + L.raioLuz * 1.6;
  const explorar = folha.classList.contains('explorando');
  const alvoMs = explorar && (V.movida || !L.mobile) ? 1 : 0;
  X.ms = lerp(X.ms, alvoMs, .08);
  if (perto && (X.quadro % 2 === 0)) {
    const chave = `${Math.round(mx)}|${Math.round(my)}|${f.toFixed(3)}|${X.ms.toFixed(2)}`;
    if (chave !== X.ultMx) {
      X.ultMx = chave;
      corpoFolha.style.setProperty('--mx', f2(mx) + 'px');
      corpoFolha.style.setProperty('--my', f2(my) + 'px');
      corpoFolha.style.setProperty('--mr', f2(L.raioLuz * f) + 'px');
      corpoFolha.style.setProperty('--ms', f2(X.ms));
    }
  } else if (!perto && X.ultMx !== 'longe') {
    X.ultMx = 'longe';
    corpoFolha.style.setProperty('--mx', '-9999px');
    corpoFolha.style.setProperty('--my', '-9999px');
  }

  /* a marca junto à assinatura: dois segundos de chama próxima */
  if (estado === E.LEITURA || (estado === E.REVELADO && folha.dataset.modo === 'publico')) {
    const rm = marca.getBoundingClientRect();
    const d = Math.hypot(c.x - (rm.left + rm.width / 2), c.y - (rm.top + rm.height / 2));
    const raioMarca = L.mobile ? 52 : 64;
    const tempo = estado === E.REVELADO ? 1000 : 2000;
    if (d < raioMarca && X.ms > .5) {
      if (X.prog === 0) sfx.dobra();
      X.prog = Math.min(1, X.prog + dt / tempo);
    } else X.prog = Math.max(0, X.prog - dt / 2600);
    marca.style.setProperty('--p', f2(X.prog));
    const mx2 = rm.left + rm.width / 2 - r.left, my2 = rm.top + rm.height / 2 - r.top;
    fibrasRevelacao.style.setProperty('--gx', f2(mx2) + 'px');
    fibrasRevelacao.style.setProperty('--gy', f2(my2) + 'px');
    fibrasRevelacao.style.setProperty('--gr', f2(X.prog * (L.mobile ? 110 : 150)) + 'px');
    fibrasRevelacao.style.setProperty('--go', f2(X.prog * .8));
    if (X.prog >= 1) {
      X.prog = 0; marca.style.setProperty('--p', '0');
      if (estado === E.LEITURA) revelar(); else alternar('oculto');
    }
  }
}

/* ───────────────────── fluxo 1: quebrar o selo ───────────────────── */
let toques = 0, ultimoToque = 0;
lacreBtn.addEventListener('click', e => {
  if (estado !== E.SELADO && estado !== E.TRINCADO) return;
  const agora = performance.now();
  if (agora - ultimoToque < 240 || toques >= 3) return;
  ultimoToque = agora;
  let off = { x: 0, y: 0 };
  if (e.detail > 0 && e.clientX) {
    const r = lacreBtn.getBoundingClientRect();
    off = { x: (e.clientX - (r.left + r.width / 2)) / r.width * 220, y: (e.clientY - (r.top + r.height / 2)) / r.height * 220 };
  }
  quebrar(++toques, off);
});
function golpe() {
  lacreBtn.classList.remove('golpe'); void lacreBtn.offsetWidth; lacreBtn.classList.add('golpe');
}
async function quebrar(n, off) {
  interagiu();
  if (n === 1) {
    Lacre.gerarRaios(off);
    Lacre.fendas(1); golpe(); sfx.racha(1);
    mudarEstado(E.TRINCADO);
    lacreBtn.setAttribute('aria-label', 'O selo trincou. Pressione de novo.');
    anunciar('O selo trincou.');
  } else if (n === 2) {
    Lacre.fendas(2); golpe(); sfx.racha(2);
    if (!reduzido) Lacre.svg.style.transform = 'translate(1.2px, .8px) rotate(1.8deg)';
    lacreBtn.setAttribute('aria-label', 'A cera cede. Pressione mais uma vez.');
    anunciar('A cera cede.');
  } else {
    mudarEstado(E.ABERTO);
    Lacre.fendas(3); sfx.racha(3);
    const url = Lacre.imagem();
    const img = new Image(); img.src = url;
    try { await img.decode(); } catch {}
    criarFragmentos(url, !reduzido);
    lacreBtn.style.visibility = 'hidden';
    lacreBtn.blur();
    guardar.por('quebrado', '1');
    await espera(reduzido ? 100 : 420);
    await abrirAba(true);
    prepararExtracao();
  }
}
async function abrirAba(animar) {
  if (!animar || reduzido) {
    aba.style.transform = 'rotateX(180deg)'; aba.classList.add('atras');
    return;
  }
  sfx.aba();
  const a = aba.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(180deg)' }],
    { duration: 950, easing: 'cubic-bezier(.5,.05,.25,1)', fill: 'forwards' });
  setTimeout(() => aba.classList.add('atras'), 470);
  await a.finished;
  aba.style.transform = 'rotateX(180deg)'; a.cancel();
}

/* ───────────────────── fluxo 2: retirar a carta ───────────────────── */
let arrasto = null, molaTw = null, completando = false;
function prepararExtracao() {
  folha.classList.add('puxavel');
  folha.setAttribute('role', 'button');
  folha.setAttribute('tabindex', '0');
  folha.setAttribute('aria-label', 'Carta dentro do envelope. Arraste para cima para retirá-la, ou pressione Enter.');
  folha.focus({ preventScroll: true });
  anunciar('O selo se partiu e a aba se abriu.');
  if (!reduzido) {
    /* a carta se acomoda um pouco para cima, convidando o gesto */
    tween(520, k => { puxar = Math.sin(k * Math.PI) * 10; posicionarFolhaEnvelope(); }, t => t);
  }
}
const limiar = () => .42 * L.p * L.sEnv;
const puxarTotal = () => L.envH * .06 + L.p * L.sEnv + 26;
function resistencia(b) {
  if (b <= 0) return Math.max(-6, b * .15);
  return Math.min(puxarTotal() * 1.05, b * (.55 + .4 * Math.min(1, b / 70)));
}
folha.addEventListener('pointerdown', e => {
  if (!folha.classList.contains('puxavel') || completando || e.button > 0) return;
  e.preventDefault();
  molaTw?.parar();
  folha.setPointerCapture(e.pointerId);
  const agora = performance.now();
  arrasto = { id: e.pointerId, x0: e.clientX, y0: e.clientY, p0: puxar, b0: puxar, t0: agora, mov: 0, uy: e.clientY, ut: agora };
  folha.classList.add('segurando');
  mudarEstado(E.EXTRAINDO);
  sfx.arrastoIniciar();
  interagiu();
});
folha.addEventListener('pointermove', e => {
  if (!arrasto || e.pointerId !== arrasto.id) return;
  const dx = e.clientX - arrasto.x0, dy = arrasto.y0 - e.clientY;
  arrasto.mov = Math.max(arrasto.mov, Math.hypot(dx, dy));
  puxar = resistencia(arrasto.p0 + dy);
  inclinar = clamp(dx * .03, -3, 3) * clamp(puxar / 40, 0, 1);
  posicionarFolhaEnvelope();
  const agora = performance.now(), v = Math.abs(e.clientY - arrasto.uy) / Math.max(8, agora - arrasto.ut) * 1000;
  arrasto.uy = e.clientY; arrasto.ut = agora;
  sfx.arrasto(v);
});
function soltarCarta(e, cancelado) {
  if (!arrasto || (e && e.pointerId !== arrasto.id)) return;
  const toque = !cancelado && arrasto.mov < 7 && performance.now() - arrasto.t0 < 450;
  arrasto = null;
  folha.classList.remove('segurando');
  sfx.arrastoParar();
  if (toque || (!cancelado && puxar >= limiar())) completarExtracao();
  else voltarCarta();
}
folha.addEventListener('pointerup', e => soltarCarta(e, false));
folha.addEventListener('pointercancel', e => soltarCarta(e, true));
folha.addEventListener('lostpointercapture', e => soltarCarta(e, true));
folha.addEventListener('keydown', e => {
  if (!folha.classList.contains('puxavel') || completando) return;
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); completarExtracao(); }
  else if (e.key === 'ArrowUp') {
    e.preventDefault(); molaTw?.parar();
    puxar = Math.min(puxarTotal(), puxar + 22); posicionarFolhaEnvelope();
    if (puxar >= limiar()) completarExtracao();
  }
});
function voltarCarta() {
  mudarEstado(E.ABERTO);
  const p0 = puxar, i0 = inclinar;
  molaTw = tween(reduzido ? 0 : 460, k => { puxar = lerp(p0, 0, k); inclinar = lerp(i0, 0, k); posicionarFolhaEnvelope(); }, ease.outBack);
}
async function completarExtracao() {
  if (completando) return;
  completando = true; emAnimacao = true;
  molaTw?.parar();
  folha.classList.remove('puxavel', 'segurando');
  folha.removeAttribute('role'); folha.removeAttribute('aria-label'); folha.removeAttribute('tabindex');
  mudarEstado(E.EXTRAINDO);
  sfx.papel();
  const p0 = puxar, i0 = inclinar;
  await tween(reduzido ? 0 : 430, k => { puxar = lerp(p0, puxarTotal(), k); inclinar = lerp(i0, 0, k); posicionarFolhaEnvelope(); }, ease.inOut).promessa;

  /* FLIP: a mesma folha passa do envelope para a mesa de leitura */
  const r0 = folha.getBoundingClientRect();
  const c0 = { x: r0.left + r0.width / 2, y: r0.top + r0.height / 2 };
  corpo.classList.add('lendo');
  luz.style.setProperty('--escuro', '.88');
  vagaLeitura.appendChild(folha);
  folha.style.transform = ''; folha.style.removeProperty('--sd');
  leitura.scrollTop = 0;
  const r1 = folha.getBoundingClientRect();
  const c1 = { x: r1.left + r1.width / 2, y: r1.top + r1.height / 2 };
  lugarVela('leitura');
  const vx = V.x, vy = V.y;
  V.x = lerp(V.x, vx, 0); moverVelaPara(vx, vy, 1100);
  if (!reduzido) {
    folha.style.transformOrigin = '50% 50%';
    const a = folha.animate([
      { transform: `translate(${f2(c0.x - c1.x)}px, ${f2(c0.y - c1.y)}px) rotate(-3.5deg) scale(${f2(L.sEnv)})` },
      { transform: `translate(${f2((c0.x - c1.x) * .28)}px, ${f2((c0.y - c1.y) * .28 - 26)}px) rotate(-1deg) scale(${f2(lerp(L.sEnv, 1, .8))})`, offset: .62 },
      { transform: 'none' },
    ], { duration: 950, easing: 'cubic-bezier(.3,.7,.2,1)' });
    await a.finished;
    folha.style.transformOrigin = '';
  }
  await desdobrar();
  emAnimacao = false;
  if (pendenteRelayout) relayout();
  anunciar('A carta foi retirada do envelope.');
  await escrever(camadaPublica, 4.4);
  iniciarExploracao();
}
async function desdobrar() {
  if (reduzido) { alturaFolha(L.total); return; }
  const n = L.n, dur = clamp(1150 / (n - 1), 150, 380);
  dobraEl.style.display = 'block';
  for (let i = 1; i < n; i++) {
    dobraEl.style.top = (i * L.p) + 'px';
    const a = dobraEl.animate([
      { transform: 'rotateX(178deg)', filter: 'brightness(.9)' },
      { transform: 'rotateX(90deg)', filter: 'brightness(1.1)', offset: .5 },
      { transform: 'rotateX(0deg)', filter: 'brightness(1)' },
    ], { duration: dur, easing: 'cubic-bezier(.45,.1,.35,1)' });
    sfx.dobra();
    await a.finished;
    alturaFolha((i + 1) * L.p);
  }
  dobraEl.style.display = 'none';
}

/* ───────────────────── fluxo 3: a tinta se forma ───────────────────── */
let pularResolver = null;
function pularEscrita() { pularResolver?.(); }
pular.addEventListener('click', pularEscrita);
async function escrever(camada, total) {
  mudarEstado(estado === E.REVELANDO ? E.REVELANDO : E.ESCREVENDO);
  if (reduzido) {
    camada.classList.add('escrito');
    camada.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
    await espera(420);
    return;
  }
  distribuirTinta(camada, total);
  camada.classList.remove('latente', 'escrito');
  void camada.offsetWidth;
  camada.classList.add('escrevendo');
  sfx.tinta();
  pular.hidden = false;
  if (!document.activeElement || document.activeElement === corpo) pular.focus({ preventScroll: true });
  await Promise.race([espera(total * 1000 + 1100), new Promise(r => { pularResolver = r; })]);
  pularResolver = null;
  const tinhaFoco = document.activeElement === pular;
  pular.hidden = true;
  if (tinhaFoco) { camada.tabIndex = -1; camada.focus({ preventScroll: true }); }
  camada.classList.remove('escrevendo');
  camada.classList.add('escrito');
}
folha.addEventListener('click', () => { if (pularResolver) pularEscrita(); });

/* ───────────────────── fluxo 4: explorar com a vela ───────────────────── */
function iniciarExploracao() {
  marca.tabIndex = 0;
  folha.dataset.modo = 'publico';
  folha.classList.add('explorando');
  camadaOculta.classList.add('latente');
  mudarEstado(E.LEITURA);
  guardar.por('estado', 'lido');
  btnReiniciar.hidden = false;
  ociosoDesde = performance.now();
}
marca.addEventListener('click', async e => {
  e.stopPropagation();
  if (!(estado === E.LEITURA || estado === E.REVELADO)) return;
  interagiu();
  /* traz a marca para a altura confortável da tela e aproxima a chama;
     a revelação acontece pelo tempo de proximidade, não pelo clique */
  const r0 = marca.getBoundingClientRect();
  const antes = leitura.scrollTop, maximo = leitura.scrollHeight - leitura.clientHeight;
  const destino = clamp(antes + r0.top + r0.height / 2 - L.vh * .45, 0, Math.max(0, maximo));
  /* posição final da marca calculada de antemão: não depende do fim da rolagem suave */
  const r = { left: r0.left, width: r0.width, height: r0.height, top: r0.top - (destino - antes) };
  if (Math.abs(destino - antes) > 30) leitura.scrollTo({ top: destino, behavior: reduzido ? 'auto' : 'smooth' });
  const alvoX = r.left + r.width / 2 + (L.mobile ? 6 : 10), alvoY = r.top + r.height / 2 + 1.183 * L.velaL + 6;
  V.movida = true;
  moverVelaPara(alvoX, alvoY, 800);
});

/* ───────────────────── fluxo 5: o segredo ───────────────────── */
async function revelar() {
  if (estado !== E.LEITURA) return;
  mudarEstado(E.REVELANDO);
  folha.classList.add('revelando');
  sfx.magia();
  /* o brilho violeta corre pelas fibras e pelos ornamentos */
  const go0 = parseFloat(fibrasRevelacao.style.getPropertyValue('--go')) || .8;
  tween(reduzido ? 0 : 2600, k => {
    fibrasRevelacao.style.setProperty('--gr', f2(lerp(L.mobile ? 110 : 150, L.total * 1.3, k)) + 'px');
    fibrasRevelacao.style.setProperty('--go', f2(k < .55 ? lerp(go0, .7, k / .55) : lerp(.7, 0, (k - .55) / .45)));
  }, ease.inOut);
  if (!reduzido) {
    distribuirTinta(camadaPublica, .9, true);
    camadaPublica.classList.add('desvanecendo');
    await espera(1500);
  }
  folha.dataset.modo = 'oculto';
  camadaPublica.classList.remove('desvanecendo');
  /* o segredo começa no alto da folha: leva o leitor até lá */
  leitura.scrollTo({ top: 0, behavior: reduzido ? 'auto' : 'smooth' });
  camadaOculta.classList.add('plena');
  acessibilidadeModo('oculto');
  await escrever(camadaOculta, 5);
  camadaOculta.classList.add('latente');
  folha.classList.remove('revelando');
  mudarEstado(E.REVELADO);
  guardar.por('estado', 'revelado');
  guardar.por('modo', 'oculto');
  fita.hidden = false;
  atualizarFita();
  anunciar('Uma mensagem oculta se revelou à luz da vela.');
}
function acessibilidadeModo(modo) {
  const pub = modo === 'publico';
  camadaPublica.toggleAttribute('inert', !pub);
  camadaPublica.setAttribute('aria-hidden', pub ? 'false' : 'true');
  camadaOculta.toggleAttribute('inert', pub);
  camadaOculta.setAttribute('aria-hidden', pub ? 'true' : 'false');
  marca.tabIndex = pub ? 0 : -1;
}
function alternar(modo) {
  if (estado !== E.REVELADO) return;
  folha.dataset.modo = modo;
  camadaOculta.classList.toggle('plena', modo === 'oculto');
  acessibilidadeModo(modo);
  guardar.por('modo', modo);
  atualizarFita();
  if (modo === 'oculto') sfx.dobra();
}
function atualizarFita() {
  const oc = folha.dataset.modo === 'oculto';
  verConvite.setAttribute('aria-pressed', oc ? 'false' : 'true');
  verOculta.setAttribute('aria-pressed', oc ? 'true' : 'false');
}
verConvite.addEventListener('click', () => { interagiu(); alternar('publico'); });
verOculta.addEventListener('click', () => { interagiu(); alternar('oculto'); });

/* ───────────────────── controles ───────────────────── */
volumeEl.value = Math.round(Som.vol * 100);
volumeEl.addEventListener('input', () => {
  Som.vol = volumeEl.value / 100;
  guardar.porLocal('volume', String(Som.vol));
  if (!Som.iniciado) iniciarAudio();
  aplicarVolume(.12);
});
btnSom.addEventListener('click', () => {
  Som.mudo = !Som.mudo;
  guardar.porLocal('mudo', Som.mudo ? '1' : '0');
  if (!Som.iniciado) iniciarAudio();
  else if (!Som.mudo && musica.paused && Som.musicaOk) tocarMusica();
  aplicarVolume(.3);
});
btnReiniciar.addEventListener('click', () => {
  guardar.limpar();
  try { sessionStorage.removeItem('limiar:quebrado'); } catch {}
  location.reload();
});
addEventListener('keydown', e => {
  if ((e.key === 'Escape' || e.key === 'Enter') && pularResolver && document.activeElement !== pular) { e.preventDefault(); pularEscrita(); }
});

/* ───────────────────── pistas por ociosidade ───────────────────── */
let ociosoDesde = performance.now();
const dicasVistas = {};
function interagiu() { ociosoDesde = performance.now(); esconderDica(); }
addEventListener('pointerdown', () => { iniciarAudio(); interagiu(); }, { capture: true, passive: true });
addEventListener('keydown', () => { iniciarAudio(); interagiu(); }, { capture: true });
leitura.addEventListener('scroll', () => { ociosoDesde = performance.now(); }, { passive: true });
function mostrarDica(texto, x, y) {
  dica.textContent = texto;
  dica.style.left = f2(clamp(x, 120, L.vw - 120)) + 'px';
  dica.style.top = f2(clamp(y, 12, L.vh - 60)) + 'px';
  dica.classList.add('visivel');
  clearTimeout(mostrarDica.t);
  mostrarDica.t = setTimeout(esconderDica, 5200);
}
function esconderDica() { dica.classList.remove('visivel'); }
let ultimaCintila = 0;
setInterval(() => {
  const ocio = (performance.now() - ociosoDesde) / 1000;
  if (estado === E.SELADO && ocio > 9 && !dicasVistas.selo) {
    dicasVistas.selo = true;
    const r = envelope.getBoundingClientRect();
    mostrarDica('Toque o selo de cera', r.left + r.width / 2, r.bottom + 18);
  } else if (estado === E.ABERTO && !completando) {
    if (ocio > 5 && !reduzido && performance.now() - ultimaCintila > 5200) {
      ultimaCintila = performance.now();
      tween(700, k => { puxar = Math.sin(k * Math.PI) * 12; posicionarFolhaEnvelope(); }, t => t);
    }
    if (ocio > 11 && !dicasVistas.carta) {
      dicasVistas.carta = true;
      const r = envelope.getBoundingClientRect();
      mostrarDica('Puxe a carta para cima', r.left + r.width / 2, r.bottom + 18);
    }
  } else if (estado === E.LEITURA) {
    if (ocio > 12 && performance.now() - ultimaCintila > 7000) {
      ultimaCintila = performance.now();
      marca.classList.remove('cintila'); void marca.offsetWidth; marca.classList.add('cintila');
      /* um traço violeta aflora nas fibras sob a luz */
      fibrasPista.style.setProperty('--fv', '.55');
      setTimeout(() => fibrasPista.style.setProperty('--fv', '0'), 1300);
    }
    if (ocio > 24 && (!dicasVistas.vela || performance.now() - dicasVistas.vela > 60000)) {
      dicasVistas.vela = performance.now();
      const c = chama();
      mostrarDica('Aproxime a vela do papel', c.x, c.y - (L.mobile ? 96 : 120));
    }
  }
}, 1000);

/* ───────────────────── redimensionamento ───────────────────── */
let pendenteRelayout = false, rz = 0, larguraAnterior = 0;
addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(relayout); });
function relayout() {
  if (estado === E.CARREGANDO || innerWidth < 50 || innerHeight < 50) return;
  if (emAnimacao) { pendenteRelayout = true; return; }
  pendenteRelayout = false;
  const larg = innerWidth;
  medir();
  if (larg !== larguraAnterior) {
    larguraAnterior = larg;
    if (arrasto) { arrasto = null; folha.classList.remove('segurando'); sfx.arrastoParar(); puxar = 0; inclinar = 0; if (estado === E.EXTRAINDO) mudarEstado(E.ABERTO); }
    aplicarEnvelope();
    construirEnvelope();
    aplicarFolha();
    alturaFolha(corpo.classList.contains('lendo') ? L.total : L.p);
    posicionarFolhaEnvelope();
    if (fragmentos) criarFragmentos(Lacre.imagem(), false);
  }
  posicionarVela();
}

/* ───────────────────── início ───────────────────── */
async function iniciar() {
  /* painel oculto ou aba em segundo plano: espera a janela ter tamanho */
  while (innerWidth < 50 || innerHeight < 50) await espera(120);
  medir();
  larguraAnterior = innerWidth;
  if (OCULTO) camadaOculta.innerHTML = decodificar(OCULTO);
  envolverPalavras(camadaPublica);
  envolverPalavras(camadaOculta);
  marca.tabIndex = -1;          /* só entra na ordem de foco quando a carta estiver na mesa */
  const d = marca.querySelector('.marca-desenho');
  const v = d.cloneNode(true); v.setAttribute('class', 'marca-violeta'); d.after(v);

  vagaEnvelope.appendChild(folha);
  const [papel, fibrasV, negro] = await Promise.all([texturaPapel(), texturaFibrasVioleta(), texturaNegra()]);
  folha.style.setProperty('--papel', `url("${papel}")`);
  folha.style.setProperty('--fibras', `url("${fibrasV}")`);
  urlNegro = negro;

  await Promise.race([document.fonts?.ready ?? Promise.resolve(), espera(2500)]);
  aplicarEnvelope();
  construirEnvelope();
  Lacre.montar();
  aplicarFolha();
  alturaFolha(L.p);
  posicionarFolhaEnvelope();
  aplicarVolume(0);

  const salvo = guardar.ler('estado');
  if (salvo === 'lido' || salvo === 'revelado') restaurar(salvo);
  else {
    lugarVela('envelope');
    posicionarVela();
    mudarEstado(E.SELADO);
  }
  requestAnimationFrame(quadro);
}
/* volta direto à leitura, preservando a descoberta durante a sessão */
function restaurar(salvo) {
  Lacre.gerarRaios({ x: 4, y: -3 });
  Lacre.fendas(3);
  criarFragmentos(Lacre.imagem(), false);
  lacreBtn.style.visibility = 'hidden';
  abrirAba(false);
  corpo.classList.add('lendo');
  luz.style.setProperty('--escuro', '.88');
  vagaLeitura.appendChild(folha);
  folha.style.transform = '';
  alturaFolha(L.total);
  camadaPublica.classList.add('escrito');
  camadaOculta.classList.add('latente');
  folha.dataset.modo = 'publico';
  folha.classList.add('explorando');
  marca.tabIndex = 0;
  btnReiniciar.hidden = false;
  if (salvo === 'revelado') {
    mudarEstado(E.REVELADO);
    const modo = guardar.ler('modo') === 'oculto' ? 'oculto' : 'publico';
    folha.dataset.modo = modo;
    camadaOculta.classList.toggle('plena', modo === 'oculto');
    acessibilidadeModo(modo);
    fita.hidden = false;
    atualizarFita();
  } else mudarEstado(E.LEITURA);
  lugarVela('leitura');
  posicionarVela();
  V.movida = !L.mobile;
}

iniciar();

/* gancho de teste (só leitura de estado) */
window.__limiar = { get estado() { return estado; }, L, V, chama };
})();
