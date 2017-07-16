
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});

function preload() {

    game.load.image('1', 'images/1.png');
	game.load.image('2', 'images/2.png');
	game.load.image('3', 'images/3.png');
	game.load.image('4', 'images/4.png');
	game.load.image('5', 'images/5.png');
	game.load.image('6', 'images/6.png');
	game.load.image('7', 'images/7.png');
	game.load.image('8', 'images/8.png');
	game.load.image('9', 'images/9.png');
	game.load.image('10', 'images/10.png');
	game.load.image('11', 'images/11.png');	
    game.load.image('bg', 'images/bg.png');
	game.load.image('grid', 'images/grid.png');	
}

var t;
var timer;
var shape;
var shapes;
var score=40;
var scoreString="Score \n";
function create() {
    
    //  We only want world bounds on the left and right
    game.physics.setBoundsToWorld();
	this.bg=game.add.sprite(0,0,'bg');
    this.bg.scale.set(1.5);
    this.grid=game.add.sprite(window.innerWidth-(window.innerWidth*0.2),45,'grid');
    this.grid.scale.set(1.5);
    shapes = game.add.group();
    shapes.enableBody = true;
    shapes.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            shape = shapes.create(game.rnd.integerInRange(45,(window.innerWidth*0.8-45)), 45, game.rnd.integerInRange(1, 11));
            shape.name = game.rnd.integerInRange(1, 11) + x.toString() + y.toString();
	    shape.checkWorldBounds = true;
            shape.events.onOutOfBounds.add(alienOut, this);
	    //alien.anchor.set(1);    
            
            shape.body.velocity.y = 20 +Math.random() * 100;
        }
    }
    t=game.add.text(10,0,"Level 1",{font:"40px Arial bold",fill:"white",align:"center"});
    timer=game.add.text(window.innerWidth-15,0,'Score '+0,{font:"40px Arial bold",fill:"white"});
    timer.anchor.set(1,0)
    
}
var end,restart;
function actionOnClick(){
window.location = 'game.html';
}
function alienOut(shape) {

    //  Move the alien to the top of the screen again
    shape.reset(game.rnd.integerInRange(45,(window.innerWidth*0.8-45)), 45);
    score-=5;
    t.text="Level 1";
    //  And give it a new random velocity
    shape.body.velocity.y = 20 + Math.random() * 100;
}
function updateCounter(){
     counter++;     
     if(counter>30){
	counter=0;
        check();
     }
	timer.setText('Score ' + counter);
}

function update(){
    
 
}

