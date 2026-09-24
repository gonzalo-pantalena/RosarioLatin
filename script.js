const prayers = {
  sign: {
    kind: 'Inicio', title: 'Señal de la cruz', latin: 'In nomine Patris, et Filii, et Spiritus Sancti. Amen.', spanish: 'En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'
  },
  creed: {
    kind: 'Credo', title: 'Credo', latin: 'Credo in Deum, Patrem omnipotentem, Creatorem caeli et terrae.', spanish: 'Creo en Dios, Padre todopoderoso, creador del cielo y de la tierra.'
  },
  ourFather: {
    kind: 'Padre nuestro', title: 'Padre nuestro', latin: 'Pater noster, qui es in caelis, sanctificetur nomen tuum; adveniat regnum tuum; fiat voluntas tua, sicut in caelo et in terra.', spanish: 'Padre nuestro, que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.'
  },
  hailMary: {
    kind: 'Ave María', title: 'Ave María', latin: 'Ave, Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.', spanish: 'Dios te salve, María, llena eres de gracia, el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.'
  },
  glory: {
    kind: 'Gloria', title: 'Gloria', latin: 'Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.', spanish: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.'
  },
  fatima: {
    kind: 'Jaculatoria', title: 'Jaculatoria de Fátima', latin: 'O mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, perduc in caelum omnes animas, praesertim eas quae misericordiae tuae maxime indigent.', spanish: 'Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia.'
  },
  salve: {
    kind: 'Octubre', title: 'Salve Regina', latin: 'Salve, Regina, mater misericordiae; vita, dulcedo et spes nostra, salve. Ad te clamamus, exsules filii Evae.', spanish: 'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra. Dios te salve. A ti clamamos los desterrados hijos de Eva.'
  },
  litany: {
    kind: 'Octubre', title: 'Letanías lauretanas', latin: 'Sancta Maria, ora pro nobis. Sancta Dei Genetrix, ora pro nobis. Regina Sacratissimi Rosarii, ora pro nobis.', spanish: 'Santa María, ruega por nosotros. Santa Madre de Dios, ruega por nosotros. Reina del Santísimo Rosario, ruega por nosotros.'
  }
};

const mysterySets = {
  joyful: { name: 'Misterios gozosos', days: [1, 6], mysteries: [
    ['La Anunciación', 'He aquí la esclava del Señor.', 'Lc 1, 38'], ['La Visitación', '¿De dónde a mí que la madre de mi Señor venga a mí?', 'Lc 1, 43'], ['El Nacimiento', 'Y el Verbo se hizo carne.', 'Jn 1, 14'], ['La Presentación', 'Mis ojos han visto a tu Salvador.', 'Lc 2, 30'], ['El Niño perdido y hallado', '¿No sabíais que debo ocuparme de las cosas de mi Padre?', 'Lc 2, 49'] ] },
  sorrowful: { name: 'Misterios dolorosos', days: [2, 5], mysteries: [
    ['La Agonía en el huerto', 'No se haga mi voluntad, sino la tuya.', 'Lc 22, 42'], ['La Flagelación', 'Por sus llagas hemos sido curados.', 'Is 53, 5'], ['La Coronación de espinas', '¡Salve, Rey de los judíos!', 'Mc 15, 18'], ['Jesús con la cruz', 'Si alguno quiere venir en pos de mí, que tome su cruz.', 'Mt 16, 24'], ['La Crucifixión', 'Padre, en tus manos encomiendo mi espíritu.', 'Lc 23, 46'] ] },
  glorious: { name: 'Misterios gloriosos', days: [0, 3], mysteries: [
    ['La Resurrección', 'No está aquí: ha resucitado.', 'Lc 24, 6'], ['La Ascensión', 'Mientras los bendecía, se separó de ellos.', 'Lc 24, 51'], ['Pentecostés', 'Todos quedaron llenos del Espíritu Santo.', 'Hch 2, 4'], ['La Asunción', 'Dichosa tú que has creído.', 'Lc 1, 45'], ['La Coronación de María', 'Una mujer vestida de sol.', 'Ap 12, 1'] ] },
  luminous: { name: 'Misterios luminosos', days: [4], mysteries: [
    ['El Bautismo de Jesús', 'Este es mi Hijo amado.', 'Mt 3, 17'], ['Las bodas de Caná', 'Haced lo que él os diga.', 'Jn 2, 5'], ['El anuncio del Reino', 'Convertíos y creed en el Evangelio.', 'Mc 1, 15'], ['La Transfiguración', 'Este es mi Hijo amado: escuchadlo.', 'Mc 9, 7'], ['La institución de la Eucaristía', 'Esto es mi cuerpo, que se entrega por vosotros.', 'Lc 22, 19'] ] }
};

let currentSet;
let steps = [];
let currentStep = 0;
let language = 'latin';
const $ = (selector) => document.querySelector(selector);

function getMysterySet(date = new Date()) {
  const day = date.getDay();
  return Object.values(mysterySets).find((set) => set.days.includes(day)) || mysterySets.glorious;
}

