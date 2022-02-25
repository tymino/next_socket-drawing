const socket = io('http://localhost:3000');
// const socket = io();

//initializing the canvas
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  W = window.innerWidth,
  H = window.innerHeight;

var keys = {};

window.addEventListener(
  'keydown',
  function (e) {
    keys[e.keyCode] = true;
  },
  false,
);

//check if key is not being pressed or has lifted up
window.addEventListener(
  'keyup',
  function (e) {
    delete keys[e.keyCode];
  },
  false,
);

//game loop to make the game smoother
function gameLoop() {
  if (keys[38]) {
    socket.emit('pressed', 38);
    console.log('You are UP');
  }
  if (keys[40]) {
    socket.emit('pressed', 40);
    console.log('You are DOWN');
  }
  if (keys[37]) {
    socket.emit('pressed', 37);
    console.log('You are LEFT');
  }
  if (keys[39]) {
    socket.emit('pressed', 39);
    console.log('You are RIGHT');
  }
  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);

//the connected user joins and gets all the players on server
socket.on('welcome', function (currentUser, currentUsers) {
  console.log(currentUser);

  ctx.globalCompositeOperation = 'source-over';
  //Lets reduce the opacity of the BG paint to give the final touch
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, W, H);

  //Lets blend the particle with the BG
  ctx.globalCompositeOperation = 'lighter';

  //players in lobby
  for (var i = 0; i < currentUsers.length; i++) {
    ctx.beginPath();

    //Time for some colors
    var gradient = ctx.createRadialGradient(
      currentUsers[i].x,
      currentUsers[i].y,
      0,
      currentUsers[i].x,
      currentUsers[i].y,
      currentUsers[i].radius,
    );
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.4, 'white');
    gradient.addColorStop(0.4, currentUsers[i].color);
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, false);
    ctx.fill();
  }

  //player
  ctx.beginPath();
  //Time for some colors
  var gradient = ctx.createRadialGradient(
    currentUser.x,
    currentUser.y,
    0,
    currentUser.x,
    currentUser.y,
    currentUser.radius,
  );
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(0.4, 'white');
  gradient.addColorStop(0.4, currentUser.color);
  gradient.addColorStop(1, 'black');

  ctx.fillStyle = gradient;
  ctx.arc(currentUser.x, currentUser.y, currentUser.radius, Math.PI * 2, false);
  ctx.fill();
});

//other users get updated with new players when teh new player joins
socket.on('currentUsers', function (currentUsers) {
  ctx.globalCompositeOperation = 'source-over';
  //Lets reduce the opacity of the BG paint to give the final touch
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

  //Lets blend the particle with the BG
  ctx.globalCompositeOperation = 'lighter';

  for (var i = 0; i < currentUsers.length; i++) {
    ctx.beginPath();

    //Time for some colors
    var gradient = ctx.createRadialGradient(
      currentUsers[i].x,
      currentUsers[i].y,
      0,
      currentUsers[i].x,
      currentUsers[i].y,
      currentUsers[i].radius,
    );
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.4, 'white');
    gradient.addColorStop(0.4, currentUsers[i].color);
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, false);
    ctx.fill();
  }
  console.log('A new User has joined');
});

//if a player leaves, everyone gets new set of players
socket.on('playerLeft', function (currentUsers) {
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'source-over';
  //Lets reduce the opacity of the BG paint to give the final touch
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

  //Lets blend the particle with the BG
  ctx.globalCompositeOperation = 'lighter';

  for (var i = 0; i < currentUsers.length; i++) {
    ctx.beginPath();

    //Time for some colors
    var gradient = ctx.createRadialGradient(
      currentUsers[i].x,
      currentUsers[i].y,
      0,
      currentUsers[i].x,
      currentUsers[i].y,
      currentUsers[i].radius,
    );
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.4, 'white');
    gradient.addColorStop(0.4, currentUsers[i].color);
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, false);
    ctx.fill();
  }
  console.log('A Player Has left');
});

socket.on('PlayersMoving', function (players) {
  ctx.globalCompositeOperation = 'source-over';
  //Lets reduce the opacity of the BG paint to give the final touch
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, W, H);

  //Lets blend the particle with the BG
  ctx.globalCompositeOperation = 'lighter';

  var players = players;
  var i = 0;
  function allPlayers() {
    for (i; i < players.length; i++) {
      ctx.beginPath();

      //Time for some colors
      var gradient = ctx.createRadialGradient(
        players[i].x,
        players[i].y,
        0,
        players[i].x,
        players[i].y,
        players[i].radius,
      );
      gradient.addColorStop(0.5, 'white');
      gradient.addColorStop(0.5, players[i].color);
      gradient.addColorStop(1, 'black');

      ctx.fillStyle = gradient;
      ctx.arc(players[i].x, players[i].y, players[i].radius, Math.PI * 2, false);
      ctx.fill();
    }
  }
  allPlayers();
});
