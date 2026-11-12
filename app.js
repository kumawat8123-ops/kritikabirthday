/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  EDIT THIS SECTION ONLY — all birthday content lives right here. ║
  ╚══════════════════════════════════════════════════════════════════╝
*/
const SITE_CONFIG = {
  /* ═══════════════════ 🎵 SONG YAHAN CHANGE KARO 🎵 ═══════════════════
     1. Apna gaana (.mp3) "music" folder mein daalo
     2. Neeche file ka naam likho (exact naam, spelling same honi chahiye)
     Agar file nahi mili to chhoti si default tune bajegi.
     ════════════════════════════════════════════════════════════════ */
  music: {
    file: "music/song.mp3",   // ← YAHAN apne gaane ka naam likho
    volume: 0.8,              // 0 se 1 tak (1 = full volume)
    startAt: 0                // gaana kitne seconds se shuru ho (e.g. 30)
  },

  name: "Kratika",
  sender: "Your name", // ← apna naam yahan likho
  birthday: "2005-11-13T00:00:00", // YYYY-MM-DDTHH:MM:SS
  intro:
    "Meri favourite chudail, meri college ki first dost, aur woh insaan jiske saath bond ka naam hi emotional chaos hai — today is entirely about you.",
  reasons: [
    "Because your presence can turn the most boring day into an actual story.",
    "Because you somehow understand the things I never explain properly.",
    "Because you are soft-hearted, strong-minded, and just the right amount of crazy.",
    "Because our friendship feels like comfort, chaos and home — all at once.",
    "Because being your friend is one of my favourite things that college gave me."
  ],
  wishes: [
    "May every plan that excites you find its way to you.",
    "May your heart feel as loved as you make other hearts feel.",
    "May there always be laughter hiding inside the hard days.",
    "May you keep choosing yourself, loudly and without guilt.",
    "May our friendship keep collecting the most ridiculous memories.",
    "May this year surprise you in the sweetest possible ways."
  ],
  letter: [
    "Happy birthday, Kratika. I still think it is funny that you were my first friend in college, because somehow that one small beginning became such a huge, beautiful part of my life.",
    "Thank you for every random conversation, every emotional moment, every laugh that hurt, and every time you made life feel less heavy just by being there. You are genuinely special to me — in a way that no fancy sentence can fully explain.",
    "I hope this year gives you the kind of joy that stays. More confidence, more peace, more dreams coming true, and a hundred little moments that make you stop and smile. Never forget: your favourite chudail title comes with lifetime friendship benefits."
  ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function fillContent() {
  $$('[data-name]').forEach((node) => { node.textContent = SITE_CONFIG.name; });
  $$('[data-sender]').forEach((node) => { node.textContent = SITE_CONFIG.sender; });
  $('[data-intro]').textContent = SITE_CONFIG.intro;

  $$('.memory-card').forEach((card) => {
    const image = $('img', card);
    image.addEventListener('load', () => card.classList.remove('empty'));
    image.addEventListener('error', () => card.classList.add('empty'));
    if (image.complete && image.naturalWidth > 0) card.classList.remove('empty');
  });

  const wishList = $('#wishList');
  SITE_CONFIG.wishes.forEach((wish, index) => {
    const button = document.createElement('button');
    button.className = 'wish';
    button.type = 'button';
    button.innerHTML = `<span class="wish-number">0${index + 1}</span><span class="wish-text">${wish}</span><span class="wish-status">tap to deliver</span>`;
    button.addEventListener('click', () => {
      button.classList.toggle('delivered');
      $('.wish-status', button).textContent = button.classList.contains('delivered') ? 'delivered' : 'tap to deliver';
    });
    wishList.append(button);
  });

  const letter = $('[data-letter]');
  SITE_CONFIG.letter.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    letter.append(p);
  });
}

function getNextBirthday(now) {
  const born = new Date(SITE_CONFIG.birthday);
  let upcoming = new Date(now.getFullYear(), born.getMonth(), born.getDate());
  if (upcoming <= now) upcoming = new Date(now.getFullYear() + 1, born.getMonth(), born.getDate());
  return upcoming;
}

function pad(value, size = 2) { return String(Math.max(0, value)).padStart(size, '0'); }

