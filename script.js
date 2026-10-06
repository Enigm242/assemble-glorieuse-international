// === À REMPLIR ===
const NUMERO_WHATSAPP = ''; // ex. '221771234567' (indicatif, sans + ni espaces)
const DONS = { wave: '', orange: '', zelle: '', nom: '' };

// ===== THÈME DE L'ANNÉE, THÈME DU MOIS, HOMME DE DIEU (à remplir) =====
const ANNEE = { theme: '', verset: '' };            // ex. theme: "Année de la restauration", verset: "Joël 2:25"
const THEME_DU_MOIS = { texte: '', couleur: 'nuit' };  // thème annoncé + couleur du site (voir la liste des couleurs plus bas)
const HOMME_DE_DIEU = {
  nom: '',                                          // ex. 'Prophète Michael Kablan'
  titre: '',                                        // ex. 'Visionnaire'
  bienvenue: "Que vous soyez de passage ou à la recherche d'une famille spirituelle, vous êtes les bienvenus. Ici, on prie, on loue Dieu et on grandit ensemble dans la foi.",
  vision: ''                                        // texte de la vision de l'église
};

// Liens de l'église (à remplir, laisser vide = caché)
const LIENS = { youtube: '', facebook: '', secretariat: '' }; // secretariat : ex. '221771234567'

// Prédications : pour en ajouter une, copier une ligne. 'id' = ce qui suit v= dans le lien YouTube.
// Thèmes possibles : Enseignement, Prophétique, Prédication.
// BROUILLON : titres et thèmes à remplacer par les vrais.
const THEMES = ['Enseignement', 'Prophétique', 'Prédication'];
const PREDICATIONS = [
  { id: 'XhHjBTy0qMA', titre: 'Prédication 1 (titre à renommer)', theme: 'Prophétique' },
  { id: '6zsYxw0gKl0', titre: 'Prédication 2 (titre à renommer)', theme: 'Prédication' },
  { id: 'r4UD4CjcDqg', titre: 'Prédication 3 (titre à renommer)', theme: 'Enseignement' },
  { id: '3PyFOHwL02Y', titre: 'Prédication 4 (titre à renommer)', theme: 'Prédication' }
];
// =================
const $ = s => document.querySelector(s);
addEventListener('scroll', () => $('header').classList.toggle('plein', scrollY > 60));
$('#burger').onclick = () => $('#nav').classList.toggle('ouvert');
if (NUMERO_WHATSAPP) { const w = $('#wa'); w.hidden = false; w.href = 'https://wa.me/' + NUMERO_WHATSAPP; }
$('#inviter').onclick = e => { e.preventDefault(); open('https://wa.me/?text=' + encodeURIComponent("Je t'invite à l'Assemblée Glorieuse Internationale : " + location.origin), '_blank'); };
// Compte à rebours (heure UTC = heure du Sénégal)
if ($('#cd')) {
  const cultes = [{ j: 5, h: 19, d: 120, n: 'Culte prophétique' }, { j: 0, h: 9, d: 180, n: 'Culte de célébration' }];
  const tick = () => {
    const now = new Date(); let best = null;
    cultes.forEach(c => {
      let t = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + (c.j - now.getUTCDay() + 7) % 7, c.h);
      if (now > t + c.d * 60000) t += 7 * 864e5;
      if (!best || t < best.t) best = { t, c };
    });
    $('#cdTitre').textContent = best.c.n;
    const ms = best.t - now;
    if (ms <= 0) { $('#cd').textContent = 'En ce moment, rejoignez-nous !'; return; }
    const j = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
    $('#cd').textContent = `dans ${j} j ${h} h ${m} min ${s} s`;
  };
  tick(); setInterval(tick, 1000);
}
// Jour en cours
const auj = document.querySelector('.js[data-j="' + new Date().getUTCDay() + '"]'); if (auj) auj.classList.add('auj');
// Dons
document.querySelectorAll('.don').forEach(c => {
  const v = DONS[c.dataset.cle], info = c.querySelector('.don-info'), b = c.querySelector('.copier');
  if (v) { info.textContent = v; b.onclick = () => navigator.clipboard.writeText(v).then(() => { b.textContent = 'Copié !'; setTimeout(() => b.textContent = 'Copier', 2000); }); }
  else { info.textContent = 'Bientôt disponible'; info.classList.add('bientot'); b.hidden = true; }
});
if ($('#benef') && DONS.nom) $('#benef').textContent = 'Au nom de : ' + DONS.nom;
// Demande de prière : envoi anonyme (Netlify Forms), sans passer par le WhatsApp de la personne
if ($('#priere')) $('#priere').onsubmit = async e => {
  e.preventDefault();
  const f = $('#priere'), msg = $('#priereMsg'), btn = f.querySelector('button');
  btn.disabled = true; msg.className = 'priere-msg'; msg.textContent = 'Envoi en cours…';
  try {
    const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(f)).toString() });
    if (!r.ok) throw 0;
    f.reset(); msg.className = 'priere-msg ok'; msg.textContent = 'Merci, votre demande a bien été transmise. Nous prions pour vous.';
  } catch (_) {
    msg.className = 'priere-msg err'; msg.textContent = "L'envoi n'a pas pu se faire. (Il ne fonctionne que sur le site en ligne, pas en test local.)";
  }
  btn.disabled = false;
};

