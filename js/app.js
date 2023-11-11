let inputDir ={x:0,y:0};
let speed=5;
let lastPaintTime=0;
var f=1;
let a=2;
let b=16;
let angle=0;
let muteback=document.getElementById("mute");
let mutesound=document.getElementById("icon");
snakeArr=[{x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}];
let food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
let score =0;
const gameSound= new Audio('assets/gamesound.mp3');
const gameoverSound= new Audio('assets/gameover.mp3');
const foodSound = new Audio('assets/food.mp3');
const moveSound = new Audio('assets/move.mp3');
const snakedeadSound=new Audio('assets/snakedead.mp3');
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x==snakeArr[0].x && snake[i].y==snakeArr[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=1 || snake[0].y>=18 || snake[0].y<=1){
        return true;
    }
    return false;
}
function newfood(){
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    snakeArr.forEach((e,index)=>{
        if(e.x==food.x && e.y==food.y)
            newfood();
    })
}
function gameEngine(){
    
    if(isCollide(snakeArr)){
        snakedeadSound.play();
        gameSound.pause();
        gameSound.load();
        // music sound stop
        inputDir={x:0,y:0};
        
        alert('Game Over! 😭\nPress Enter to Play Again 🐍');
        
        gameoverSound.play();
        let a=2;
        let b=16;
        snakeArr=[{x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}];
        angle=0;
        score=0;
        speed=5;
        scoreBox.innerHTML="Score : "+ score;
    }
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        // foodsound
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score : "+ score;
        if(score>HighScoreval){
            HighScoreval=score;
            localStorage.setItem("HighScore",JSON.stringify(HighScoreval));
            HighScoreBox.innerHTML="High Score : "+HighScoreval;
            
        }
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        newfood();
        if(speed<10){
            speed+=0.5;
        }
    }

    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.style.transform=`rotate(${angle}deg) scale(1.7)`;
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// main code
let HighScore=localStorage.getItem("HighScore");
if(HighScore===null){
    HighScoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(HighScoreval));
}
else{
    HighScoreval=JSON.parse(HighScore);
    HighScoreBox.innerHTML="High Score : "+HighScore;
    HighScoreBox.style.right="16.7vw";
}

window.requestAnimationFrame(main);

mutesound.addEventListener('click',function(){
    if(mutesound.classList.contains('fa-volume-high')){
        mutesound.classList.remove('fa-solid','fa-volume-high');
        mutesound.classList.add('fa-solid','fa-volume-xmark');
        muteback.classList.add('dark');
        gameSound.pause();
        f=0;
    }
    else{
        mutesound.classList.remove('fa-solid','fa-volume-xmark');
        mutesound.classList.add('fa-solid','fa-volume-high');
        muteback.classList.remove('dark');
        f=1;
    }
})
window.addEventListener('keydown',e=>{
    // game sound and move sound
    if(f==1)
        gameSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            if(inputDir.y===1)
                return;
            inputDir.x=0;
            inputDir.y=-1;
            angle=180;
            break;
        case "ArrowDown":
            if(inputDir.y===-1)
                return;
            inputDir.x=0;
            inputDir.y=1;
            angle=0;
            break;
        case "ArrowLeft":
            if(inputDir.x===1)
                return;
            inputDir.x=-1;
            inputDir.y=0;
            angle=90;
            break;
        case "ArrowRight":
            if(inputDir.x===-1)
                return;
            inputDir.x=1;
            inputDir.y=0;
            angle=270;
            break;
        default :
            inputDir.x=0;
            inputDir.y=0;
            break;

    }
})

