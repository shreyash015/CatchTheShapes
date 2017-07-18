
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});

function preload() {

    game.load.image('01', 'images/1.png');
	game.load.image('02', 'images/2.png');
	game.load.image('03', 'images/3.png');
	game.load.image('04', 'images/4.png');
	game.load.image('05', 'images/5.png');
	game.load.image('06', 'images/6.png');
	game.load.image('07', 'images/7.png');
	game.load.image('08', 'images/8.png');
	game.load.image('09', 'images/9.png');
	game.load.image('10', 'images/10.png');
	game.load.image('11', 'images/11.png');	
    game.load.image('bg', 'images/bg.png');
	game.load.image('grid', 'images/grid.png');	
}

var t = "";
var first,second,third,fourth,fifth,sixth,seventh,eighth,nineth,tenth,eleventh;
var scoredata;
var shape;
var shapes,timer,tevent;
var score=0;
var scoreString="Score \n";
var choice = [];
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
        for (var x = 0; x < 12; x++)
        {
            var num = game.rnd.integerInRange(1, 11);
            if(num<10){
                num="0"+num;
            }
            shape = shapes.create(game.rnd.integerInRange(30,(window.innerWidth*0.8-45)), 45, num);
            shape.inputEnabled = true;
            shape.input.useHandCursor = true;
            shape.events.onInputDown.add(record, this);
            // shape.name = game.rnd.integerInRange(1, 11) + x.toString() + y.toString();
            shape.name =num+" : "+ x.toString() + y.toString();
	        shape.checkWorldBounds = true;
            shape.events.onOutOfBounds.add(alienOut, this);
	    //alien.anchor.set(1);    
            
            shape.body.velocity.y = 20 +Math.random() * 100;
        }
    }
    
    var data;
    

        var pos = 80;
    for(var i=0;i<5;i++,pos+=125){
        data=[];
        var num = game.rnd.integerInRange(1, 11);
        if(num<10){
            num="0"+num;
        }
        data.push(game.add.sprite(window.innerWidth-100,pos,num ));
        data[0].name=num;
        num = game.rnd.integerInRange(1, 11);
        if(num<10){
            num="0"+num;
        }
        data.push(game.add.sprite(window.innerWidth-50,pos, num));
        data[1].name=num;
        choice.push(data);
    }
    for(var i=0;i<5;i++){
        for(var j=0;j<2;j++){
            choice[i][j].scale.set(0.5);            
        }
    }
    t=game.add.text(10,0,"Level "+level,{font:"40px Arial bold",fill:"white",align:"center"});
    tevent=game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    scoredata=game.add.text(window.innerWidth-15,0,'Score 00',{font:"40px Arial bold",fill:"white"});
    scoredata.anchor.set(1,0)
    
    
}
var counter = 0;
function updateCounter(){
     counter++;     
     if(counter>20){
    counter=0;
        
     }
    t.setText('Level ' +level+ ' Time '+ counter);
}

var level=1;
var end,restart;


var store=[];
var flag = 0;
function record(shp){
    store.push(shp.name.substr(0,2));
    //t.text=shp.name.substr(0,2) + " : Selected "+store.length;
    //scoredata.text="Score "+score;
    shp.reset(game.rnd.integerInRange(45,(window.innerWidth*0.8-45)), 45);
    shp.body.velocity.y = 20 + Math.random() * 100;
    checkSelection();
    //t.text+= " : Flag "+flag;
    if(flag==1){
        flag=0;
        store = [];
    }else if(store.length>level){
        store = [];
        score-=10;
        scoredata.text="Score "+score;
    }
}

function checkSelection(){    
        for(var i=0;i<store.length;i++){
            //checking in the combination to find the match
            for(var j=0;j<5;j++){
                var k = i;
                while(k<choice[j].length && choice[j][k].name==store[k]){
                    //t.text="chk :"+k+":"+(choice[j].length-1);
                    if(k == choice[j].length-1){
                        score+=20;
                        scoredata.text="Score "+score;
                        var x=0;
                        while(x<=k){

                            var num = game.rnd.integerInRange(1, 11);
                            if(num<10){
                                num="0"+num;
                            }
                            var block = game.add.sprite(window.innerWidth-((1-x)*50+50),80+(120*j), num);                            
                            block.scale.set(0.5);
                            choice[j][x].reset(block); 
                            choice[j][x].name=num;                            
                            x++;
                        }
                        flag=1;
                        return;
                    }
                    k++;                    
                }
            }
        }
}
    


function alienOut(shape) {

    //  Move the alien to the top of the screen again
    var num = game.rnd.integerInRange(1, 11);
            if(num<10){
                num="0"+num;
            }
            var shp;
            shp=shapes.create(game.rnd.integerInRange(30,(window.innerWidth*0.8-45)), 45, num);
            shp.inputEnabled = true;
            shp.input.useHandCursor = true;
            shp.events.onInputDown.add(record, this);
            // shape.name = game.rnd.integerInRange(1, 11) + x.toString() + y.toString();
            shp.name =num+shape.name.substr(2,5);
            shp.checkWorldBounds = true;
            shp.events.onOutOfBounds.add(alienOut, this);
        //alien.anchor.set(1);    
            
            shp.body.velocity.y = 20 +Math.random() * 100;

    //shape.reset(game.rnd.integerInRange(45,(window.innerWidth*0.8-45)), 45);
    //score-=5;
    //t="Level 1";
    ///scoredata.text="Score "+score;
    //  And give it a new random velocity
    shape.body.velocity.y = 20 + Math.random() * 100;
}


function update(){
    if(score>level*50){
        t.text = "Level "+level;
        level++;
    }
 
}