// Liens Facebook / secrétariat / YouTube
if (LIENS.facebook) document.querySelectorAll('#fb').forEach(a => { a.hidden = false; a.href = LIENS.facebook; });
if (LIENS.secretariat) document.querySelectorAll('#tel').forEach(a => { a.hidden = false; a.href = 'tel:+' + LIENS.secretariat; });
if (LIENS.youtube && $('#ytAbo')) { $('#ytAbo').hidden = false; $('#ytAbo').href = LIENS.youtube + (LIENS.youtube.includes('?') ? '&' : '?') + 'sub_confirmation=1'; $('#ytBientot').hidden = true; }
// Page prédications
if ($('#predGrid')) {
  const themes = ['Toutes', ...THEMES];
  const dessiner = t => {
    $('#predGrid').innerHTML = PREDICATIONS.filter(p => t === 'Toutes' || p.theme === t).map(p =>
      `<a class="pred" href="https://www.youtube.com/watch?v=${p.id}" target="_blank" rel="noopener"><div class="mini" style="background-image:url(https://i.ytimg.com/vi/${p.id}/hqdefault.jpg)"></div><div class="info"><span class="theme">${p.theme}</span><h3>${p.titre}</h3></div></a>`).join('');
    fx();
    document.querySelectorAll('#predFiltres button').forEach(b => b.classList.toggle('on', b.textContent === t));
  };
  $('#predFiltres').innerHTML = themes.map(t => `<button>${t}</button>`).join('');
  document.querySelectorAll('#predFiltres button').forEach(b => b.onclick = () => dessiner(b.textContent));
  dessiner('Toutes');
}

