// //******* walker ********/
function setup() {
  createCanvas(400, 400);
  background(0);
  walker = new Walker(100, 200 , 2);
  walker2 = new Walker(300, 200 , 1);
//   background(0);
}

function draw() {
  background(0);

  
  let gravity = createVector(0 , 0.2);

  let w1 = p5.Vector.mult(gravity , walker.mass)
  let w2 = p5.Vector.mult(gravity , walker2.mass)

  walker.apply_force(w1);
  walker2.apply_force(w2);


  if (mouseIsPressed) {    
      let wind = createVector(0.1 , 0);

      walker.apply_force(wind);
      walker2.apply_force(wind);
    }
  
  walker.edges();
  walker.walk();
  walker.stop_force();
  walker.show();
  
  
  walker2.edges();
  walker2.walk();
  walker2.stop_force();
  walker2.show();

}
