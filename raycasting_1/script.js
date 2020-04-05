


let walls=[];
let ray;
let partical;
let xoff = 0;
let yoff = 1000;


function setup() {
    createCanvas(windowWidth - 50, windowHeight-50);

    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1,y1,x2,y2);
    }

    walls.push(new Boundary(0,0,width,0));
    walls.push(new Boundary(0,0,0,height));
    walls.push(new Boundary(0,height,width,height));
    walls.push(new Boundary(width,0,width,height));

    partical = new Partical();      
}

function draw() {
    background(20);
    for (let wall of walls) {
        stroke(255)
        strokeWeight(1)
        wall.show(); 
    }

    partical.update( noise(xoff)*width, noise(yoff)*height);
    if (mouseIsPressed) {
        partical.update( mouseX, mouseY);
    }
    
    // the light 
    stroke(255,255,255, 10);
    strokeWeight(4)
    partical.look(walls);
    
    // the light ball
    // stroke(255,255,255);
    fill(255,255,100,100);
    strokeWeight(1)
    partical.show();


    xoff += 0.01;
    yoff += 0.01;
  }
  