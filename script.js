var timer = 60;
var score = 0;
var hitrn = 0;



function increaseScore() {
    score += 10;
    // document.querySelector("#scoreval").textContent = score; 
    var scoreElement = document.querySelector("#scoreval");
    scoreElement.textContent = score;
    scoreElement.classList.add("score-increased");
    playScoreIncreaseSound();
}
function playScoreIncreaseSound() {
    var scoreIncreaseSound = document.getElementById("scoreIncreaseSound");
    scoreIncreaseSound.play();
}

function decreaseScore() {
    if (timer > 0) {
        score -= 5;
        // document.querySelector("#scoreval").textContent = score; 
        var scoreElement = document.querySelector("#scoreval");
        scoreElement.textContent = score;
        scoreElement.classList.add("score-decreased");
        playScoreDecreaseSound(); // Play sound effect
        setTimeout(function() {
            scoreElement.classList.remove("score-decreased");
        }, 500);
    }
}

function playScoreDecreaseSound() {
    var scoreDecreaseSound = document.getElementById("scoreDecreaseSound");
    scoreDecreaseSound.play();
}

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

function makeBubble() {
    var clutter = "";
    var bubbleCount = 133; // Default number of bubbles
    var bubbleSize = 53; // Default bubble size in pixels
    
    // Check if the screen width is less than a certain threshold (e.g., for mobile devices)
    if (window.innerWidth <= 768) { // Adjust the threshold according to your requirements
        bubbleCount = 77; // Reduce the number of bubbles for mobile screens
        bubbleSize = 35;
    }
    
    for (var i = 1; i <= bubbleCount; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble" style="width: ${bubbleSize}px; height: ${bubbleSize}px;">${rn}</div>`;
    }
    
    document.querySelector("#pbtm").innerHTML = clutter;
}


function runTimer() {
    var timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;  
        } else {
            clearInterval(timerint);
            playTimerEndSound();
            var gameOverText = "<div style='text-align: center; padding: 20px; background-color: transparent; border-radius: 10px;'>";
            gameOverText += "<h1 style='color: #ff6347; font-size: 60px; font-weight: bold; margin-bottom: 20px;'>Game Over</h1>";
            gameOverText += "<p style='color: #666; font-size: 30px; font-weight: bold; margin-bottom: 0;'>Total Score: <span style='font-weight: bold; color: #008080;'>" + score + "</span></p>";
            gameOverText += "<p style='color: #666; font-size: 30px; font-weight: bold; margin-bottom: 20px;'>Hope you had fun!!</p>";
            gameOverText += "</div>";
            document.querySelector("#pbtm").innerHTML = gameOverText;
            document.getElementById("restartButton").style.display = "block";
            
        }
    }, 1000);
}

function playTimerEndSound() {
    var timerEndSound = document.getElementById("timerEndSound");
    timerEndSound.play();
}

document.getElementById("restartButton").addEventListener("click", function() {
    // Reset timer, score, hit value, and start the game again
    timer = 60;
    score = 0;
    hitrn = 0;
    document.querySelector("#timerval").textContent = timer;
    document.querySelector("#scoreval").textContent = score;
    document.querySelector("#hitval").textContent = hitrn;
    document.getElementById("restartButton").style.display = "none"; // Hide restart button
    runTimer();
    makeBubble();
    getNewHit();
});

document.querySelector("#pbtm").addEventListener("click", function (dets) {
    var clickednum = Number(dets.target.textContent);
    
    if (clickednum === hitrn) {
        increaseScore();
        makeBubble();
        getNewHit();
    } else {
        decreaseScore();
    }
});


runTimer();
makeBubble();
getNewHit();