
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});

function preload() {

    game.load.image('ship', 'images/mouth.png');
    game.load.image('logo','images/logoSA.png');
    game.load.image('alien','images/1.png');
    game.load.image('bg','images/sky.png');
    game.load.image('start','images/start.png');
    game.load.image('ok','images/ok.png');
    game.load.image('gameover','images/end.png');
    game.load.image('smile','images/mouthopen.png');
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
    this.sky.scale.set(2);
    
    logo=game.add.sprite(game.world.centerX,70,'logo');
    logo.anchor.set(0.5);
    logo.scale.set(0.4);
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    player.scale.set(window.innerWidth*0.0005);
    game.physics.arcade.enable(player);

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            alien = aliens.create(x*window.innerWidth, y * 10, 'alien');
            alien.name = 'alien' + x.toString() + y.toString();
            alien.checkWorldBounds = true;
            alien.events.onOutOfBounds.add(alienOut, this);
	    //alien.anchor.set(1);
	    alien.scale.set(0.3);
            
            alien.body.velocity.y = 50 + Math.random() * 200;
        }
    }
    
    t=game.add.text(10,0,scoreString+score,{font:"40px Arial bold",fill:"white",align:"center"});
    timer=game.add.text(window.innerWidth-15,0,'TIME \n'+0,{font:"40px Arial bold",fill:"white"});
    timer.anchor.set(1,0)
    tevent=game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    
    
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

function check(){
     end=game.add.text(game.world.centerX,200,'Game Over\nScore '+score,{font:"40px Arial bold",fill:"yellow",align:"center"});
     end.anchor.set(0.5);
     restart=game.add.text(game.world.centerX,300,'Wanna Play Again',{font:"40px Arial bold",fill:"black",align:"center"});
     restart.anchor.set(0.5);
     //  Removes the timer, starting with the top one and working down
        game.time.events.remove(tevent);
        player.body.moves=false;	
	this.start= game.add.button(game.world.centerX,400,'start',actionOnClick, this,2, 1, 0);
    this.start.anchor.set(0.5);
    this.start.scale.set(1.5);
    this.start.inputEnable=true;
    this.gameover= game.add.button(game.world.centerX,500,'gameover',actionOnEnd, this,2, 1, 0);
    this.gameover.anchor.set(0.5);
    
    this.gameover.inputEnable=true;
    
	
}

function actionOnEnd(){
window.location = 'index.php';
}

function update(){
    
    if (game.physics.arcade.distanceToPointer(player, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(player, 300);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        player.body.velocity.set(0);
    }
    game.physics.arcade.overlap(aliens, player, collision, null, this);
    
}
function collision(player,aliens){    
    score+=10;
    t.text=scoreString+score;
    aliens.reset(Math.random()*window.innerWidth, 0);
    aliens.body.velocity.y = 20 + Math.random() * 100;    
}
function alienOut(alien) {

    //  Move the alien to the top of the screen again
    alien.reset(Math.random()*window.innerWidth, 0);
    score-=5;
    t.text=scoreString+score;
    //  And give it a new random velocity
    alien.body.velocity.y = 20 + Math.random() * 100;

}

