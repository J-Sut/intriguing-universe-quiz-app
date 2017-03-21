//	1) Single State object: 
var state = {
	currentQ: 0, 
	currentScore: 0,
	questions: [
		{ 
			question: "What is the approximate diameter of the Milky Way Galaxy?",
			choices: ["1,000 light years", "10,000 light years",  "100,000 light years",  "1,000,000 light years"],
			ans: "100,000 light years"
		},
		{ 
			question: "Which of the following is smallest?",
			choices: ["A hydrogen atom", "An electron",  "A proton",  "A carbohydrate"],
			ans: "An electron"
		}, 
		{ 
			question: "Where are elements like gold and silver made?",
			choices: ["During super nova star explosions", "In the molten core of the Earth",  "On astroids and comets",  "They can’t be made"],
			ans: "During super nova star explosions"
		},
		{ 
			question: "What is the strongest force in the cosmos?",
			choices: ["Gravity", "Strong Nuclear Force",  "Weak Nuclear Force",  "Electromagnetism"],
			ans: "Strong Nuclear Force"
		},
		{ 
			question: "Which is the largest number?",
			choices: ["# of cells in your body", "# of grains of sand on Earth",  "# base pairs in a strand of human DNA",  "# of stars in the universe"],
			ans: "# of stars in the universe"
		},
	]
};	

//	2) functions that modify state: 

function checkAnswer() {
	$('#scoreboard').removeClass('hide');
	if ($('input[name=opts]:checked', '.quiz').val() === state.questions[state.currentQ].ans) {
		console.log("Correct");
		state.currentScore++;
		state.currentQ++;
		//console.log(state.currentScore);
		renderCorrect();
	} else if ($('input[name=opts]:checked', '.quiz').val() !== state.questions[state.currentQ].ans) {
		console.log("Not quite")
		state.currentQ++;
		renderNotCorrect();
	};
};	


// 3) Functions that render state:
// The render functions should all take two arguments: 
// the state object, and a DOM element to render into.
function renderQuestion() {
	$('.choices').empty();
	var q = state.questions[state.currentQ];
	if (q === undefined) {
		renderFinalScore();
	} else {
		$('.currentQuestion').text(q.question);
		for (var i=0; i< q.choices.length; i++) {
			$('.choices').append('<li>' +
				'<input type="radio" name="opts" id="ans-great-1" value="'+ q.choices[i] +'" >' +
				'<label>'+ q.choices[i] +'</label></li>'); 
		}
	};	
	$('#submit-button').removeClass("hide");
};

function renderCorrect() {
	$('.choices', '.quiz').empty();
	$('.currentQuestion').text("You got it right!");
	$('#submit-button').addClass("hide")
	setTimeout(renderQuestion, 500);
};

function renderNotCorrect() {
	$('.choices', '.quiz').empty();
	$('.currentQuestion').text("Sorry, that's incorrect...");
	$('#submit-button').addClass("hide");
	setTimeout(renderQuestion, 500);
};

function renderScore() {
	$('#scoreboard').text('Score: ' + state.currentScore + '/' + (state.currentQ));
};

function renderFinalScore() {
	$('#quizApp').empty();
	$('#quizApp').text('Your Final Score is ' + state.currentScore + '/' + (state.currentQ));
	$('#play-again').removeClass('hide');

};

// 4) Event listeners
$('#start-button').click(function(){
	$('#quizApp').addClass('active');
	renderQuestion();
	renderScore();
});

$('#submit-button').click(function() {
	checkAnswer();
	renderScore();
});

$('#play-again').click(function() {
	location.reload();
});