// //******* walker ********/
function setup() {
  createCanvas(400, 400);
  background(0);
  walker = new Walker(200, 200);
//   background(0);
}

function draw() {
  background(0);

  
  let gravity = createVector(0 , 0.1);
  walker.apply_force(gravity);
  if (mouseIsPressed) {    
      let wind = createVector(mouseX , mouseY);
      wind.sub(walker.pos.x,walker.pos.y);
      wind.limit(0.1)

      // outwards force
      // wind.mult(-1)

      walker.apply_force(wind);

      
      // draw zigzag
      line(mouseX, mouseY, walker.pos.x, walker.pos.y)
    }
  
  walker.edges();
  
  walker.walk();
  
  // undo gravity for infinite bounce to have the original vel??
  
  // gravity *= -1;
  // walker.walk();
  // walker.apply_force(gravity);

  // stop the forces from adding up
  walker.stop_force();


  walker.show();

}