function buildSteps() {
  steps = [{ ...prayers.sign }, { ...prayers.creed }, { ...prayers.ourFather }];
  for (const mystery of currentSet.mysteries) {
    steps.push({ kind: 'Anuncio', title: mystery[0], latin: mystery[1], spanish: mystery[1], verse: mystery[1], reference: mystery[2] });
    steps.push({ ...prayers.ourFather, mysteryIndex: currentSet.mysteries.indexOf(mystery) });
    for (let count = 1; count <= 10; count += 1) steps.push({ ...prayers.hailMary, kind: `Ave María ${count}/10`, title: mystery[0], mysteryIndex: currentSet.mysteries.indexOf(mystery) });
    steps.push({ ...prayers.glory, kind: 'Gloria', title: mystery[0], mysteryIndex: currentSet.mysteries.indexOf(mystery) });
    steps.push({ ...prayers.fatima, kind: 'Jaculatoria', title: mystery[0], mysteryIndex: currentSet.mysteries.indexOf(mystery) });
  }
  if (new Date().getMonth() === 9) steps.push({ ...prayers.salve }, { ...prayers.litany });
}

function renderBeads() {
  const track = $('#beadTrack');
  const accountSteps = steps.filter((step) => step.kind !== 'Anuncio');
  const currentAccount = steps.slice(0, currentStep + 1).filter((step) => step.kind !== 'Anuncio').length - 1;
  const groups = [{ label: 'Inicio', steps: accountSteps.slice(0, 3) }];
  let group = null;
  accountSteps.slice(3).forEach((step) => {
    if (step.kind === 'Padre nuestro') {
      if (group) groups.push(group);
      group = { label: `Decena ${groups.length}`, steps: [] };
    }
    if (!group) group = { label: 'Oraciones finales', steps: [] };
    group.steps.push(step);
  });
  if (group) groups.push(group);

  let accountIndex = 0;
  track.innerHTML = groups.map((beadGroup) => {
    const groupStart = accountIndex;
    const beads = beadGroup.steps.map((step) => {
      const beadType = step.kind === 'Padre nuestro' ? 'father-bead' : step.kind === 'Gloria' ? 'glory-bead' : step.kind === 'Jaculatoria' ? 'fatima-bead' : step.kind.startsWith('Ave María') ? 'hail-bead' : 'intro-bead';
      const isLarge = ['father-bead', 'glory-bead', 'fatima-bead'].includes(beadType);
      const bead = `<span class="bead ${beadType} ${isLarge ? 'major' : ''} ${accountIndex < currentAccount ? 'done' : ''} ${accountIndex === currentAccount ? 'current' : ''}" aria-label="Cuenta ${accountIndex + 1}: ${step.kind}"></span>`;
      accountIndex += 1;
      return bead;
    }).join('');
    const groupState = currentAccount >= groupStart && currentAccount < accountIndex ? 'is-current' : currentAccount >= accountIndex ? 'is-done' : '';
    return `<section class="bead-group ${groupState}"><h3>${beadGroup.label}</h3><div class="bead-group-track">${beads}</div></section>`;
  }).join('');
}

function renderRail() {
  $('#mysteryRail').innerHTML = currentSet.mysteries.map((mystery, index) => `<div class="rail-item ${steps[currentStep]?.mysteryIndex === index ? 'is-current' : ''}">${index + 1}. ${mystery[0]}</div>`).join('');
}

function renderPrayer() {
  const step = steps[currentStep];
  $('#stepNumber').textContent = currentStep + 1;
  $('#stepTotal').textContent = steps.length;
  $('#prayerTitle').textContent = step.title;
  $('#prayerKind').textContent = step.kind;
  $('#prayerText').innerHTML = `${step[language]}${language === 'latin' ? `<span class="translation">${step.spanish}</span>` : `<span class="translation">${step.latin}</span>`}`;
  $('#prayerCounter').textContent = step.kind === 'Anuncio' ? `${step.verse} · ${step.reference}` : `Oración ${currentStep + 1} de ${steps.length}`;
  $('#previousButton').disabled = currentStep === 0;
  $('#nextButton').disabled = currentStep === steps.length - 1;
  renderBeads();
  renderRail();
}

function renderMysteries() {
  $('#mysteryGrid').innerHTML = currentSet.mysteries.map((mystery, index) => `<article class="mystery-card ${steps[currentStep]?.mysteryIndex === index ? 'is-current' : ''}"><div class="mystery-image"><span>Imagen pendiente</span></div><span class="mystery-index">MISTERIO ${String(index + 1).padStart(2, '0')}</span><h3>${mystery[0]}</h3><p class="mystery-verse">“${mystery[1]}”<br>${mystery[2]}</p></article>`).join('');
}

function updateDate() {
  const date = new Date();
  const formatted = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  $('#todayLabel').textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  $('#mysteriesDate').textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  $('#mysteryGroup').textContent = currentSet.name;
  if (date.getMonth() === 9) $('#seasonNote').textContent = 'En octubre: Salve Regina y letanías al final';
}

function setStep(change) {
  currentStep = Math.max(0, Math.min(steps.length - 1, currentStep + change));
  renderPrayer();
  renderMysteries();
}

function initialize() {
  currentSet = getMysterySet();
  buildSteps();
  updateDate();
  renderPrayer();
  renderMysteries();
  $('#startButton').addEventListener('click', () => $('#oracion').scrollIntoView({ behavior: 'smooth' }));
  $('#previousButton').addEventListener('click', () => setStep(-1));
  $('#nextButton').addEventListener('click', () => setStep(1));
  document.querySelectorAll('.language-tab').forEach((tab) => tab.addEventListener('click', () => {
    language = tab.dataset.language;
    document.querySelectorAll('.language-tab').forEach((item) => { item.classList.toggle('is-active', item === tab); item.setAttribute('aria-selected', item === tab ? 'true' : 'false'); });
    renderPrayer();
  }));
  document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') setStep(1); if (event.key === 'ArrowLeft') setStep(-1); });
}

initialize();
