
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
}

var player;
var aliens;
var score=40;
var t;
var scoreString="Score \n";
var timer;
var counter=0;
var tevent,logo;
var alien;

function create() {

    //  We only want world bounds on the left and right
    game.physics.setBoundsToWorld();
	this.sky=game.add.sprite(0,0,'bg');
    this.sky.scale.set(3);
    
    
}
var end,restart;
function actionOnClick(){
window.location = 'game.html';
}

function updateCounter(){
     counter++;     
     if(counter>30){
	counter=0;
        check();
     }
	timer.setText('TIME\n' + counter);
}

function update(){
    
 
}

