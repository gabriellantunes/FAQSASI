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

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const questions = [
        {
            text: "O que é confidencialidade?",
            options: [
                "Garantir que a informação esteja disponível quando necessário.",
                "Proteger a informação contra acessos não autorizados.",
                "Garantir que a informação seja verdadeira e íntegra.",
                "Monitorar o uso da informação em tempo real.",
                "Facilitar o acesso à informação para todos."
            ],
            correct: 1
        },
        {
            text: "Qual das opções abaixo representa uma prática comum para manter a confidencialidade?",
            options: [
                "Usar autenticação multifator.",
                "Deixar os arquivos sem criptografia.",
                "Compartilhar senhas com colegas de trabalho.",
                "Não usar bloqueio de tela no computador.",
                "Deixar o computador sem senha."
            ],
            correct: 0
        },
        {
            text: "Em qual dos exemplos a confidencialidade não está sendo respeitada?",
            options: [
                "Envio de e-mails criptografados.",
                "Uso de HTTPS em websites.",
                "Compartilhamento de senha em um grupo.",
                "Armazenamento de dados em discos criptografados.",
                "Uso de autenticação biométrica."
            ],
            correct: 2
        },
        {
            text: "O que pode comprometer a confidencialidade de uma informação?",
            options: [
                "Uso de criptografia forte.",
                "Acesso não autorizado a dados.",
                "Implementação de políticas de segurança.",
                "Uso de VPN para conexões remotas.",
                "Monitoramento de rede em tempo real."
            ],
            correct: 1
        },
        {
            text: "Qual dessas práticas ajuda a garantir a confidencialidade dos dados em trânsito?",
            options: [
                "Criptografia de dados.",
                "Compressão de arquivos.",
                "Compartilhamento de links públicos.",
                "Armazenamento de dados em disco rígido.",
                "Backup frequente dos dados."
            ],
            correct: 0
        },
        {
            text: "Qual método é mais eficaz para garantir a confidencialidade em uma comunicação?",
            options: [
                "Uso de senhas simples.",
                "Enviar informações sem criptografia.",
                "Uso de criptografia de ponta a ponta.",
                "Compartilhar arquivos diretamente via e-mail.",
                "Armazenamento de informações em servidores públicos."
            ],
            correct: 2
        },
        {
            text: "Qual é o principal objetivo da confidencialidade no contexto da segurança da informação?",
            options: [
                "Garantir que os dados sejam acessíveis apenas por pessoas autorizadas.",
                "Garantir a integridade dos dados.",
                "Facilitar o acesso a dados por qualquer pessoa.",
                "Garantir que os dados estejam disponíveis o tempo todo.",
                "Garantir que os dados possam ser modificados por qualquer um."
            ],
            correct: 0
        },
        {
            text: "O que pode ser considerado uma falha de confidencialidade em um sistema de informação?",
            options: [
                "Backup diário dos dados.",
                "Acesso indevido a informações privadas.",
                "Criptografia de arquivos sensíveis.",
                "Implementação de firewalls.",
                "Uso de autenticação forte."
            ],
            correct: 1
        },
        {
            text: "Qual técnica de ataque compromete diretamente a confidencialidade?",
            options: [
                "Ataque de negação de serviço (DoS).",
                "Engenharia social.",
                "Phishing.",
                "Vírus que apagam dados.",
                "Uso de senhas fortes."
            ],
            correct: 1
        },
        {
            text: "Qual protocolo é amplamente utilizado para garantir a confidencialidade nas comunicações web?",
            options: [
                "FTP.",
                "HTTP.",
                "Telnet.",
                "HTTPS.",
                "DNS."
            ],
            correct: 3
        },
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById("question-number-text").textContent = `Pergunta ${currentQuestionIndex + 1}`;
        document.getElementById("question-text").textContent = question.text;
        const answerOptions = document.getElementById("answer-options");
        answerOptions.innerHTML = '';

        question.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="radio" name="answer" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>`;
            answerOptions.appendChild(li);
        });

        document.getElementById("question-number").textContent = `Pergunta ${currentQuestionIndex + 1}/10`;
        document.getElementById("correct-answers").textContent = `Acertos: ${correctAnswers}`;
        document.getElementById("incorrect-answers").textContent = `Incorretas: ${incorrectAnswers}`;
    }

    function validateAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            document.getElementById("no-answer-modal").classList.remove("hidden");
            return;
        }

        const answerIndex = parseInt(selectedOption.value);
        const correctIndex = questions[currentQuestionIndex].correct;

        const labels = document.querySelectorAll('#answer-options label');
        if (answerIndex === correctIndex) {
            labels[answerIndex].classList.add('correct');
            correctAnswers++;
        } else {
            labels[answerIndex].classList.add('incorrect');
            labels[correctIndex].classList.add('correct');
            incorrectAnswers++;
        }

        document.getElementById("submit-answer").classList.add('hidden');
        document.getElementById("next-question").classList.remove('hidden');
    }

    function redirectToResults() {
        const params = new URLSearchParams();
        params.append('correct', correctAnswers);
        params.append('incorrect', incorrectAnswers);

        window.location.href = `resultado.html?${params.toString()}`;
    }

    document.getElementById("submit-answer").addEventListener("click", validateAnswer);

    document.getElementById("next-question").addEventListener("click", function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            document.getElementById("submit-answer").classList.remove('hidden');
            document.getElementById("next-question").classList.add('hidden');
        } else {
            redirectToResults();
        }
    });

    loadQuestion();

    document.getElementById("exit-button").addEventListener("click", function() {
        document.getElementById("confirm-exit-modal").classList.remove("hidden");
    });
    
    document.getElementById("confirm-exit-yes").addEventListener("click", function() {
        window.location.href = "index.html";
    });
    
    document.getElementById("confirm-exit-no").addEventListener("click", function() {
        document.getElementById("confirm-exit-modal").classList.add("hidden");
    });

    document.getElementById("no-answer-ok").addEventListener("click", function() {
        document.getElementById("no-answer-modal").classList.add("hidden");
    });

});
