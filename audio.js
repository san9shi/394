document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const canvas = document.getElementById("audioVisualizer");
    const ctx = canvas.getContext("2d");

    // Ajuste la taille du canvas
    canvas.width = 50;
    canvas.height = 20;

    // Création de l'Analyser Audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 32;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        // Efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessine des barres animées
        ctx.fillStyle = "#CCFF00";
        for (let i = 0; i < bufferLength; i++) {
            let barHeight = (dataArray[i] / 255) * canvas.height;
            ctx.fillRect(i * 3, canvas.height - barHeight, 2, barHeight);
        }
    }

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            if (audioContext.state === "suspended") {
                audioContext.resume(); // Active l'AudioContext si nécessaire
            }
            audio.play();
            playPauseBtn.textContent = "⏸";
            draw(); // Démarre l'animation
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶";
        }
    });
});
