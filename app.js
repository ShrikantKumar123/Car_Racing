

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gamearea = document.querySelector('.gamearea');

startScreen.addEventListener('click', start);
let player = { speed: 5, score: 0 };



let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
    e.preventDefault();
    key[e.key] = true;


}
function keyUp(e) {
    e.preventDefault();
    key[e.key] = false;


}
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}

function moveLines() {
    let line = document.querySelectorAll('.line');
    line.forEach(function (item) {
        if (item.y >= 600) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function endgame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final Score Is " + player.score + "<br> Press Here to Start Game. "
}


function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {

        if (isCollide(car, item)) {

            endgame();
        }

        if (item.y >= 650) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}


function gamePlay() {

    let car = document.querySelector('.car')
    let road = gamearea.getBoundingClientRect();
    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (key.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed
        }
        if (key.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed
        }
        if (key.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if (key.ArrowRight && player.x < (road.width - 65)) {
            player.x += player.speed
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";


        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps = player.score - 1;
        score.innerText = " Score : " + ps;
    }
}

function start() {

    startScreen.classList.add('hide');
    gamearea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    // line creation

    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'line');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + "px";
        gamearea.appendChild(roadline);
    }

    // making car image
    let car = document.createElement('div');
    car.setAttribute('class', 'car');

    gamearea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;




    //Enemy car 

    for (x = 0; x < 3; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * -1;
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.backgroundColor = ranColor();
        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gamearea.appendChild(enemycar);
    }

}

// color for enemy car
function ranColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}