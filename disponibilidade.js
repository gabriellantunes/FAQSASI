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
            text: "O que é disponibilidade no contexto de segurança da informação?",
            options: [
                "Garantir que a informação esteja acessível apenas para usuários autorizados.",
                "Garantir que a informação esteja disponível sempre que necessário.",
                "Garantir que a informação seja verdadeira e íntegra.",
                "Proteger a informação contra acessos não autorizados.",
                "Facilitar o acesso à informação para todos."
            ],
            correct: 1
        },
        {
            text: "Qual das opções abaixo representa uma ameaça à disponibilidade?",
            options: [
                "Ataque de negação de serviço (DoS).",
                "Criptografia de dados.",
                "Backup regular dos dados.",
                "Uso de firewalls.",
                "Autenticação multifator."
            ],
            correct: 0
        },
        {
            text: "O que pode ajudar a garantir a disponibilidade de um sistema?",
            options: [
                "Implementação de redundância de hardware.",
                "Uso de senhas fracas.",
                "Desabilitar logs de atividades.",
                "Acesso irrestrito a todos os usuários.",
                "Desligamento frequente do sistema."
            ],
            correct: 0
        },
        {
            text: "Qual das práticas abaixo NÃO ajuda a garantir a disponibilidade?",
            options: [
                "Realização de backup regular.",
                "Implementação de medidas de redundância.",
                "Desativação de sistemas críticos sem aviso prévio.",
                "Monitoramento contínuo de sistemas.",
                "Implementação de políticas de recuperação de desastres."
            ],
            correct: 2
        },
        {
            text: "O que deve ser feito para melhorar a disponibilidade de um sistema?",
            options: [
                "Garantir a existência de um plano de recuperação de desastres.",
                "Compartilhar senhas com colegas.",
                "Manter sistemas críticos sem atualização.",
                "Usar apenas um servidor sem backup.",
                "Desabilitar todos os logs de sistema."
            ],
            correct: 0
        },
        {
            text: "Como a virtualização pode ajudar na disponibilidade?",
            options: [
                "Ao permitir a rápida recuperação de sistemas em caso de falha.",
                "Ao facilitar o acesso irrestrito aos dados.",
                "Ao desabilitar medidas de segurança.",
                "Ao reduzir o número de backups necessários.",
                "Ao desligar servidores durante a noite."
            ],
            correct: 0
        },
        {
            text: "O que é uma estratégia eficaz para garantir a alta disponibilidade de um sistema?",
            options: [
                "Implementar um sistema de balanceamento de carga.",
                "Desabilitar firewalls.",
                "Usar autenticação simples.",
                "Evitar atualizações de sistema.",
                "Permitir que qualquer usuário tenha acesso de administrador."
            ],
            correct: 0
        },
        {
            text: "Qual é o impacto de um ataque de negação de serviço na disponibilidade?",
            options: [
                "Interrompe o acesso legítimo aos recursos do sistema.",
                "Altera os dados armazenados no sistema.",
                "Exige que os usuários mudem suas senhas.",
                "Melhora a integridade dos dados.",
                "Aumenta a velocidade de acesso ao sistema."
            ],
            correct: 0
        },
        {
            text: "Qual técnica pode ser usada para mitigar ataques que afetam a disponibilidade?",
            options: [
                "Implementar um sistema de detecção e prevenção de intrusões (IDS/IPS).",
                "Desabilitar backups.",
                "Compartilhar senhas com todos os usuários.",
                "Desabilitar firewalls.",
                "Evitar o uso de autenticação multifator."
            ],
            correct: 0
        },
        {
            text: "Por que a disponibilidade é importante em um ambiente de negócios?",
            options: [
                "Porque garante que os serviços críticos estejam sempre acessíveis.",
                "Porque facilita o acesso não autorizado.",
                "Porque permite que os dados sejam alterados por qualquer pessoa.",
                "Porque reduz a necessidade de backups.",
                "Porque garante que os dados nunca sejam modificados."
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
