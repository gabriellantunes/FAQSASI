document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 10;
    let columns = Math.floor(canvas.width / fontSize); // Garantir que columns seja um número inteiro positivo
    columns = columns > 0 ? columns : 1; // Se columns for zero ou negativo, define como 1 para evitar o erro
    const letters = Array(columns).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        letters.forEach((yPos, index) => {
            const text = String.fromCharCode(3e4 + Math.random() * 33);
            const xPos = index * fontSize;
            ctx.fillText(text, xPos, yPos);

            if (yPos > canvas.height && Math.random() > 0.975) {
                letters[index] = 0;
            }

            letters[index] += fontSize;
        });
    }

    setInterval(draw, 33);

    const slides = document.querySelectorAll(".slide");
    const nextButton = document.getElementById("next-slide");
    const startButton = document.getElementById("start-game");
    let currentSlide = 0;

    nextButton.addEventListener("click", function() {
        slides[currentSlide].classList.remove("active");
        currentSlide++;
        if (currentSlide < slides.length) {
            slides[currentSlide].classList.add("active");
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            startButton.style.display = "inline-block";
        }
    });

    startButton.addEventListener("click", function() {
        document.getElementById("intro-popup").classList.add("hidden");
        document.getElementById("theme-selection").classList.remove("hidden");
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});