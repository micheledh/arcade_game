var colWidth = 101;
var rowHeight = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.initPosition();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.initPosition = function () {
    this.x= -colWidth;
    this.y= rowHeight * (Math.floor(Math.random() * 3) + 1) - 15;
    this.speed = 75 + Math.random() * 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= colWidth * 5){
        this.x += this.speed * dt;
    };
    if (this.x > colWidth * 5) {
        this.initPosition();
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.initPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.initPosition = function() {
    this.x = colWidth * Math.floor(Math.random() * 5);
    this.y = rowHeight * (Math.floor(Math.random() * 2) + 4) - 15;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
// collision --> init
    for (i=0; i<3; i++){
        if (allEnemies[i].y == this.y) { 
            if (this.x <= allEnemies[i].x + 50 && this.x >= allEnemies[i].x - 50) {
            this.initPosition();
            }
        }
    }
 
//win --> init
    if (this.y <= 15) {
        this.initPosition();
    }
};


Player.prototype.handleInput = function(input) {
    if (input == 'up') {
        this.y -= rowHeight; 
    }
    if (input == 'down' && this.y != (rowHeight * 5 - 15)) {
        this.y += rowHeight;
    }
    if (input == 'right' && this.x != colWidth * 4) {
        this.x += colWidth;
    }
    if (input == 'left' && this.x != 0) {
        this.x -= colWidth;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy, new Enemy, new Enemy];
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
