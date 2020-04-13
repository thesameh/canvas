// //******* walker ********/

let walkers = [];
let mu = 0.1;
let dragC = 0.2;
function setup() {
  createCanvas(400, 400);
  background(0);
  for (let i = 0; i < 10; i++) {
    walkers[i] = new Walker(random( width), 0 , random(1,8));
  }


  // walker2 = new Walker(300, 200 , 1);
//   background(0);
}

function draw() {
  background(0);

  fill(255, 125);
  noStroke();
  rect(0,height/2, width, height/2 )


  
  let gravity = createVector(0 , 0.2);

  for (walker of walkers) {
    let w1 = p5.Vector.mult(gravity , walker.mass)
    walker.apply_force(w1);
    
    if (mouseIsPressed) {    
        let wind = createVector(0.1 , 0);
  
        walker.apply_force(wind);
        // walker2.apply_force(wind);
      }
    

      walker.edges();
      walker.walk();
      walker.stop_force();
          if (walker.pos.y > height/2) {
            walker.drag();
          }
    walker.show();
  }


}