function updateClocks() {
  const now = new Date();
  const born = new Date(SITE_CONFIG.birthday);
  const nextBirthday = getNextBirthday(now);
  const countdown = Math.max(0, nextBirthday - now);
  const totalSeconds = Math.floor(countdown / 1000);
  $('#days').textContent = pad(Math.floor(totalSeconds / 86400));
  $('#hours').textContent = pad(Math.floor(totalSeconds % 86400 / 3600));
  $('#minutes').textContent = pad(Math.floor(totalSeconds % 3600 / 60));
  $('#seconds').textContent = pad(totalSeconds % 60);
  $('#turningAge').textContent = nextBirthday.getFullYear() - born.getFullYear();

  const elapsedSeconds = Math.max(0, Math.floor((now - born) / 1000));
  const anniversaries = now.getFullYear() - born.getFullYear() - (now < new Date(now.getFullYear(), born.getMonth(), born.getDate()) ? 1 : 0);
  const lastBirthday = new Date(born.getFullYear() + anniversaries, born.getMonth(), born.getDate());
  const daysSinceLastBirthday = Math.floor((now - lastBirthday) / 86400000);
  $('#lifeYears').textContent = pad(anniversaries);
  $('#lifeDays').textContent = pad(daysSinceLastBirthday, 3);
  $('#lifeHours').textContent = pad(Math.floor(elapsedSeconds / 3600) % 24);
  $('#lifeMinutes').textContent = pad(Math.floor(elapsedSeconds / 60) % 60);
  $('#lifeSeconds').textContent = pad(elapsedSeconds % 60);
}

function setupGift() {
  $('#openGift').addEventListener('click', () => {
    document.body.classList.add('intro-open');
    $('#experience').setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#experience').scrollIntoView({ behavior: 'smooth', block: 'start' }), 380);
  });
}

function setupCake() {
  const button = $('#blowCandle');
  const flame = $('#flame');
  const status = $('#cakeStatus');
  button.addEventListener('click', () => {
    if (flame.classList.contains('out')) return;
    flame.classList.add('out');
    $('.cake-scene').classList.add('celebrate');
    button.textContent = 'Wish sealed ✦';
    button.disabled = true;
    status.textContent = 'Your wish is sealed. May it find you at exactly the right time.';
    burstConfetti();
  });
}

function setupBalloons() {
  const colors = ['#ec557e', '#23bbb7', '#7665dc', '#f2ad32', '#de4e8b'];
  const rotations = ['-8deg', '6deg', '-4deg', '8deg', '-5deg'];
  const garden = $('#balloonGarden');
  let popped = 0;
  SITE_CONFIG.reasons.forEach((reason, index) => {
    const balloon = document.createElement('button');
    balloon.type = 'button';
    balloon.className = 'balloon';
    balloon.dataset.index = index;
    balloon.setAttribute('aria-label', `Open reason ${index + 1}`);
    balloon.style.setProperty('--balloon', colors[index]);
    balloon.style.setProperty('--delay', `${-index * .7}s`);
    balloon.style.setProperty('--string', rotations[index]);
    balloon.innerHTML = `<span>${index + 1}</span>`;
    balloon.addEventListener('click', () => {
      if (balloon.classList.contains('popped')) return;
      balloon.classList.add('popped');
      popped += 1;
      $('.reason-label').textContent = `reason ${index + 1} of ${SITE_CONFIG.reasons.length}`;
      $('.reason-text').textContent = reason;
      $('#balloonCounter').textContent = `${popped} / ${SITE_CONFIG.reasons.length} popped`;
      $('#reasonCard').animate([{ transform: 'scale(.96)', opacity: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 260, easing: 'ease-out' });
      smallBurst(balloon.getBoundingClientRect());
    });
    garden.append(balloon);
  });
}

function setupLetter() {
  $('#openLetter').addEventListener('click', () => {
    const envelope = $('#openLetter');
    const letter = $('#letter');
    const opening = !envelope.classList.contains('open');
    envelope.classList.toggle('open');
    envelope.setAttribute('aria-expanded', String(opening));
    letter.classList.toggle('visible', opening);
    letter.setAttribute('aria-hidden', String(!opening));
    if (opening) setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  });
}

function setupForeverFriend() {
  const card = $('#foreverCard');
  const noButton = $('#noAnswer');
  const yesButton = $('#yesAnswer');
  const stage = $('#answerStage');
  const status = $('#answerStatus');
  let dodges = 0;

  function moveNoButton() {
    if (card.classList.contains('accepted')) return;
    const distance = Math.min(120, 38 + dodges * 12);
    const x = (Math.random() > .5 ? 1 : -1) * (20 + Math.random() * distance);
    const y = (Math.random() > .5 ? 1 : -1) * Math.random() * 26;
    noButton.style.transform = `translate(${x}px, ${y}px)`;
    dodges += 1;
    status.textContent = dodges < 3 ? 'Nope, that answer is trying to escape now. 😂' : 'The NO button has officially given up.';
  }

  noButton.addEventListener('mouseenter', moveNoButton);
  noButton.addEventListener('click', moveNoButton);
  noButton.addEventListener('focus', moveNoButton);
  yesButton.addEventListener('click', () => {
    card.classList.add('accepted');
    yesButton.textContent = 'Pinky promise sealed! ♥';
    noButton.hidden = true;
    status.textContent = 'YAY! Forever-friend status: confirmed, stamped and sealed. ✦';
    burstConfetti();
    stage.classList.add('answered');
  });
}

function createUniverse() {
  const universe = $('#universe');
  const symbols = ['♥', '♡', '✦', '✧', '·'];
  Array.from({ length: 46 }, (_, index) => {
    const piece = document.createElement('span');
    piece.className = 'universe-piece';
    piece.textContent = symbols[index % symbols.length];
    piece.style.setProperty('--x', `${(index * 37 + 8) % 100}%`);
    piece.style.setProperty('--y', `${(index * 61 + 4) % 100}%`);
    piece.style.setProperty('--size', `${index % 5 === 0 ? 1.25 : .55 + (index % 4) * .16}rem`);
    piece.style.setProperty('--delay', `${-(index % 11) * .63}s`);
    piece.style.setProperty('--duration', `${6 + (index % 6) * 1.3}s`);
    universe.append(piece);
  });
}

function setupMusic() {
  const button = $('#musicButton');
  const label = $('#musicLabel');
  const cfg = SITE_CONFIG.music;
  const audio = new Audio();
  audio.src = cfg.file;
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = cfg.volume ?? 0.8;
  let useFallback = false;
  audio.addEventListener('error', () => { useFallback = true; });

  /* ---- fallback synth tune (plays only if song file is missing) ---- */
  let context, master, loopTimer;
  let synthPlaying = false;
  const melody = [
    [523.25, .28], [659.25, .28], [783.99, .42], [659.25, .28],
    [587.33, .28], [698.46, .28], [880, .46], [783.99, .42]
  ];
  function playTone(frequency, startAt, duration) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(.11, startAt + .025);
    gain.gain.exponentialRampToValueAtTime(.0001, startAt + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + .03);
  }
  function scheduleMelody() {
    if (!synthPlaying) return;
    let startAt = context.currentTime + .08;
    let total = 0;
    melody.forEach(([note, length]) => { playTone(note, startAt + total, length); total += length; });
    loopTimer = window.setTimeout(scheduleMelody, total * 1000 - 35);
  }
  function startSynth() {
    context = new (window.AudioContext || window.webkitAudioContext)();
    master = context.createGain();
    master.gain.value = .22;
    master.connect(context.destination);
    synthPlaying = true;
    scheduleMelody();
  }
  function stopSynth() {
    synthPlaying = false;
    window.clearTimeout(loopTimer);
    if (context) context.close();
  }

  /* ---- UI state ---- */
  let isPlaying = false;
  function setUI(on) {
    isPlaying = on;
    button.classList.toggle('is-playing', on);
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', on ? 'Pause background music' : 'Play background music');
    label.textContent = on ? 'Music on' : 'Play music';
  }

  async function startMusic() {
    if (!useFallback) {
      try {
        if (cfg.startAt) audio.currentTime = cfg.startAt;
        await audio.play();
        setUI(true);
        return;
      } catch (e) { useFallback = true; }
    }
    startSynth();
    setUI(true);
  }
  function stopMusic() {
    audio.pause();
    stopSynth();
    setUI(false);
  }

  button.addEventListener('click', () => isPlaying ? stopMusic() : startMusic());
}

