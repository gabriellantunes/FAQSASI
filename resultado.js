document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /*const fontSize = 12;
    const columns = canvas.width / fontSize;
    const letters = Array(columns).fill(0);*/
    const fontSize = 10;
    let columns = Math.floor(canvas.width / fontSize); // Garantir que columns seja um número inteiro positivo
    columns = columns > 0 ? columns : 1; // Se columns for zero ou negativo, define como 1 para evitar o erro
    const letters = Array(columns).fill(0);

    const urlParams = new URLSearchParams(window.location.search);
    const correctAnswers = parseInt(urlParams.get('correct'));
    const incorrectAnswers = parseInt(urlParams.get('incorrect'));

    let backgroundColor = correctAnswers >= 7 ? '#0F0' : '#F00';

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = backgroundColor;
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

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Exibe os resultados na página
    document.getElementById("correct-answers").innerHTML = `Questões corretas: <span style="color: green;">${correctAnswers}</span>/10`;
    document.getElementById("incorrect-answers").innerHTML = `Questões incorretas: <span style="color: red;">${incorrectAnswers}</span>/10`;

    // Determina a cor do resultado final e remove o /10
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.innerHTML = `Resultado final: <span style="color: ${correctAnswers >= 7 ? 'green' : 'red'};">${correctAnswers}</span>`;

    // Botão "Voltar" redireciona para a página inicial
    document.getElementById("back-button").addEventListener("click", function() {
        window.location.href = "index.html";
    });
});
