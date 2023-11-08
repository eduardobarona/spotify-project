// Selecciona elementos relevantes
const masterPlayButton = document.getElementById("masterPlay");
const audioPlayer = document.getElementById("reproductor");
const tiempoActual = document.querySelector(".musicPlayer__container-middle-linetime-tiempo-actual");
const tiempoTotal = document.querySelector(".musicPlayer__container-middle-linetime-tiempo-total");
const barraFija = document.querySelector(".musicPlayer__container-middle-linetime-bar");
const barraBlanca = document.querySelector(".musicPlayer__container-middle-linetime-bar-white");

// Función para actualizar la apariencia del botón de reproducción
function actualizarBotonReproduccion() {
    if (audioPlayer.paused) {
        masterPlayButton.classList.remove("bi-pause-circle-fill");
        masterPlayButton.classList.add("bi-play-circle-fill");
    } else {
        masterPlayButton.classList.remove("bi-play-circle-fill");
        masterPlayButton.classList.add("bi-pause-circle-fill");
    }
}

// Manejador de clic para el botón de reproducción
masterPlayButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    actualizarBotonReproduccion();
});

// Actualizar el tiempo actual y la barra de progreso
audioPlayer.addEventListener("timeupdate", () => {
    const duracion = audioPlayer.duration;
    const tiempoActualValue = audioPlayer.currentTime;
    tiempoActual.textContent = formatoTiempo(tiempoActualValue);
    tiempoTotal.textContent = formatoTiempo(duracion);
    
    // Actualizar el valor de la barra blanca
    const porcentajeProgreso = (tiempoActualValue / duracion) * 129;
    barraBlanca.style.width = porcentajeProgreso + "%";
});

// Manejador de clic para la barra fija (adelantar o retroceder la canción)
barraFija.addEventListener("click", (event) => {
    const barraFijaRect = barraFija.getBoundingClientRect();
    const clicX = event.clientX - barraFijaRect.left;
    const barraFijaAncho = barraFijaRect.width;
    const duracion = audioPlayer.duration;
    const nuevoTiempo = (clicX / barraFijaAncho) * duracion;
    audioPlayer.currentTime = nuevoTiempo;
});

// Manejador de finalización de la canción
audioPlayer.addEventListener("ended", () => {
    actualizarBotonReproduccion(); // Cambia a "reproducir"
    audioPlayer.currentTime = 0; // Reinicia la canción al principio
    barraBlanca.style.width = "0"; // Reinicia la barra blanca
});

// Función para formatear el tiempo en minutos y segundos
function formatoTiempo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
}





