
class Walker {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.vel.mult(random(3));
    this.mass = m;
    this.r = sqrt(this.mass)*15;
  }

  apply_force(force) {
    // hint : static function to keep the original force the same 
    let f = p5.Vector.div(force, this.mass) 
    this.acc.add(f);
  }

  stop_force() {
    this.acc.set(0,0); 
  }


  edges(){
      // this.r = 16
     if (this.pos.y >= (height - this.r)) {
       this.pos.y = height - this.r ;
       this.vel.y *= -1;
     } 
     if (this.pos.y <= (0 + this.r)) {
       this.pos.y = 0 + this.r ;
       this.vel.y *= -1;
     } 
     if (this.pos.x >= (width - this.r)) {
       this.pos.x = width - this.r ;
       this.vel.x *= -1;
     }

     if (this.pos.x <= (0 + this.r)) {
       this.pos.x = 0 + this.r ;
       this.vel.x *= -1;
       this.vel.y += 0.1;
     }
  }


  walk() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }
}
