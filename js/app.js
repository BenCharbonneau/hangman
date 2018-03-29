function checkLetter(e) {
	let key = e.keyCode;
	if (key > 90 || key < 65) {
		return;
	}

	let letter = alphabet[(key - 65)];

	if (usedLetters.indexOf(letter) > -1) {
		return;
	}

	if (ans.indexOf(letter) > -1) {
		correctLetter(letter);
	}
	else {
		usedLetters.push(letter);
		wrongLetter();
	}
}

function startGame(answer) {
	let sentenceDiv = $('#sentence');
	let letter;
	let amount = answer.length;
	for (let i = 0; i < amount; i++) {
		letter = createLetter(answer[i]);
		letter.css('width',calcWidth(amount));
		sentenceDiv.append(letter);
	}

	ctx.beginPath()
	ctx.rect(630,380,170,50);
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(640,380);
	ctx.lineTo(640,50);
	ctx.lineTo(720,50);
	ctx.lineTo(720,70);
	ctx.stroke();
	ctx.closePath();
}

function createLetter(letter) {
	let letterDiv = $('<div>');
	letterDiv.addClass('letter');
	if (letter !== " ") {
		letterDiv.css('border-bottom','1px solid black');
	}
	return letterDiv;
}

function calcWidth(tot) {
	return ((100-tot)/tot)+"%";
}

function correctLetter(letter) {
	let letDivs = $('.letter');
	for(let i = 0; i < ans.length; i++) {
		if (letter === ans[i]) {
			letDivs.eq(i).text(letter.toUpperCase());
		}
	}
	ansArr = ansArr.filter((e) => {
		return e !== letter;
	})

	console.log(ansArr);

	if (ansArr.length === 0) {
		setTimeout(() => {
			alert("You won!");
		},500);
	}
}

function wrongLetter() {
	hangman.drawBodyPart();
}








let alphabet = 'abcdefghijklmnopqrstuvwxyz'
const usedLetters = [];

let ans = prompt("Pick a phrase or word for your friend:");
ans = ans.toLowerCase();
let ansArr = [];

for (let word of ans.split(' ')) {
	for (let letter of word) {
		ansArr.push(letter);
	}
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hangman = {
	bodyParts: ['head','leftArm','rightArm','torso','leftLeg','rightLeg'],
	head: {
		x: 720,
		y: 100,
		r: 30
	},
	leftArm: {
		x1: 720,                                       
		y1: 140,
		x2: 680,
		y2: 200
	},
	rightArm: {
		x1: 720,
		y1: 140,
		x2: 760,
		y2: 200
	},
	torso: {
		x1: 720,
		y1: 130,
		x2: 720,
		y2: 250
	},
	leftLeg: {
		x1: 720,
		y1: 250,
		x2: 680,
		y2: 370
	},
	rightLeg: {
		x1: 720,
		y1: 250,
		x2: 760,
		y2: 370
	},
	drawBodyPart() {
		let part = this.bodyParts.shift();
		ctx.beginPath();

		if (part === 'head') {
			ctx.arc(this[part].x,this[part].y,this[part].r,0,Math.PI*2);
			ctx.strokeStyle = "#000000"
			ctx.stroke();
		}
		else {
			ctx.moveTo(this[part].x1,this[part].y1);
			ctx.lineTo(this[part].x2,this[part].y2);
			
			
			ctx.strokeStyle = "#000000";
			ctx.stroke();
		}

		ctx.closePath();

		if(this.bodyParts.length === 0) {
			setTimeout(() => {
				alert("You lose!");
			},500);
		}
	}
}

startGame(ans);

document.addEventListener('keydown',checkLetter);