// ===== Verset du jour (change chaque jour, ordre mélangé, Louis Segond 1910) =====
const VERSETS = [
  ['Car Dieu a tellement aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.', 'Jean 3:16'],
  ['L\'Éternel est mon berger: je ne manquerai de rien.', 'Psaume 23:1'],
  ['Je puis tout par celui qui me fortifie.', 'Philippiens 4:13'],
  ['Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse.', 'Proverbes 3:5'],
  ['Fortifie-toi et prends courage. Ne t\'effraie point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.', 'Josué 1:9'],
  ['Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu.', 'Ésaïe 41:10'],
  ['Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.', 'Matthieu 11:28'],
  ['Si Dieu est pour nous, qui sera contre nous?', 'Romains 8:31'],
  ['Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.', 'Matthieu 6:33'],
  ['Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.', 'Psaume 119:105'],
  ['Car ce n\'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d\'amour et de sagesse.', '2 Timothée 1:7'],
  ['Demandez, et l\'on vous donnera; cherchez, et vous trouverez; frappez, et l\'on vous ouvrira.', 'Matthieu 7:7'],
  ['Or la foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit pas.', 'Hébreux 11:1'],
  ['L\'Éternel est ma lumière et mon salut: de qui aurais-je crainte?', 'Psaume 27:1'],
  ['Les bontés de l\'Éternel ne sont pas épuisées, ses compassions ne sont pas à leur terme; elles se renouvellent chaque matin.', 'Lamentations 3:22-23'],
  ['Soyez toujours joyeux. Priez sans cesse. Rendez grâces en toutes choses.', '1 Thessaloniciens 5:16-18'],
  ['Si quelqu\'un d\'entre vous manque de sagesse, qu\'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.', 'Jacques 1:5'],
  ['Fais de l\'Éternel tes délices, et il te donnera ce que ton cœur désire.', 'Psaume 37:4'],
  ['Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.', 'Ésaïe 40:31'],
  ['Celui qui demeure sous l\'abri du Très-Haut repose à l\'ombre du Tout-Puissant.', 'Psaume 91:1'],
  ['Ne nous lassons pas de faire le bien; car nous moissonnerons au temps convenable, si nous ne nous relâchons pas.', 'Galates 6:9'],
  ['Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.', 'Psaume 46:2'],
  ['Je lève mes yeux vers les montagnes... D\'où me viendra le secours? Mon secours vient de l\'Éternel, qui a fait les cieux et la terre.', 'Psaume 121:1-2'],
  ['Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.', 'Jean 14:6'],
  ['Fortifiez-vous et soyez fermes; l\'Éternel, ton Dieu, marchera lui-même avec toi, il ne te délaissera point, il ne t\'abandonnera point.', 'Deutéronome 31:6'],
  ['Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu.', 'Romains 8:28']
];
if ($('#vjTexte')) {
  const jour = Math.floor(Date.now() / 864e5), n = VERSETS.length, cycle = Math.floor(jour / n), pos = jour % n;
  const h = (c, i) => { let x = (c * 73856093) ^ (i * 19349663); x = Math.imul(x ^ (x >>> 13), 1274126177); return (x ^ (x >>> 16)) >>> 0; };
  const ordre = VERSETS.map((_, i) => i).sort((a, b) => h(cycle, a) - h(cycle, b));
  const v = VERSETS[ordre[pos]];
  $('#vjTexte').textContent = '« ' + v[0] + ' »'; $('#vjRef').textContent = v[1] + ' (Louis Segond)';
}

