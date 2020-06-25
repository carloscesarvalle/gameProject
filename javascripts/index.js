

let animationID

let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

let backgroundImage = new Image()
backgroundImage.src = '../images/early-morning-sunrise-in-california-usa.jpg'

let coffeeMagicianImage= new Image()
coffeeMagicianImage.src = '../images/coffee-magician.jpg'

let coffeeMagician = {
    x:canvas.width/2,
    y:canvas.height-180,
    width: 120,
    height: 150,
}

let sleepyGhost = new Image()
sleepyGhost.src = '../images/sleepy-ghost.jpg'

let coffeeCup = new Image()
coffeeCup.src = '../images/coffee-cup.png'

let lifeBar = 10

//Function drawBackground
function drawBackground(){
        ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
        ctx.fillStyle = "black"
        ctx.fillRect(0,canvas.height-30,canvas.width,30)
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
        width: 40,
        height: 40,
    }
    sleepyGhosts.push(oneSleepyGhost)        
}, 500)

function drawSleepyGhosts() {
    
    sleepyGhosts.forEach(oneSleepyGhost => {
        oneSleepyGhost.y++
        ctx.drawImage(sleepyGhost, oneSleepyGhost.x, oneSleepyGhost.y, oneSleepyGhost.width, oneSleepyGhost.height)
    })
}

//Collision --- when coffeeMagician touches the ghost


let coffeeCups =[]

function magicTouch() {

    sleepyGhosts.forEach((oneSleepyGhost,i) => {
    if (coffeeMagician.x < oneSleepyGhost.x + oneSleepyGhost.width &&
        coffeeMagician.x + coffeeMagician.width > oneSleepyGhost.x &&
        coffeeMagician.y < oneSleepyGhost.y + oneSleepyGhost.height &&
        coffeeMagician.height + coffeeMagician.y > oneSleepyGhost.y) {
        coffeeCups.push(oneSleepyGhost)
        sleepyGhosts.splice(i,1)
     }
     else if(oneSleepyGhost.y+oneSleepyGhost.height>=canvas.height){
        sleepyGhosts.splice(i,1)
         lifeBar--
         console.log(lifeBar)
         if(lifeBar===0){
            //  alert('You felt asleep')
             window.cancelAnimationFrame(animationID)
             window.location.href="welcomepage.html"
            //  location.reload()

         }
         
     }
    })
    
    console.log(coffeeCups)
}

function turnIntoCoffeeCup(){
    coffeeCups.forEach(element=> {
        ctx.drawImage(coffeeCup,element.x, element.y, element.width, element.height)
        element.y--  
    })
    
}
//not working --- need help
function whenCoffeeCupTouchesGhost(){
    coffeeCups.forEach((coffeeCup,i) => {
        if (coffeeCup.x < oneSleepyGhost.x + oneSleepyGhost.width &&
            coffeeCup.x + oneSleepyGhost.width > oneSleepyGhost.x &&
            coffeeCup.y < oneSleepyGhost.y + oneSleepyGhost.height &&
            coffeeCup.height + oneSleepyGhost.y > oneSleepyGhost.y) {
                console.log('i turned this ghost into an alarm clock')
            sleepyGhosts.splice(i,1)
         }
     })
}



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











