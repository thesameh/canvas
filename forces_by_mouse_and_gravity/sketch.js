// //******* walker ********/
function setup() {
  createCanvas(400, 400);
  background(0);
  walker = new Walker(150, 200);
  walker2 = new Walker(300, 200);

}

function draw() {
  background(0);

  
  let gravity = createVector(0 , 0.1);
  walker.apply_force(gravity);
  walker2.apply_force(gravity);

  if (mouseIsPressed) {    
      let wind = createVector(mouseX , mouseY);

      let w1 = p5.Vector.sub(wind , walker.pos).limit(0.2);
      let w2 = p5.Vector.sub(wind , walker2.pos).limit(0.2);

      // outwards force
      // w1.mult(-1)

      walker.apply_force(w1);
      walker2.apply_force(w2);

      // draw zigzag
      line(mouseX, mouseY, walker.pos.x, walker.pos.y)
      line(mouseX, mouseY, walker2.pos.x, walker2.pos.y)
    }
  
  walker.edges();
  walker.walk();
  // stop the forces from adding up
  walker.stop_force();
  walker.show();
 

  walker2.edges();
  walker2.walk();
  // stop the forces from adding up
  walker2.stop_force();
  walker2.show();

}
