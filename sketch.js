let truck;
let items = [];
let obstacles = [];
let score = 0;
let gameSpeed = 3;
let truckImg;

function setup() {
  createCanvas(600, 400);
  truck = new Truck();
  for (let i = 0; i < 5; i++) {
    items.push(new Item());
    obstacles.push(new Obstacle());
  }
}

function draw() {
  background(135, 206, 235); // Céu azul
  drawBackground();

  truck.update();
  truck.show();

  for (let item of items) {
    item.update();
    item.show();
    if (truck.collects(item)) {
      score += 10;
      item.respawn();
    }
  }

  for (let obs of obstacles) {
    obs.update();
    obs.show();
    if (truck.hits(obs)) {
      score -= 5;
      obs.respawn();
    }
  }

  drawScore();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    truck.move(-1);
  } else if (keyCode === DOWN_ARROW) {
    truck.move(1);
  }
}

// ===== CLASSES =====

class Truck {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.size = 40;
    this.speed = 40;
  }

  move(dir) {
    this.y += dir * this.speed;
    this.y = constrain(this.y, 0, height - this.size);
  }

  update() {
    // Nada por enquanto
  }

  show() {
    fill(200, 0, 0);
    rect(this.x, this.y, this.size * 1.5, this.size);
  }

  collects(item) collideRectRect(this.x, this.y, this.siz  1.5, this.size,item.x, item.y, item.size, item.size)
  }

  hits(obstacle) {
    return collideRectRect(this.x, this.y, this.size * 1.5, this.size,
                           obstacle.x, obstacle.y, obstacle.size, obstacle.size);
  }
}

class Item {
  constructor() {
    this.size = 20;
    this.respawn();
  }

  respawn() {
    this.x = random(width, width + 300);
    this.y = random(0, height - this.size);
  }

  update() {
    this.x -= gameSpeed;
    if (this.x < -this.size) {
      this.respawn();
    }
  }

  show() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor() {
    this.size = 30;
    this.respawn();
  }

  respawn() {
    this.x = random(width, width + 500);
    this.y = random(0, height - this.size);
  }

  update() {
    this.x -= gameSpeed;
    if (this.x < -this.size) {
      this.respawn();
    }
  }

  show() {
    fill(80);
    rect(this.x, this.y, this.size, this.size);
  }
}

function drawScore() {
  fill(0);
  textSize(20);
  text("Conexão: " + score, 20, 30);
}

function drawBackground() {
  // Campo à esquerda
  noStroke();
  fill(34, 139, 34);
  rect(0, height / 2, width, height / 2);

  // Cidade à direita
  fill(150);
  for (let i = 0; i < 5; i++) {
    rect(450 + i * 20, 200 - i * 30, 15, 100 + i * 30);
  }
}

