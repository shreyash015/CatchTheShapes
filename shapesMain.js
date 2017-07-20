var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update: update});

function preload() {
// pre loading of the images
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
    //setting the background of the game
    this.bg=game.add.sprite(0,0,'bg');
    this.bg.scale.set(1.5);
    //setting the shape combinations grid on the right hand side of the pannel
    //and also dividing the screen into two parts in the ratio 80% and 20%
    this.grid=game.add.sprite(window.innerWidth-(window.innerWidth*0.2),45,'grid');
    this.grid.scale.set(1.5);
    //initializing the sprite group 
    shapes = game.add.group();
    shapes.enableBody = true;
    //setting Phaser.Physics.ARCADE to add motion to the sprites
    shapes.physicsBodyType = Phaser.Physics.ARCADE;
    //forloop to create the group of sprites
    for (var y = 0; y < 1; y++)
    {
        for (var x = 0; x < 12; x++)
        {
            //generating a random number between 1-11 to select the random sprite
            var num = game.rnd.integerInRange(1, 11);
            if(num<10){
                num="0"+num;
            }
            //creating the individual sprite and setting them to random position in the view
            shape = shapes.create(game.rnd.integerInRange(30,(window.innerWidth*0.8-45)), 45, num);
            shape.inputEnabled = true;
            shape.input.useHandCursor = true;
            //setting onInputDown function call( here calling record() function and passing the current instance of the sprite as a parameter)
            shape.events.onInputDown.add(record, this);
            //setting the a unique name to the sprite to identify them uniquely in the view
            shape.name =num+" : "+ x.toString() + y.toString();
            shape.checkWorldBounds = true;
            //setting a check for the sprite when it goes out of bound then call alienOut() function and passing the current instance of the sprite
            shape.events.onOutOfBounds.add(alienOut, this);
            //setting random velocity to the sprite
            shape.body.velocity.y = 20 +Math.random() * 100;
        }
    }
    
    var data;
    
        //creating the list of combinations and also adjusting their positions 
        var pos = 80;
        //for loop to create every combination, here 5
    for(var i=0;i<5;i++,pos+=125){
        data=[];
        var num = game.rnd.integerInRange(1, 11);
        if(num<10){
            num="0"+num;
        }
        //adding first random sprite to data array
        data.push(game.add.sprite(window.innerWidth-150,pos,num ));
        data[0].name=num;
        data[0].scale.set(0.5);
        num = game.rnd.integerInRange(1, 11);
        if(num<10){
            num="0"+num;
        }
        //adding the second random sprite to data array
        data.push(game.add.sprite(window.innerWidth-100,pos, num));
        data[1].name=num;
        data[1].scale.set(0.5); 
        //now adding the random combination of sprites in data array to choice array
        choice.push(data);
    }
    //setting the level info in text at top left pannel
    t=game.add.text(10,0,"Level "+level,{font:"40px Arial bold",fill:"white",align:"center"});
    //initializing the time event and calling updateCounter() every second
    tevent=game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    //setting the score value in text format at the top right corner
    scoredata=game.add.text(window.innerWidth-15,0,'Score 00',{font:"40px Arial bold",fill:"white"});
    scoredata.anchor.set(1,0)
    
    
}
var end,start;
var target = 150;
//by default the counter begins from 90
var counter = 90;
//function to update the counter in decreesing order
function updateCounter(){
     counter--;
     //checking if the counter reached 0          
     if(counter<=0){
        //checking if the score reaches the target or not
        if(score>=target){
            //increasing the level
            level++;
            //resetting the timer but this time 5sec less that earlier
            counter=90-(level*5);
            //setting new target
            target+=150;
        }else{
            //removing the time event to stop the timer
            game.time.events.remove(tevent);
            //calling all the sprites of the group shapes and removing them
            shapes.callAll('kill');
            //setting end comment
            end = game.add.text(window.innerWidth*0.5,window.innerHeight*0.4,"Game Over\nYour Score "+score,{font:"40px Arial bold",fill:"black",align:"center"});
            end.anchor.set(1,0);
            //setting the start text button
            start = game.add.text(window.innerWidth*0.49,window.innerHeight*0.6,"START",{font:"60px Arial bold",fill:"orange",align:"center"});
            start.anchor.set(1,0);
            start.inputEnabled = true;
            start.input.useHandCursor = true;
            //setting onInputDown event to check on Click and call startGame() function
            start.events.onInputDown.add(startGame, this);
        }
        
     }
     //resetting the level,time,target and life values in view
    t.setText('Level ' +level+ ' Time '+ counter+" Target "+target+" Life "+life);
}

