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
            text: "O que é integridade da informação?",
            options: [
                "Garantir que a informação esteja disponível quando necessário.",
                "Garantir que a informação seja verdadeira e não tenha sido alterada.",
                "Proteger a informação contra acessos não autorizados.",
                "Monitorar o uso da informação em tempo real.",
                "Facilitar o acesso à informação para todos."
            ],
            correct: 1
        },
        {
            text: "Qual das opções abaixo é um exemplo de manutenção da integridade?",
            options: [
                "Utilizar somas de verificação (checksums) para verificar a integridade dos arquivos.",
                "Compartilhar senhas com colegas de trabalho.",
                "Não usar bloqueio de tela no computador.",
                "Armazenar dados sem backup.",
                "Usar criptografia para proteger a informação."
            ],
            correct: 0
        },
        {
            text: "O que pode comprometer a integridade de uma informação?",
            options: [
                "Alteração não autorizada dos dados.",
                "Criptografia forte.",
                "Uso de VPN para conexões remotas.",
                "Implementação de políticas de segurança.",
                "Monitoramento de rede em tempo real."
            ],
            correct: 0
        },
        {
            text: "Como a integridade pode ser garantida em sistemas de informação?",
            options: [
                "Deixando os dados sem proteção.",
                "Implementando controles de acesso rigorosos e auditorias regulares.",
                "Usando senhas fracas.",
                "Compartilhando informações sem verificação.",
                "Não realizar backups."
            ],
            correct: 1
        },
        {
            text: "Qual é um método comum para verificar a integridade dos dados transmitidos?",
            options: [
                "Utilização de algoritmos de hash, como SHA-256.",
                "Envio dos dados sem qualquer tipo de verificação.",
                "Armazenamento de dados em servidores públicos.",
                "Utilização de autenticação simples.",
                "Compressão de arquivos."
            ],
            correct: 0
        },
        {
            text: "Em um banco de dados, o que pode causar uma falha de integridade?",
            options: [
                "Execução de operações de escrita que não seguem as regras de integridade referencial.",
                "Criação de backups regulares.",
                "Implementação de firewall.",
                "Uso de senhas fortes.",
                "Criptografia de dados."
            ],
            correct: 0
        },
        {
            text: "Por que a integridade é importante na segurança da informação?",
            options: [
                "Porque garante que a informação não foi adulterada e é confiável.",
                "Porque facilita o acesso à informação.",
                "Porque permite que qualquer pessoa altere os dados.",
                "Porque melhora o desempenho dos sistemas.",
                "Porque reduz o custo de armazenamento de dados."
            ],
            correct: 0
        },
        {
            text: "Qual prática NÃO ajuda a garantir a integridade dos dados?",
            options: [
                "Alterar os dados sem registro das mudanças.",
                "Utilizar sistemas de controle de versão.",
                "Implementar políticas de controle de acesso.",
                "Realizar auditorias regulares.",
                "Usar criptografia."
            ],
            correct: 0
        },
        {
            text: "O que é necessário para manter a integridade em um ambiente de nuvem?",
            options: [
                "Auditorias e controles de acesso rigorosos.",
                "Acesso irrestrito aos dados.",
                "Compartilhamento de credenciais entre usuários.",
                "Desabilitar logs de atividades.",
                "Não usar criptografia."
            ],
            correct: 0
        },
        {
            text: "Qual técnica de ataque pode comprometer a integridade de um sistema?",
            options: [
                "Ataques de injeção de SQL.",
                "Ataques de DDoS.",
                "Phishing.",
                "Engenharia social.",
                "Uso de senhas fortes."
            ],
            correct: 0
        }
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
