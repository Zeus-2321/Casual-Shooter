// SOUNDS
var myGunshot = new Audio('http://dev.pascalou.co.uk/shooter/audio/laser_sound.m4a');
var enemyFalling = new Audio('http://dev.pascalou.co.uk/shooter/audio/thud.m4a');
var enemyGunshot = new Audio('http://dev.pascalou.co.uk/shooter/audio/laser_sound.m4a');
enemyGunshot.volume = 0.4;

// SOME ESSENTIAL VARIABLES
const gameFrame = document.querySelector("#gameFrame");

var myLifePoints = 100;

function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}


// enemy SHOOTS ME
function enemyShootsMe(enemy) {
    if (enemy) {
        enemy.classList.add("showing");
        setTimeout(function () {
            if (!enemy.classList.contains("dead")) {
                enemyGunshot.play();
                enemy.classList.add("shooting");
                gameFrame.classList.add("enemyShooting");
                updateLifePoints(myLifePoints - 20);
                setTimeout(function () {
                    enemy.classList.remove("shooting");
                    gameFrame.classList.remove("enemyShooting");
                    setTimeout(function () {
                        enemy.classList.remove("showing");
                    }, 150);
                }, 500);
            }
        }, 800);
    }
}

// ELEMENT OF SURPRISE
function randomenemyShots() {

    if (myLifePoints > 0) {

        if (livingEnemies()) {
            var randomenemy = Math.floor(Math.random() * livingEnemies().length);
            var randomDelay = Math.floor(Math.random() * 2000) + 1000;

            setTimeout(function () {
                if (myLifePoints > 0) {
                    enemyShootsMe(livingEnemies()[randomenemy]);
                    randomenemyShots();
                }
            }, randomDelay);
        }

    }

}


// DAMAGE AND DEATH
function updateLifePoints(amount) {
    myLifePoints = amount;
    if (myLifePoints < 1) {
        myLifePoints = 0;
        setTimeout(function () {
            if (livingEnemies().length) {
                gameFrame.classList.add("playerDead");
            }
        }, 500);
    }
    document.getElementById("healthBar").style.width = myLifePoints + "%";
}


// I SHOOT THE Enemies

function iShoot(enemy) {

    /* Consequences on the Enemies */
    enemy.classList.remove("shooting");
    enemy.classList.add("dead");
    enemyFalling.play();

    /* Victory! */
    if (!livingEnemies().length) {
        setTimeout(function () {
            gameFrame.classList.add("playerWon");
        }, 300);
    }
}

// VISUAL AND SOUND EFFECTS WHEN I SHOOT
function myShootingEffects() {
    myGunshot.play();
    gameFrame.classList.add("playerShooting");
    setTimeout(function () {
        gameFrame.classList.remove("playerShooting");
    }, 150);
}


// GETTING THE GAME READY
function newGame() {

    document.querySelectorAll(".enemy").forEach(enemy => {
        enemy.classList = ["enemy"];
    });

    updateLifePoints(100);
    gameFrame.classList = [];

    setTimeout(function () {
        randomenemyShots();
    }, 2000);

}


livingEnemies().forEach(enemy => {

    enemy.addEventListener("click", function () {
        iShoot(enemy);
    });

});