let winner = false;
let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let audio1 = document.querySelector('.audio_1');
let audio2 = document.querySelector('.audio_2');
let audio3 = document.querySelector('.audio_3');
let span = document.querySelector('span');
span.innerText = 'π§βπ»';
audio1.volume = 1;
audio2.volume = 1;
audio3.volume = 1;
let turnCount = 0;
let botThink = false;
let allCase = document.querySelectorAll('.case');//toutes les cases
for (let i = 0; i < allCase.length; i++) {//cycle qui travaille le nombre de fois le nombre de case
    allCase[i].onclick = function () {//quand on appuie sur n'importe quelle case, une fonction dΓ©marre
        if (allCase[i].innerText == '' && botThink == false && winner == false) {
            allCase[i].innerText = 'π§βπ»';
            span.innerText = 'π»';
            turnCount = turnCount + 1;
            audio3.play();
            gameHaveWin('π§βπ»');
            botThink = true;
            if (turnCount < 9 && winner == false) {
                setTimeout(() => {
                    botTurn();
                }, 1500);
            }
        } else {
            allCase[i].classList.add('error');
            audio1.play()
            setTimeout(() => {
                allCase[i].classList.remove('error');
            }, 300);
        }
    }
}

function botTurn() {
    for (let i = 0; i < combinations.length; i++) {
        if (botThink == true) {
            let [a, b, c] = combinations[i];
            if (allCase[a].innerText == 'π»' && allCase[b].innerText == 'π»' && allCase[c].innerText == '') {
                botMoving(allCase[c]);
            } else if (allCase[a].innerText == 'π»' && allCase[b].innerText == '' && allCase[c].innerText == 'π»') {
                botMoving(allCase[b]);
            } else if (allCase[a].innerText == '' && allCase[b].innerText == 'π»' && allCase[c].innerText == 'π»') {
                botMoving(allCase[a]);
            }
        }
    }
    for (let i = 0; i < combinations.length; i++) {
        if (botThink == true) {
            let [a, b, c] = combinations[i];
            if (allCase[a].innerText == 'π§βπ»' && allCase[b].innerText == 'π§βπ»' && allCase[c].innerText == '') {
                botMoving(allCase[c]);
            } else if (allCase[a].innerText == 'π§βπ»' && allCase[b].innerText == '' && allCase[c].innerText == 'π§βπ»') {
                botMoving(allCase[b]);
            } else if (allCase[a].innerText == '' && allCase[b].innerText == 'π§βπ»' && allCase[c].innerText == 'π§βπ»') {
                botMoving(allCase[a]);
            }
        }

    }
    if (botThink == true) {
        let randomNumber = Math.floor(Math.random() * (8 - 0 + 1) + 0);//variable dans laquelle apparait un nombre alΓ©atoire de 0 Γ  8
        if (allCase[randomNumber].innerText == '') {//si la case est numΓ©rotΓ©e du mΓͺme chiffre que randomNumber et qu'elle est vide
            botMoving(allCase[randomNumber]);
        } else {//sinon si la case est occupΓ©e
            botTurn()//on redΓ©marre la fonction
        }
    }

}

function botMoving(choiceCase) {
    choiceCase.innerText = 'π»';//dans la case qu'a choisi le bot, on met un emodji grizzli
    span.innerText = 'π§βπ»';
    turnCount = turnCount + 1;//on ajoute 1 aux nombres de tours
    botThink = false;//on change la variable pour montrer que bot a fait son tour
    audio2.play();
    gameHaveWin('π»');
}

function gameHaveWin(emodji) {
    if (turnCount > 4) {
        console.log("winnerTest");
        for (let i = 0; i < combinations.length; i++) {
            let [a, b, c] = combinations[i];
            if (allCase[a].innerText == emodji && allCase[b].innerText == emodji && allCase[c].innerText == emodji) {
                winner = true;
                setTimeout(() => {
                    alert('Le gagnant est: ' + emodji);
                    reset(emodji);
                }, 500);
            }
        }
        if (winner == false && turnCount == 9) {
            setTimeout(() => {
                alert('Γ©galitΓ©');
                reset();
            }, 500);
        }
    }
}

function reset(winnerEmodji) {
    for (let i = 0; i < allCase.length; i++) {
        allCase[i].innerText = '';
    }
    winner = false;
    botThink = false;
    turnCount = 0;
    if (winnerEmodji == 'π§βπ»') {
        span.innerText = 'π»';
        botThink = true;
        botTurn();
    } else {
        span.innerText = 'π§βπ»';
    }
}