function smallBurst(rect) {
  confettiPieces({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 15, spread: 3.5 });
}
function burstConfetti() {
  confettiPieces({ x: window.innerWidth / 2, y: window.innerHeight * .38, count: 100, spread: 7.5 });
}

function confettiPieces({ x, y, count, spread }) {
  const canvas = $('#confetti');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.scale(dpr, dpr);
  const colors = ['#f83b71', '#ffbb47', '#fff1c8', '#52c7bf', '#876fde'];
  const bits = Array.from({ length: count }, () => ({
    x, y, vx: (Math.random() - .5) * spread, vy: -Math.random() * spread - 2,
    gravity: .15 + Math.random() * .08, size: 5 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)], rotation: Math.random() * Math.PI,
    spin: (Math.random() - .5) * .25, opacity: 1
  }));
  const start = performance.now();
  function draw(time) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits.forEach((bit) => {
      bit.x += bit.vx; bit.y += bit.vy; bit.vy += bit.gravity; bit.rotation += bit.spin;
      bit.opacity = Math.max(0, 1 - (time - start) / 1800);
      ctx.save(); ctx.globalAlpha = bit.opacity; ctx.translate(bit.x, bit.y); ctx.rotate(bit.rotation);
      ctx.fillStyle = bit.color; ctx.fillRect(-bit.size / 2, -bit.size / 3, bit.size, bit.size * .65); ctx.restore();
    });
    if (time - start < 1800) requestAnimationFrame(draw); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  requestAnimationFrame(draw);
}

fillContent();
updateClocks();
setInterval(updateClocks, 1000);
setupGift();
setupCake();
setupBalloons();
setupLetter();
setupForeverFriend();
createUniverse();
setupMusic();