// ===== Lecture biblique =====
if ($('#lecListe')) {
  const LIVRES = [['Genèse',50],['Exode',40],['Lévitique',27],['Nombres',36],['Deutéronome',34],['Josué',24],['Juges',21],['Ruth',4],['1 Samuel',31],['2 Samuel',24],['1 Rois',22],['2 Rois',25],['1 Chroniques',29],['2 Chroniques',36],['Esdras',10],['Néhémie',13],['Esther',10],['Job',42],['Psaumes',150],['Proverbes',31],['Ecclésiaste',12],['Cantique des cantiques',8],['Ésaïe',66],['Jérémie',52],['Lamentations',5],['Ézéchiel',48],['Daniel',12],['Osée',14],['Joël',3],['Amos',9],['Abdias',1],['Jonas',4],['Michée',7],['Nahum',3],['Habacuc',3],['Sophonie',3],['Aggée',2],['Zacharie',14],['Malachie',4],['Matthieu',28],['Marc',16],['Luc',24],['Jean',21],['Actes',28],['Romains',16],['1 Corinthiens',16],['2 Corinthiens',13],['Galates',6],['Éphésiens',6],['Philippiens',4],['Colossiens',4],['1 Thessaloniciens',5],['2 Thessaloniciens',3],['1 Timothée',6],['2 Timothée',4],['Tite',3],['Philémon',1],['Hébreux',13],['Jacques',5],['1 Pierre',5],['2 Pierre',3],['1 Jean',5],['2 Jean',1],['3 Jean',1],['Jude',1],['Apocalypse',22]];
  const CH = []; LIVRES.forEach(([l, n]) => { for (let i = 1; i <= n; i++) CH.push([l, i]); });
  const plage = (a, b) => { const out = []; let i = a; while (i < b) { const l = CH[i][0]; let j = i; while (j + 1 < b && CH[j + 1][0] === l) j++; out.push(CH[i][1] === CH[j][1] ? l + ' ' + CH[i][1] : l + ' ' + CH[i][1] + '–' + CH[j][1]); i = j + 1; } return out.join(' · '); };
  const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const now = new Date(), an = now.getUTCFullYear();
  const bis = (an % 4 === 0 && an % 100 !== 0) || an % 400 === 0, jm = [31, bis ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], total = bis ? 366 : 365;
  const jAn = Math.floor((Date.UTC(an, now.getUTCMonth(), now.getUTCDate()) - Date.UTC(an, 0, 1)) / 864e5) + 1;
  const lecAnnuel = d => plage(Math.floor((d - 1) * CH.length / total), Math.floor(d * CH.length / total));
  const lecMensuel = d => 'Proverbes ' + d + (d <= 30 ? ' · Psaumes ' + [0, 30, 60, 90, 120].map(k => d + k).join(', ') : '');
  const lire = k => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } };
  const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  let mode = 'an';
  const rendre = () => {
    const cle = mode === 'an' ? 'lec-an-' + an : 'lec-mois-' + an + '-' + now.getUTCMonth();
    const faits = lire(cle), nb = mode === 'an' ? total : jm[now.getUTCMonth()], auj = mode === 'an' ? jAn : now.getUTCDate();
    const texte = d => mode === 'an' ? lecAnnuel(d) : lecMensuel(d);
    $('#lecJour').innerHTML = '<small>Lecture d\'aujourd\'hui · ' + (mode === 'an' ? 'jour ' + auj + ' sur ' + total : MOIS[now.getUTCMonth()] + ' ' + an) + '</small><p>' + texte(auj) + '</p>';
    const ligne = d => '<label class="lec-ligne' + (faits[d] ? ' fait' : '') + (d === auj ? ' auj' : '') + '"><input type="checkbox" data-d="' + d + '"' + (faits[d] ? ' checked' : '') + '><b>Jour ' + d + '</b><span>' + texte(d) + '</span></label>';
    let html = '';
    if (mode === 'an') { let d = 1; jm.forEach((n, m) => { let l = ''; for (let i = 0; i < n; i++, d++) l += ligne(d); html += '<details' + (m === now.getUTCMonth() ? ' open' : '') + '><summary>' + MOIS[m] + '</summary>' + l + '</details>'; }); }
    else { let l = ''; for (let d = 1; d <= nb; d++) l += ligne(d); html = '<details open><summary>' + MOIS[now.getUTCMonth()] + ' ' + an + '</summary>' + l + '</details>'; }
    $('#lecListe').innerHTML = html;
    const maj = () => { const c = Object.values(faits).filter(Boolean).length; $('#barre').style.width = (100 * c / nb) + '%'; $('#barreTxt').textContent = c + ' jour' + (c > 1 ? 's' : '') + ' lu' + (c > 1 ? 's' : '') + ' sur ' + nb; };
    document.querySelectorAll('#lecListe input').forEach(i => i.onchange = () => { faits[i.dataset.d] = i.checked; ecrire(cle, faits); i.parentElement.classList.toggle('fait', i.checked); maj(); });
    maj();
  };
  $('#tAn').onclick = () => { mode = 'an'; $('#tAn').classList.add('on'); $('#tMo').classList.remove('on'); rendre(); };
  $('#tMo').onclick = () => { mode = 'mois'; $('#tMo').classList.add('on'); $('#tAn').classList.remove('on'); rendre(); };
  rendre();
}

