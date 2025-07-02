const quizData = [
    {
        question: "Quel est le rôle principal du HTML dans le développement web ?",
        options: ["Styling", "Structure", "Logique", "Base de données"],
        answer: "Structure"
    },
    {
        question: "Quelle propriété CSS définit la couleur de fond ?",
        options: ["color", "background-color", "border-color", "fill"],
        answer: "background-color"
    },
    {
        question: "Quel mot-clé JavaScript déclare une variable constante ?",
        options: ["let", "var", "const", "static"],
        answer: "const"
    },
    {
        question: "Quel framework est associé à JavaScript pour le front-end ?",
        options: ["Django", "React", "Flask", "Spring"],
        answer: "React"
    },
    {
        question: "Quel protocole est utilisé pour les requêtes HTTP sécurisées ?",
        options: ["FTP", "HTTP", "HTTPS", "SSH"],
        answer: "HTTPS"
    },
    {
        question: "Quel est le rôle principal de Node.js ?",
        options: ["Gestion de base de données", "Exécution de JavaScript côté serveur", "Styling", "Validation HTML"],
        answer: "Exécution de JavaScript côté serveur"
    },
    {
        question: "Quel type de base de données est MongoDB ?",
        options: ["SQL", "NoSQL", "Graphique", "Clé-valeur"],
        answer: "NoSQL"
    },
    {
        question: "Quel est le rôle de l'élément <div> en HTML ?",
        options: ["Conteneur générique", "Lien hypertexte", "Formulaire", "Image"],
        answer: "Conteneur générique"
    },
    {
        question: "Quelle méthode JavaScript ajoute un élément à la fin d'un tableau ?",
        options: ["pop()", "shift()", "push()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Quel framework CSS est utilisé dans cette application ?",
        options: ["Bootstrap", "Tailwind CSS", "Materialize", "Bulma"],
        answer: "Tailwind CSS"
    },
    {
        question: "Quel est le port par défaut pour HTTP ?",
        options: ["80", "443", "8080", "3000"],
        answer: "80"
    },
    {
        question: "Quel est le rôle d'Express.js ?",
        options: ["Framework front-end", "Framework back-end pour Node.js", "Base de données", "Outil de test"],
        answer: "Framework back-end pour Node.js"
    },
    {
        question: "Quel type de requête HTTP est utilisé pour créer une ressource ?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "POST"
    },
    {
        question: "Quel est le format de données couramment utilisé dans les API REST ?",
        options: ["XML", "JSON", "CSV", "YAML"],
        answer: "JSON"
    },
    {
        question: "Quel outil est utilisé pour gérer les dépendances dans un projet Node.js ?",
        options: ["npm", "git", "webpack", "docker"],
        answer: "npm"
    },
    {
        question: "Quel sélecteur CSS cible un élément par son ID ?",
        options: [".class", "#id", ":hover", "::before"],
        answer: "#id"
    },
    {
        question: "Quel est le rôle du localStorage en JavaScript ?",
        options: ["Stocker des données côté serveur", "Stocker des données côté client", "Gérer les requêtes HTTP", "Créer des animations"],
        answer: "Stocker des données côté client"
    },
    {
        question: "Quel est le rôle de SQL dans le développement full-stack ?",
        options: ["Gestion des bases de données relationnelles", "Styling", "Logique front-end", "Déploiement"],
        answer: "Gestion des bases de données relationnelles"
    },
    {
        question: "Quel framework Python est populaire pour le back-end ?",
        options: ["React", "Django", "Vue", "Angular"],
        answer: "Django"
    },
    {
        question: "Quel est le rôle du modèle MVC dans le développement web ?",
        options: ["Gestion des bases de données", "Séparation des préoccupations", "Optimisation des images", "Validation des formulaires"],
        answer: "Séparation des préoccupations"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Charger le score depuis localStorage s'il existe
const savedScore = localStorage.getItem('quizScore');
if (savedScore) {
    score = parseInt(savedScore);
    document.getElementById('score-value').textContent = score;
}

// Gestion du bouton de démarrage
document.getElementById('start-btn').addEventListener('click', () => {
    // Réinitialiser le score et l'index de la question pour un nouveau quiz
    score = 0;
    currentQuestionIndex = 0;
    localStorage.setItem('quizScore', score);
    document.getElementById('score-value').textContent = score;
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(option, optionElement));
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('next-btn').disabled = true;
}

function selectOption(selectedOption, element) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('#options div');

    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none'; // Désactiver les clics après sélection
    });

    element.classList.add('selected');

    if (selectedOption === currentQuestion.answer) {
        element.classList.remove('selected');
        element.classList.add('correct');
        score++; // Increment score only for correct answer
        localStorage.setItem('quizScore', score);
        document.getElementById('score-value').textContent = score;
    } else {
        element.classList.remove('selected');
        element.classList.add('incorrect');
        // Afficher la bonne réponse
        options.forEach(opt => {
            if (opt.textContent === currentQuestion.answer) {
                opt.classList.add('correct');
            }
        });
    }

    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('question').textContent = 'Quiz terminé !';
        document.getElementById('options').innerHTML = '';
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('restart-btn').classList.remove('hidden');
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    localStorage.setItem('quizScore', score);
    document.getElementById('score-value').textContent = score;
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}