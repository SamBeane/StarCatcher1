ar star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._sizeX = 30;
        obj._sizeY = 30;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._img = new Image();
        obj._img.src="images/Star.png";
        return obj;
    },

    setImage: function(img){
        this._img.src=img;
    },
    setSize: function(width,height){
        this._sixeX = width 
        this._sizeY = height
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
}; 


window.onload = function() {
    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
    w = canvas.width = 800,
    h = canvas.height = 500;

    var gameOn = false, gameStart = true, pause = true;
    var sc = 5, deadstars=0;
    var hiS = 0
    //load images
    var background = new Image();
    background.src="images/background.jpg";
    var ship1 = new Image();
    ship1.src="images/spaceship1.png";
    var ship2 = new Image();
    ship2.src="images/spaceship2.png";
    var p1Score=0;
    var p2Score=0;

     // our stars are created using a single array with a class of information
    function createStars(sc) {
        starCount=sc;
        starArray=[];

        // Create an array of stars
        for (var i = 0; i < starCount; i++) {
            // this assigns each element in the array all the information for the star by 
            // using the 'star' class, pass the starting x,y locations 
            //  and speeds into the array.
            if (i<starCount/2) {starArray.push(star.create(20,3*i+50,Math.random()*5,Math.random()*5));}
            else { starArray.push(star.create(w-55,3*i+50,-Math.random()*5,Math.random()*5));}
        }
    } //end of createStars functions

    createStars(sc);

    // player info
    var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;



    // moving stars around the screen and update the players movement
    function starsUpdate () {
        ctx.drawImage(background,0,0,w,h);
        
    //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            starArray[i].update();
            if (starArray[i]._visible) {ctx.drawImage(starArray[i]._img, starArray[i]._x, starArray[i]._y, starArray[i]._sizeX, starArray[i]._sizeY);}
            if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed;}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed;}
                    // checking for collisions!!!
            var d1=Math.sqrt(Math.pow(p1x-starArray[i]._x,2)+Math.pow(p1y-starArray[i]._y,2));
            var d2=Math.sqrt(Math.pow(p2x-starArray[i]._x,2)+Math.pow(p2y-starArray[i]._y,2));
            if (d1<20) {scoring(i,1);}
            if (d2<20) {scoring(i,2);}
        }//endFor
    } //stars update close

    var keysDown = [];

    addEventListener("keyup", function (e) {

        if (e.keyCode == 38) { //  (key: up arrow) 
            p1y-=10;
        }
        if (e.keyCode == 40) { //  (key: down arrow)
            p1y+=10;
        }
        if (e.keyCode == 37) { //  (key: left arrow)
            p1x-=10;
        }
        if (e.keyCode == 39) { //  (key: right arrow)
            p1x+=10;
        }
    }, false);

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {

        if (e.keyCode == 87) { //  (key: w )
            p2y-=10;
        }
        else if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        else if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        else if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }
        else if (e.keyCode == 32) { //  (key: space)
            gameOn = !gameOn;
            pause = !pause;
            main();
        }
        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 


    //player movement
    function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
        }
        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
        }
        if (p1y>h-40) {p1y=h-45};
        if (p1x>w-40) {p1x=w-45};
        if (p1x<0) {p1x=5};
        if (p1y<0) {p1y=5};
        //player 1 restrictions
        if (p2y>h-40) {p2y=h-45};
        if (p2x>w-40) {p2x=w-45};
        if (p2x<0) {p2x=5};
        if (p2y<0) {p2y=5};
        //player 2 restrictions

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
        }
        //draw images of ships
        ctx.drawImage(ship1, p1x, p1y, 40, 40);
        ctx.drawImage(ship2, p2x, p2y, 40, 40);
    } //close player update

     //  scoring functions to place and score stars
     function scoring(k,wp) {
        deadstars++;
        starArray[k]._visible=false;
        starArray[k]._x = w +200;
        starArray[k]._xSpeed = 0;
        if (wp==1) {
            // need to place a small star next to player 1 score
            p1Score++;
            $("#p1ScoreDisp").text(p1Score);
        }
        else if (wp==2) {
            p2Score++;
            $("#p2ScoreDisp").text(p2Score);
        }
        if (deadstars == sc) {
            gameOn = false;
            deadstars=0
            sc = sc+5;
            createStars(sc);
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle="rgba(250,0,0,.4)";
            ctx.fillRect(0,0,w,h);
            ctx.fillStyle="white";
            ctx.font="30px Serif";
            ctx.fillText("New Level - Ready - Go",w/4,h/2);    

            if (sc>24){
                if (p1Score>p2Score) {gameOver(1);}
                if (p2Score>p1Score) {gameOver(2);}
            }
            setTimeout(function() {gameOn=true; main();},3000);
        }
    }// close scoriing
    
    function starter() {
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle="black";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="white";
        ctx.fillText("Press Spacebar to Begin Game",w/4,h/2)
        ctx.font="30px Serif";
        gameStart=false;
    }
    
    function paused() {
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle="darkblue";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="white";
        ctx.fillText("Press Spacebar to Resume Game",w/4,h/2)
        ctx.font="30px Serif";
    } //close paused
    
    function gameOver(wp) {
        if (p1Score>hiS) {
            hiS=p1Score;
            $("#hiScore").text(hiS)
            
        }
        if (p2Score>hiS) {
            hiS=p2Score;
            $("#hiScore").text(hiS)
            
        }
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle="rgba(250,0,0,.4)";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="white";
        ctx.font="30px Serif";
        if (wp==2) {
            ctx.fillText("Game Over, Player Two Wins",w/4,h/2);
        } 
        if (wp==1) {
            ctx.fillText("Game Over, Player One Wins",w/4,h/2);
        }
        
        gameOn = false;
        setTimeout(function() {restarter()},3000);
    } //end gameOver

    function restarter() {
        pause = true;
        p1Score = 0, p2Score =0;
        sc = 5, deadstars = 0;
        $("#p1ScoreDisp").text(p1Score);
        $("#p2ScoreDisp").text(p2Score);
        starter();
        createStars(sc);
    }


    // call out main function
    function main(){
        ctx.clearRect(0,0,w,h);
        starsUpdate();
        playerUpdate();
        //requestAnimationFrame(main);
        if (gameOn) {requestAnimationFrame(main);}
        if (pause) {paused();}
        if (gameStart) {starter();}
    }
    main();
} //close onload window



