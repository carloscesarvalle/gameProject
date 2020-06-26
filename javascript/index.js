

let animationID

let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

let backgroundImage = new Image()
backgroundImage.src = '../images/early-morning-sunrise-in-california-usa.jpg'

let coffeeMagicianImage= new Image()
coffeeMagicianImage.src = '../images/coffee-magician.jpg'

let coffeeMagician = {
    x:canvas.width/3,
    y:canvas.height-180,
    width: 120,
    height: 150,
}

let sleepyGhost = new Image()
sleepyGhost.src = '../images/sleepy-ghost2.png'

let coffeeCup = new Image()
coffeeCup.src = '../images/coffee-cup.png'

let lifeBar = 10

let score = 0

let totalSleepyGhostTurned = 0

//Function drawBackground
function drawBackground(){
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canvas.width,canvas.height)
}

///Function drawCoffeeMagician
function drawCoffeeMagician() {
    ctx.drawImage(coffeeMagicianImage, coffeeMagician.x, coffeeMagician.y, coffeeMagician.width, coffeeMagician.height)
}


//Draw sleepyGhost and push them into the array. This has to happen regularly, so I'll use setInterval
let sleepyGhosts = []

setInterval (() => {
  
    let oneSleepyGhost = {
        x: (canvas.width-60)*Math.random(),
        y: 0,
        width: 60,
        height: 60,
    }
    sleepyGhosts.push(oneSleepyGhost)        
}, 1000)

function drawSleepyGhosts() {
    
    sleepyGhosts.forEach(oneSleepyGhost => {
        oneSleepyGhost.y++
        ctx.drawImage(sleepyGhost, oneSleepyGhost.x, oneSleepyGhost.y, oneSleepyGhost.width, oneSleepyGhost.height)
    })
}

//Collision --- when coffeeMagician touches the ghost one time


let coffeeCups =[]

function magicTouch(){

    sleepyGhosts.forEach((oneSleepyGhost,i) => {
    if (coffeeMagician.x < oneSleepyGhost.x + oneSleepyGhost.width &&
        coffeeMagician.x + coffeeMagician.width > oneSleepyGhost.x &&
        coffeeMagician.y < oneSleepyGhost.y + oneSleepyGhost.height &&
        coffeeMagician.height + coffeeMagician.y > oneSleepyGhost.y) {
        coffeeCups.push(oneSleepyGhost)
        sleepyGhosts.splice(i,1)
        score+=2
        document.querySelector("#total-score").innerText = score
        totalSleepyGhostTurned+=1
        document.querySelector("#total-sleepy-ghost-turned").innerText = totalSleepyGhostTurned
        if (score ===100) {
            window.location.href="winnerpage.html"
        }
     }
     else if(oneSleepyGhost.y+oneSleepyGhost.height>=canvas.height){
        sleepyGhosts.splice(i,1)
         lifeBar--
         document.querySelector("#life-bar").innerText = lifeBar
         document.querySelector("#total-score").innerText = score
         console.log(lifeBar)
         if(lifeBar===0){
             window.cancelAnimationFrame(animationID)
             window.location.href="loserpage.html"
            //  console.log(lifeBar)
            //  location.reload()
         }        
        }
    })
    // console.log(coffeeCups)
}

function turnIntoCoffeeCup(){
    coffeeCups.forEach((element,ind)=> {
        ctx.drawImage(coffeeCup,element.x, element.y, element.width, element.height) 
        if (element.y + element.height < 0) {
            coffeeCups.slice(ind,1)
        } else {
            element.y--
        }
    }
    )   
}

//Turn a sleepyGhost into a coffee cup when it touches a coffee cup
function whenCoffeeCupTouchesGhost(){
    coffeeCups.forEach((coffeeCup) => {
        sleepyGhosts.forEach((oneSleepyGhost, i)=> {
            if (coffeeCup.x < oneSleepyGhost.x + oneSleepyGhost.width &&
                coffeeCup.x + oneSleepyGhost.width > oneSleepyGhost.x &&
                coffeeCup.y < oneSleepyGhost.y + oneSleepyGhost.height &&
                coffeeCup.height + oneSleepyGhost.y > oneSleepyGhost.y) {
                coffeeCups.push(oneSleepyGhost)
                sleepyGhosts.splice(i,1)
                score+=1
                document.querySelector("#total-score").innerText = score
                // console.log(`Your score is ${score}`)
                totalSleepyGhostTurned+=1
                document.querySelector("#total-sleepy-ghost-turned").innerText = totalSleepyGhostTurned
                if (score ===100) {
                    window.location.href="winnerpage.html"
                }
            }
        })              
    })
}


//Draw the gray box on the right to display Score
// function drawScorePanel(){
//         ctx.fillStyle = 'grey'
//         ctx.fillRect(canvas.width-500,0,500,canvas.width)
// }
//ctx.fillText gives me an error in the console "is not a function" WTH
// function drawTextScore() {
//     ctx.font = '48px serif';
//     ctx.fillText('Hello world', 10, 50);
//     ctx.font = '48px serif';
//     ctx.strokeText('Hello world', 10, 100);
//   }
// let scoreTotal = 0

// function drawScore (){
//     ctx.score.fillText('0',1665,200)
// }





//Loop to draw images on top of each other --- they trick the eye and create illusion of movement

function animationLoop(){
    
    animationID = window.requestAnimationFrame(animationLoop)
    //delete everything at the beggining of each frame
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBackground()
    drawCoffeeMagician()
    drawSleepyGhosts()
    magicTouch()
    turnIntoCoffeeCup()
    whenCoffeeCupTouchesGhost()       
}

animationLoop()


//keyboard functionality --- to move coffeeMagician

function movePlayer(e) {
    switch(e.key) {
        case "ArrowDown": coffeeMagician.y+=10
        break
        case "ArrowUp": coffeeMagician.y-=10
        break
        case "ArrowRight": coffeeMagician.x+=10
        break
        case "ArrowLeft": coffeeMagician.x-=10
        break
    }
}

document.onkeydown = movePlayer











