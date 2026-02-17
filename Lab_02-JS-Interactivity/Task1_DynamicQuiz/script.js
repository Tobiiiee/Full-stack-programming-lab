// Store questions and answers in variables

var question1 = "What is my name?";
var answer1   = "Ayaan Qazi";

var question2 = "Which keyword declares a block-scoped variable in JavaScript?";
var answer2   = "let";

var question3 = "Which CSS property controls the space inside an element's border?";
var answer3   = "padding";

var question4 = "What does DOM stand for?";
var answer4   = "Document Object Model";

var question5 = "Which method adds an element at the end of a JavaScript array?";
var answer5   = "push()";

// Store all questions in arrays
var questions = [question1, question2, question3, question4, question5];
var answers   = [answer1, answer2, answer3, answer4, answer5];

var options = [
  ["Ayaan Qazi", "Ahmed Fraz", "Huzaif", "Talal"],
  ["var", "let", "define", "set"],
  ["margin", "spacing", "padding", "gap"],
  ["Document Object Model", "Data Output Module", "Dynamic Object Manager", "Display Object Map"],
  ["push()", "pop()", "shift()", "append()"]
];

// Build the quiz using DOM manipulation
function buildQuiz() {
  var container = document.getElementById('quiz-container');
  container.innerHTML = '';

  for (var i = 0; i < questions.length; i++) {
    var block = document.createElement('div');
    block.className = 'question-block';
    block.id = 'block-' + i;

    var questionText = document.createElement('p');
    questionText.textContent = (i + 1) + '. ' + questions[i];
    block.appendChild(questionText);

    for (var j = 0; j < options[i].length; j++) {
      var label = document.createElement('label');
      var radio = document.createElement('input');
      radio.type  = 'radio';
      radio.name  = 'q' + i;
      radio.value = options[i][j];
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + options[i][j]));

      var br = document.createElement('br');
      block.appendChild(label);
      block.appendChild(br);
    }

    var feedback = document.createElement('p');
    feedback.id = 'feedback-' + i;
    block.appendChild(feedback);

    container.appendChild(block);
  }
}

function checkAnswer(index) {
  var selected = document.querySelector('input[name="q' + index + '"]:checked');
  var feedback = document.getElementById('feedback-' + index);

  if (!selected) {
    feedback.textContent  = 'No answer selected.';
    feedback.className    = 'wrong';
    return null;
  }

  if (selected.value === answers[index]) {
    feedback.textContent = ' Correct!';
    feedback.className   = 'correct';
    return true;
  } else {
    feedback.textContent = ' Wrong. Correct answer: ' + answers[index];
    feedback.className   = 'wrong';
    return false;
  }
}

function calculateScore(results) {
  var score = 0;
  for (var i = 0; i < results.length; i++) {
    if (results[i] === true) score++;
  }
  return score;
}

function submitQuiz() {
  var results = [];
  for (var i = 0; i < questions.length; i++) {
    results.push(checkAnswer(i));
  }

  var score   = calculateScore(results);
  var total   = questions.length;
  var message = '';

  if (score === total) {
    message = '  Perfect score';
  } else if (score >= 4) {
    message = '  Great job!';
  } else if (score >= 3) {
    message = '  Good effort';
  } else {
    message = '  Nice try';
  }

  document.getElementById('result').textContent = 'Score: ' + score + ' / ' + total + message;
}

function resetQuiz() {
  buildQuiz();
  document.getElementById('result').textContent = '';
}

// Init
buildQuiz();