function startGame(button) {
    //reload the page
    window.location = 'game.html';
}
var level=1;
var end,restart;


var store=[];
var flag = 0,chk = 0;
//record function to check the shape clicked, if it is corect one or not
function record(shp){
    //adding the clicked sprite name to the store array
    store.push(shp.name.substr(0,2));
    //
    shp.reset(game.rnd.integerInRange(45,(window.innerWidth*0.8-45)), 45);
    shp.body.velocity.y = 20 + Math.random() * 100;
    
    checkSelection();
    //checking if the first selection is correct or not
    if(chk == 0){
        store = [];
        life--;
    }
    //checking for the final selection if it is correct or not
    if(flag==1){
        flag=0;
        store = [];
    }else if(store.length>1){
        store = [];
        life--;        
    }
}
var life = 3;
function checkSelection(){    
        for(var i=0;i<store.length;i++){
            //checking in the combination to find the match
            for(var j=0;j<5;j++){
                //var k = 0;
                chk=0;
                if(store.length == 1){
                    if(choice[j][0].name==store[0]){
                        chk = 1;
                        return;
                    }
                }else{
                    if(choice[j][0].name==store[0] && choice[j][1].name==store[1]){
                        flag = 1;
                        chk=1;
                        score+=20;
                        scoredata.text="Score "+score;
                        for(var l=0;l<2;l++){
                            var num = game.rnd.integerInRange(1, 11);
                            if(num<10){
                                num="0"+num;
                            }
                            //creating the new random sprite to add in the combination
                            var block = game.add.sprite(window.innerWidth-((1-l)*50+100),80+(120*j), num);                            
                            block.scale.set(0.5);
                            //deleting the old combination
                            choice[j][l].destroy(); 
                            //replacing with the new combination in the combination choice list
                            choice[j][l] = block;
                            choice[j][l].name=num;    
                        }
                        return;
                    }
                }
                //looping to compare the shapes in the combination list
                /*
                while(k<store.length && choice[j][k].name==store[k]){
                    if(k == 1){
                        score+=20;
                        scoredata.text="Score "+score;
                        var x=0;
                        //replacting the selected cobination with new random generated combination
                        while(x<=k){
                            var num = game.rnd.integerInRange(1, 11);
                            if(num<10){
                                num="0"+num;
                            }
                            //creating the new random sprite to add in the combination
                            var block = game.add.sprite(window.innerWidth-((1-x)*50+100),80+(120*j), num);                            
                            block.scale.set(0.5);
                            //deleting the old combination
                            choice[j][x].destroy(); 
                            //replacing with the new combination in the combination choice list
                            choice[j][x] = block;
                            choice[j][x].name=num;               
                            x++;
                        }
                        //setting the flag 1 when final selection is also found correct
                        flag=1;
                        return;
                    }
                    //setting the chk flag to 1 when it finds the first match
                    chk=1;
                    k++;                    
                }
                */
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
            //generating another random sprite and bring it to top of the view
            shp=shapes.create(game.rnd.integerInRange(30,(window.innerWidth*0.8-45)), 45, num);
            shp.inputEnabled = true;
            shp.input.useHandCursor = true;
            shp.events.onInputDown.add(record, this);            
            shp.name =num+shape.name.substr(2,5);
            shp.checkWorldBounds = true;
            shp.events.onOutOfBounds.add(alienOut, this); 
            shp.body.velocity.y = 20 +Math.random() * 100;

    //  And give it a new random velocity
    shape.body.velocity.y = 20 + Math.random() * 100;
}


function update(){
    //checking the counter if the score meets the target within the given time and change the level,counter and target accordingly
    if(counter>0 && score>=target){
        level++;
        target+=150;
        counter=90-(level*5);
    }
    //checking if the life becomes 0, and then finish the game
    if(life<=0){
        t.setText('Level ' +level+ ' Time '+ counter+" Target "+target+" Life "+life);
        game.time.events.remove(tevent);
            shapes.callAll('kill');
            //adding the game over comment
            end = game.add.text(window.innerWidth*0.5,window.innerHeight*0.4,"Game Over\nYour Score "+score,{font:"40px Arial bold",fill:"black",align:"center"});
            end.anchor.set(1,0);
            //adding the start text button on the view
            start = game.add.text(window.innerWidth*0.49,window.innerHeight*0.6,"START",{font:"60px Arial bold",fill:"orange",align:"center"});
            start.anchor.set(1,0);
            start.inputEnabled = true;
            start.input.useHandCursor = true;
            start.events.onInputDown.add(startGame, this);
    }
 
}