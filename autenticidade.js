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
            text: "O que é autenticidade no contexto de segurança da informação?",
            options: [
                "Garantir que a informação esteja disponível sempre que necessário.",
                "Garantir que a identidade de um usuário ou sistema seja genuína.",
                "Proteger a informação contra acessos não autorizados.",
                "Garantir que a informação seja verdadeira e íntegra.",
                "Facilitar o acesso à informação para todos."
            ],
            correct: 1
        },
        {
            text: "Qual das práticas abaixo ajuda a garantir a autenticidade?",
            options: [
                "Uso de certificados digitais.",
                "Compartilhar senhas com colegas de trabalho.",
                "Evitar a criptografia de dados.",
                "Desabilitar a autenticação multifator.",
                "Deixar o computador sem senha."
            ],
            correct: 0
        },
        {
            text: "O que compromete a autenticidade de um sistema?",
            options: [
                "Roubo de credenciais de acesso.",
                "Criptografia forte.",
                "Backup regular dos dados.",
                "Implementação de políticas de segurança.",
                "Monitoramento contínuo de sistemas."
            ],
            correct: 0
        },
        {
            text: "Como a autenticidade pode ser verificada em uma comunicação?",
            options: [
                "Utilizando assinaturas digitais.",
                "Desabilitando verificações de integridade.",
                "Compartilhando informações sem verificação.",
                "Deixando as informações sem criptografia.",
                "Não usando autenticação."
            ],
            correct: 0
        },
        {
            text: "Qual é o impacto de uma falha na autenticidade?",
            options: [
                "Acesso não autorizado a sistemas e dados.",
                "Aumento da segurança das informações.",
                "Melhoria no desempenho dos sistemas.",
                "Maior controle sobre o acesso à informação.",
                "Redução de custos operacionais."
            ],
            correct: 0
        },
        {
            text: "Qual das opções abaixo é uma técnica para garantir a autenticidade?",
            options: [
                "Autenticação biométrica.",
                "Envio de dados sem criptografia.",
                "Uso de senhas fracas.",
                "Desabilitar logs de atividades.",
                "Permitir que qualquer usuário tenha acesso de administrador."
            ],
            correct: 0
        },
        {
            text: "Por que a autenticidade é importante?",
            options: [
                "Porque garante que os dados e comunicações são originados de fontes confiáveis.",
                "Porque facilita o acesso não autorizado.",
                "Porque permite que qualquer pessoa altere os dados.",
                "Porque reduz a necessidade de backups.",
                "Porque melhora o desempenho dos sistemas."
            ],
            correct: 0
        },
        {
            text: "Qual das práticas abaixo NÃO garante a autenticidade?",
            options: [
                "Uso de senhas fracas.",
                "Implementação de autenticação multifator.",
                "Utilização de certificados digitais.",
                "Realização de auditorias regulares.",
                "Uso de assinaturas digitais."
            ],
            correct: 0
        },
        {
            text: "Como as chaves criptográficas contribuem para a autenticidade?",
            options: [
                "Verificando a identidade dos remetentes de dados.",
                "Facilitando o acesso não autorizado.",
                "Permitindo a alteração de dados sem registro.",
                "Desabilitando a proteção dos dados.",
                "Reduzindo a segurança das comunicações."
            ],
            correct: 0
        },
        {
            text: "Qual técnica de ataque pode comprometer a autenticidade de um sistema?",
            options: [
                "Phishing.",
                "Ataque de negação de serviço (DoS).",
                "Engenharia social.",
                "Uso de senhas fortes.",
                "Monitoramento contínuo."
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
