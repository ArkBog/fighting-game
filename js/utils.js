let timer = 60;
let timerId;
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if(timer === 0){
    determineWinner({player, enemy})
  }}
