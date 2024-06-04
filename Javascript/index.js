const easyQuestions = [
{
	question: "What is sun",
	answers: [
			{text: "star", correct: true},
			{text: "planet", correct: false},
			{text: "asteroid", correct: false}
		]
},
{
	question: "What is potato",
	answers: [
			{text: "fruit", correct: false},
			{text: "vegetable", correct: true},
			{text: "fungi", correct: false}
		]
},
{
	question: "What is cat",
	answers: [
			{text: "object", correct: false},
			{text: "person", correct: false},
			{text: "animal", correct: true}
		]
},
{
	question: "What shape is earth",
	answers: [
			{text: "flat", correct: false},
			{text: "sphere", correct: true},
			{text: "donkey", correct: false}
		]
},
{
	question: "1 + 1 is equal to",
	answers: [
			{text: "11", correct: false},
			{text: "a number", correct: false},
			{text: "2", correct: true}
		]
}
];

const questionElement = document.getElementById('questions');
const answerButtons = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQIndex = 0;
let score = 0;

function startQuiz() {
	currentQIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();

	let currentQ = easyQuestions[currentQIndex];
	let questionNo = currentQIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQ.question;

	currentQ.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	resetState();
	questionElement.innerHTML = `Score: ${score} out of ${easyQuestions.length}`;
	nextButton.innerHTML = "Try again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQIndex++;
	if (currentQIndex < easyQuestions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQIndex < easyQuestions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});

startQuiz();