// ===== Effets 3D : apparition en perspective, inclinaison des cartes, léger parallaxe =====
const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
function fx() {
  if (calme) return;
  const obs = fx.obs || (fx.obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); } }), { threshold: .12 }));
  document.querySelectorAll('.carte,.pred,.don,.semaine .js,.bloc h2,.abonne,.lec-jour,.portrait,.accueil-txt,.annee-in').forEach((el, i) => {
    if (el.dataset.fx) return; el.dataset.fx = 1; el.classList.add('rev'); el.style.transitionDelay = (i % 4) * 90 + 'ms'; obs.observe(el);
  });
}
fx();
if (!calme && matchMedia('(hover:hover)').matches) {
  let cur = null;
  const fin = () => { if (cur) { cur.style.transform = ''; cur.classList.remove('bouge'); cur = null; } };
  document.addEventListener('mousemove', e => {
    const c = e.target.closest && e.target.closest('.carte,.pred,.don');
    if (c !== cur) fin();
    if (!c) return;
    cur = c; c.classList.add('inclin', 'bouge');
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--gx', x * 100 + '%'); c.style.setProperty('--gy', y * 100 + '%');
    c.style.transform = 'perspective(800px) rotateX(' + ((.5 - y) * 10) + 'deg) rotateY(' + ((x - .5) * 12) + 'deg) translateZ(8px)';
  });
  document.addEventListener('mouseleave', fin);
}
if (!calme) addEventListener('scroll', () => {
  const y = Math.min(scrollY, 900);
  document.querySelectorAll('.hero-txt,.bandeau>div').forEach(el => el.style.translate = '0 ' + (y * .18) + 'px');
}, { passive: true });

// ===== Couleur du site selon le thème annoncé =====
// Couleurs possibles pour THEME_DU_MOIS.couleur : 'nuit' (bleu actuel), 'bordeaux', 'foret', 'turquoise', 'royal', 'violet', 'rouge', 'ocean', 'olive', 'brun', 'indigo', 'vert'
// ou un code couleur de ton choix, par exemple '#8b1a1a'.
const MOIS_NOMS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const moisCourant = new Date().getUTCMonth();
const PALETTES = { // [fond foncé, fond foncé 2, accent]
  nuit: ['#0e0e2c','#1b1b52','#d4a017'], bordeaux: ['#2b0f1c','#4e1a33','#e8b04a'], foret: ['#0d2a1f','#14463a','#e0b84a'], turquoise: ['#0b2b33','#12505e','#f0b43c'],
  royal: ['#0d1f3d','#173b73','#f2c14e'], violet: ['#1e0f33','#3a1d66','#e0b040'], rouge: ['#2d1010','#5a1a1a','#f0b840'], ocean: ['#0a2540','#0f4c81','#f5c04b'],
  olive: ['#1a2a10','#2f4a1c','#e6b93c'], brun: ['#2a1408','#4d2812','#e8a838'], indigo: ['#14143a','#2a2a6e','#d9a441'], vert: ['#0f2a1a','#1b4d31','#e5b23a'] };
{
  const c = (THEME_DU_MOIS.couleur || 'nuit').trim(), r = document.documentElement.style;
  let p = PALETTES[c.toLowerCase()];
  if (!p && /^#[0-9a-f]{6}$/i.test(c)) { // couleur libre : on en fait un fond foncé élégant, l'accent reste doré
    const m = k => '#' + [1, 3, 5].map(i => Math.round(parseInt(c.substr(i, 2), 16) * k).toString(16).padStart(2, '0')).join('');
    p = [m(.3), m(.5), '#d4a017'];
  }
  if (p) { r.setProperty('--n', p[0]); r.setProperty('--n2', p[1]); r.setProperty('--or', p[2]); }
}
// ===== Thème de l'année + du mois + homme de Dieu (accueil) =====
if ($('#anneeTheme')) {
  $('#anneeNum').textContent = new Date().getUTCFullYear();
  $('#anneeTheme').textContent = ANNEE.theme || "Le thème de l'année sera bientôt annoncé";
  $('#anneeVerset').textContent = ANNEE.verset;
  const tm = THEME_DU_MOIS.texte;
  if (tm) { $('#moisCarte').hidden = false; $('#moisCarte').innerHTML = 'Thème de ' + MOIS_NOMS[moisCourant] + ' : <b></b>'; $('#moisCarte b').textContent = tm; }
  if (HOMME_DE_DIEU.nom) $('#hdNom').textContent = HOMME_DE_DIEU.nom;
  $('#hdTitre').textContent = HOMME_DE_DIEU.titre;
  $('#hdBienvenue').textContent = HOMME_DE_DIEU.bienvenue;
  $('#hdVision').textContent = HOMME_DE_DIEU.vision || "La vision de l'église sera présentée ici.";
}
