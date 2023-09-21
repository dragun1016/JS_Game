const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score;
let scoreText;
let highscore;
let highscoreText;
let dino;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

class Dino {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;

    //이벤트 리스너 추가
    document.addEventListener("keydown", function (evt) {
      keys[evt.code] = true;
    });
    document.addEventListener("keyup", function (evt) {
      keys[evt.code] = false;
    });
  }

  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();

    var img = new Image();
    if ((keys["ShiftLeft"] || keys["KeyS"]) && this.grounded) {
      img.src = "./Images/dino_down.png";
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    } else {
      img.src = "./Images/dino_up.png";
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Animate() {
    // 키 입력
    if (keys["Space"] || keys["KeyW"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if ((keys["ShiftLeft"] || keys["KeyS"]) && this.grounded) {
      this.y += this.h / 2;
      this.h = this.originalHeight / 2; // / 2;
    } else {
      this.h = this.originalHeight;
    }

    this.y += this.dy;

    //gravity
    if (this.y + this.h < canvas.height) {
      // 공중에 떠 있을 때
      this.dy += gravity; // 중력만큼 dy++
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h; // 바닥에 딱 붙어 있게 해줌
    }

    this.Draw();
  }
}

class Obstacle {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dx = -gameSpeed;
    this.isBird = false;
  }

  Update() {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath;

    var img = new Image();
    if (this.isBird == true) {
      img.src = "./Images/bird.png";
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    } else {
      img.src = "./Images/catus.png";
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
  }
}

class Text {
  constructor(t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.TextAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

function init() {
  let links = "Main.html"
  obstacles = [];

  if(localStorage.getItem('moneys')){
    var lastMoney = localStorage.getItem('moneys')
   }

  localStorage.setItem("sToM", parseInt(lastMoney) + parseInt((score * 300)));

  if(localStorage.getItem('btcC')){
    let btcCoinC = localStorage.getItem('btcC');
    localStorage.setItem("btcCo", parseInt(btcCoinC));
   }
   if(localStorage.getItem('lskC')){
    let lskCoinC = localStorage.getItem('lskC');
    localStorage.setItem("lskCo", parseInt(lskCoinC));
   }
   if(localStorage.getItem('mtlC')){
    let mtlCoinC = localStorage.getItem('mtlC');
    localStorage.setItem("mtlCo", parseInt(mtlCoinC));
   }
   if(localStorage.getItem('ethC')){
    let ethCoinC = localStorage.getItem('ethC');
    localStorage.setItem("ethCo", parseInt(ethCoinC));
   }
   if(localStorage.getItem('neoC')){
    let neoCoinC = localStorage.getItem('neoC');
    localStorage.setItem("neoCo", parseInt(neoCoinC));
   }
   if(localStorage.getItem('qtumC')){
    let qtumCoinC = localStorage.getItem('qtumC');
    localStorage.setItem("qtumCo", parseInt(qtumCoinC));
   }
   if(localStorage.getItem('xrpC')){
    let xrpCoinC = localStorage.getItem('xrpC');
    localStorage.setItem("xrpCo", parseInt(xrpCoinC));
   }
//.....
  score = 0;
  spawnTimer = initialSpawnTimer;
  gameSpeed = 3;
  location.href = links;

  window.localStorage.setItem("highscore", highscore);
}

function SpawnObstacle() {
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let obstacle = new Obstacle(
    canvas.width + size,
    canvas.height - size,
    size,
    size,
    "#2484E4"
  );

  if (type == 1) {
    obstacle.y -= dino.originalHeight - 10;
    obstacle.isBird = true;
  }
  obstacles.push(obstacle);
}

function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highscore = 0;

  if (localStorage.getItem("highscore")) {
    highscore = localStorage.getItem("highscore");
  }

  dino = new Dino(25, canvas.height - 150, 50, 50, "pink");

  scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");

  highscoreText = new Text(
    "HighScore: " + highscore,
    canvas.width - 150,
    25,
    "right",
    "#212121",
    "20"
  );
  //   dino.Draw();
  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  requestAnimationFrame(Update);
  //   dino.Animate();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.Animate();

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    console.log(obstacles);
    spawnTimer = initialSpawnTimer - gameSpeed * 8;

    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }

  // 장애물 생성

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.w < 0) {
      obstacles.splice(i, 1);
    }

    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      init();
    }

    o.Update();
  }
  score++;
  scoreText.t = "Score: " + score;
  scoreText.Draw();

  if (score > highscore) {
    highscore = score;
    highscoreText.t = "Highscore: " + highscore;
  }

  highscoreText.Draw();

  gameSpeed += 0.003;
}

Start();
