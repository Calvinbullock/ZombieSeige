var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 95;
var y = 50;

function drawCircle() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, 2 * Math.PI);
  ctx.stroke();
}

function moveCircle(key) {
  switch (key) {
    case 'W':
      y -= 10;
      break;
    case 'A':
      x -= 10;
      break;
    case 'S':
      y += 10;
      break;
    case 'D':
      x += 10;
      break;
  }

  drawCircle();
}

drawCircle();

function updateGame() {
    // Move the circle randomly (for demonstration purposes)
    x = Math.random() * (c.width - 80) + 40;
    y = Math.random() * (c.height - 80) + 40;
    drawCircle();

}
window.addEventListener('keydown', function(event) {
  var key = event.key.toUpperCase();
  if (['W', 'A', 'S', 'D'].includes(key)) {
    moveCircle(key);
  }
});

setInterval(updateGame, 1600);