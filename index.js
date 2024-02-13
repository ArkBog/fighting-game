const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position:{
    x: 0,
    y: 0
  },
  imageSrc: "./assets/background.png"
})

const shop = new Sprite({
  position:{
    x: 500,
    y: 128
  },
  imageSrc: "./assets/shop.png",
  scale: 2.75,
  framesMax: 6
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "yellow",
  offset: {
    x: +50,
    y: 0,
  },
});

console.log(player);

const keys = {
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({player, enemy, timerId}){
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex"
  if(player.health === enemy.health ){
    document.querySelector("#displayText").innerHTML = "Tie"
  }
  else if (player.health > enemy.health){
    document.querySelector("#displayText").innerHTML = "Player 1 Wins"
  }
  else if (enemy.health > player.health){
    document.querySelector("#displayText").innerHTML = "Player 2 Wins"
  }
}


decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.ArrowRight.pressed && player.lastKey === "ArrowRight") {
    player.velocity.x = 5;
  } else if (keys.ArrowLeft.pressed && player.lastKey === "ArrowLeft") {
    player.velocity.x = -5;
  }

  if (keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 5;
  } else if (keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -5;
  }

  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  if (enemy.health <= 0 || player.health <= 0){
    determineWinner({player, enemy, timerId});
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    case "d":
      keys.d.pressed = true;
      enemy.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      enemy.lastKey = "a";
      break;
    case "w":
      enemy.velocity.y = -20;
      break;
    case "t":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }

  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
});
