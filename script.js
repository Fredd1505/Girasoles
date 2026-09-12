// Girasoles de primavera · Proyecto personal de Fredd Bustos.
// AUDIO DIRECTO: coloca musica.mp3 en la misma carpeta que index.html.
// También puedes usar aquí un enlace directo a un archivo MP3.
// Los enlaces a videos de YouTube no son archivos de audio.
const ARCHIVO_MUSICA = 'musica.mp3';
const TIEMPO_APARICION_RAMO = 2500;
const audio = document.getElementById('audio-para-ti');
const controlMusica = document.getElementById('alternar-musica');
const estadoMusica = document.getElementById('estado-musica');
audio.src = ARCHIVO_MUSICA;
audio.volume = 0.45;

function actualizarControl() {
  controlMusica.textContent = audio.paused ? '♫ Reproducir' : '♫ Pausar';
  controlMusica.setAttribute('aria-label', audio.paused ? 'Reproducir música' : 'Pausar música');
}
function mostrarFalloAudio() {
  estadoMusica.textContent = 'La música no está disponible.';
  actualizarControl();
}
async function reproducirMusica() {
  estadoMusica.textContent = '';
  try {
    await audio.play();
  } catch (error) {
    estadoMusica.textContent = error.name === 'NotAllowedError'
      ? 'Pulsa Reproducir para escuchar la música.'
      : 'La música no está disponible.';
  }
  actualizarControl();
}
audio.addEventListener('play', () => { estadoMusica.textContent = ''; actualizarControl(); });
audio.addEventListener('pause', actualizarControl);
audio.addEventListener('error', mostrarFalloAudio);
controlMusica.addEventListener('click', () => {
  if (audio.paused) reproducirMusica();
  else audio.pause();
});

document.body.classList.remove('not-loaded');
document.getElementById('btn-para-ti').addEventListener('click', () => {
  document.getElementById('pantalla-inicial').style.display = 'none';
  const contenido = document.getElementById('contenido-principal');
  contenido.style.display = '';
  contenido.classList.add('abierto');
  document.getElementById('musica').hidden = false;
  // Se inicia dentro del clic del usuario, también al abrir el HTML localmente.
  reproducirMusica();
  setTimeout(() => document.querySelector('.ramo')?.classList.add('ramo--visible'), TIEMPO_APARICION_RAMO);
}, { once: true });
