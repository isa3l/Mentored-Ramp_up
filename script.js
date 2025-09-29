// Celebrity database with their traits
const celebrities = [
    {
      name: "Jeffrey Epstein",
      description: "Witty, charming, but somehow every date feels like evidence.",
      traits: ["humor", "confidence", "nobu" , "rap", "dubai", "coffee",],
      image: "Epstein.jpg" 
    },
    {
      name: "Shawty Bae",
      description: "Sweet, creative, and down-to-earth. Ideal for cozy movie nights and meaningful conversations… but the whole thing might end up livestreamed.",
      traits: ["kindness", "creativity", "movies", "coffee", "pop"],
      image: "Shawty_Bae.jpg"
    },
    {
      name: "Sean John Combs",
      description: "Kind, genuine, and loves simple pleasures. Perfect for beach days and relaxed dates… as long as you don’t ask too many questions.",
      traits: ["confidence", "kindness", "creativity", "pop", "paris"],
      image: "diddy.jpg"
    },
    {
      name: "Sydney Sweeney",
      description: "Creative, romantic, and loves cozy vibes. Ideal for coffee dates and artistic adventures… as long as you don’t bring up the tagline.",
      traits: ["creativity", "kindness", "pop", "paris", "coffee"],
      image: "Sydney_Sweeney.jpg"
    },
    {
      name: "Ash Trevino",
      description: "Confident, kind, and incredibly talented. Great for adventure dates and deep connections!",
      traits: ["kindness", "beach", "movies", "Bali" , "tokyo",  "classical", "coffee"],
      image: "Ash_Tevino.jpeg"
    }
  ];
  
  // Simple 4-question quiz
  const questions = [
    {
      text: "What's your ideal first date?",
      answers: [
        { text: "A beach day 🏖️", trait: "beach" },
        { text: "Dinner @ Nobu 🍣", trait: "nobu" },
        { text: "Movies 🎬", trait: "movies" },
        { text: "Coffee shop ☕", trait: "coffee" }
      ]
    },
    {
      text: "Which quality attracts you most?",
      answers: [
        { text: "Sense of humor 😂", trait: "humor" },
        { text: "Confidence 💪", trait: "confidence" },
        { text: "Kindness 💖", trait: "kindness" },
        { text: "Creativity 🎨", trait: "creativity" }
      ]
    },
    {
      text: "Pick a dream vacation:",
      answers: [
        { text: "Paris 🗼", trait: "paris" },
        { text: "Tokyo 🏯", trait: "tokyo" },
        { text: "Bali 🌴", trait: "beach" },
        { text: "Dubai 🏙️", trait: "nobu" }
      ]
    },
    {
      text: "Favorite type of music?",
      answers: [
        { text: "Pop 🎤", trait: "pop" },
        { text: "Rock 🎸", trait: "confidence" },
        { text: "Indie 🎧", trait: "creativity" },
        { text: "Classical 🎻", trait: "kindness" }
      ]
    }
  ];
  
  let currentQuestion = 0;
  let userTraits = [];
  let selectedAnswer = null;
  
  function startQuiz() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
  
    currentQuestion = 0;
    userTraits = [];
    selectedAnswer = null;
  
    showQuestion(0);
  }
  
  function showQuestion(index) {
    const questionText = document.getElementById("questionText");
    const answersContainer = document.getElementById("answersContainer");
    const progressBar = document.getElementById("progressBar");
  
    questionText.textContent = questions[index].text;
    answersContainer.innerHTML = "";
  
    questions[index].answers.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("answer-btn");
      btn.onclick = () => selectAnswer(btn, i);
      answersContainer.appendChild(btn);
    });
  
    progressBar.style.width = ((index + 1) / questions.length) * 100 + "%";
  
    document.getElementById("nextBtn").disabled = true;
    selectedAnswer = null;
  }
  
  function selectAnswer(button, answerIndex) {
    const allButtons = document.querySelectorAll(".answer-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));
  
    button.classList.add("selected");
    selectedAnswer = answerIndex;
  
    document.getElementById("nextBtn").disabled = false;
  }
  
  function nextQuestion() {
    if (selectedAnswer === null) return;
  
    const selectedTrait = questions[currentQuestion].answers[selectedAnswer].trait;
    userTraits.push(selectedTrait);
  
    currentQuestion++;
    document.getElementById("nextBtn").disabled = true;
  
    if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      showResults();
    }
  }
  
  function showResults() {
    console.log("📊 Calculating and displaying results...");
  
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";
  
    const bestMatch = calculateBestMatch();
    displayCelebrityWithImage(bestMatch);
  }
  
  function displayCelebrityWithImage(bestMatch) {
    const { celebrity, percentage } = bestMatch;
  
    document.getElementById("celebrityName").textContent = celebrity.name;
    document.getElementById("celebrityDescription").textContent = celebrity.description;
    document.getElementById("matchPercentage").textContent = percentage + "% Match!";
  
    addCelebrityImage(celebrity);
  
    console.log(`✅ Displaying ${celebrity.name} with image: ${celebrity.image}`);
  }
  
  function addCelebrityImage(celebrity) {
    let img = document.getElementById("celebrityImage");
  
    if (!img) {
      img = document.createElement("img");
      img.id = "celebrityImage";
      img.className = "celebrity-image";
  
      const celebrityCard = document.getElementById("celebrityCard");
      const celebrityName = document.getElementById("celebrityName");
      celebrityCard.insertBefore(img, celebrityName);
    }
  
    console.log(`🔄 Loading image: ${celebrity.image}`);
  
    img.onload = function () {
      console.log(`✅ Successfully loaded ${celebrity.name}'s image`);
      this.style.opacity = "1";
    };
  
    img.onerror = function () {
      console.log(`❌ Could not load image: ${celebrity.image}`);
      this.src = createPlaceholderImage(celebrity.name);
      this.style.opacity = "1";
    };
  
    img.style.opacity = "0";
    img.src = celebrity.image;
    img.alt = celebrity.name;
  }
  
  function calculateBestMatch() {
    let bestCelebrity = celebrities[0];
    let highestScore = 0;
  
    celebrities.forEach(celebrity => {
      let score = 0;
  
      userTraits.forEach(userTrait => {
        if (celebrity.traits.includes(userTrait)) {
          score++;
        }
      });
  
      if (score > highestScore) {
        highestScore = score;
        bestCelebrity = celebrity;
      }
    });
  
    const percentage = Math.max(Math.round((highestScore / userTraits.length) * 100), 60);
  
    return {
      celebrity: bestCelebrity,
      percentage: percentage
    };
  }
  
  function restartQuiz() {
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
  
    currentQuestion = 0;
    userTraits = [];
    selectedAnswer = null;
  }
  