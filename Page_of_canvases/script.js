// colors

// pink #ec6778 rgb(236, 103, 120)
// blue green #529A86 rgb(82, 154, 134)
// page #FDD2A8  rgb(253, 210, 168)
// orange #c94c22
// red #ab1616
// brown red #944

//! ******** canvas 1 *******//
let sketch = function (p) {
  let walkers = [];
  let i;
  p.setup = function () {
    p.createCanvas(300, 300);
    // p.background(0);
    walker = new Walker(p.width / 2, p.height / 2, 0.3, 6, "#529A86", 42);
    i = 0;
  };
  p.draw = function () {
    p.background("#ec6778");
    walker.walk();
    walker.show();

    walkers.forEach((element) => {
      element.walk();
      element.show();
    });
  };
  //   creat more walkers
  //   setInterval(() => {
  //     walkers[i] = new Walker(200, 200, p.random(0.2,0.5), p.random(2,10) , "random" , p.random(20,70) );
  //     i++;
  //   }, 100);

  let all_points = [];

  class Walker {
    constructor(x, y, a, v, c, r) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(5));
      this.vl = v;
      this.al = a;
      this.ra = r;
      this.cl =
        c == "random"
          ? `rgb(${p.round(p.random(0, 255))} , ${p.round(
              p.random(0, 255)
            )} , ${p.round(p.random(0, 255))})`
          : c;
    }
    walk() {
      let mouse = p.createVector(p.mouseX, p.mouseY);
      this.acc = p5.Vector.sub(mouse, this.pos).limit(this.al);
      this.vel.add(this.acc).limit(this.vl);
      this.pos.add(this.vel);
    }
    show() {
      p.stroke(255)
        .strokeWeight(2)
        .fill(this.cl)
        .ellipse(this.pos.x, this.pos.y, this.ra);
    }
  }
};
new p5(sketch, window.document.getElementById("canvas_block_1"));

//! ******** canvas 2 *******//
let can3 = function (p) {
  let walkers = [];
  let i;
  p.setup = function () {
    p.createCanvas(300, 300);
    // walker = new Walker(10,10,0.3,6,"#529A86",3);
    i = 1;
  };

  p.draw = function () {
    p.background("#ec6778");
    // walker.walk();
    // walker.show();

    walkers.forEach((element) => {
      let point_x;
      if (p.mouseIsPressed) {
        point_x = p.createVector(p.mouseX, p.mouseY);
      } else {
        point_x = p.createVector(p.width / 2, p.height / 2);
      }

      element.walk(point_x);
      element.show();
    });
  };

  // creat more walkers
  let add_walkers = setInterval(() => {
    walkers[i] = new Walker(100, 200, 0.5, 5, "random", i);
    i++;
    if (i == 10) {
      clearInterval(add_walkers);
    }
  }, 500);

  let all_points = [];

  class Walker {
    constructor(x, y, a, v, c, m) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(10, 10);
      this.vl = v;
      this.al = a;
      this.mass = m;
      this.ra = p.sqrt(m) * 20;
      this.cl =
        c == "random"
          ? `rgb(${p.round(p.random(0, 255))} , ${p.round(
              p.random(0, 255)
            )} , ${p.round(p.random(0, 255))})`
          : c;
    }
    walk(point_x) {
      let point = point_x;

      this.acc = p5.Vector.sub(point, this.pos).limit(this.al);

      this.acc.div(this.mass);
      this.vel.add(this.acc).limit(this.vl);
      this.pos.add(this.vel);
    }
    show() {
      p.stroke(255)
        .strokeWeight(2)
        .fill(this.cl)
        .ellipse(this.pos.x, this.pos.y, this.ra);
    }
  }
};
new p5(can3, window.document.getElementById("canvas_block_2"));

//! ******* Canvas 3 ********/
let can2 = function (p) {
  let walkers = [];
  let i;
  p.setup = function () {
    p.createCanvas(300, 300);
    p.background("#529A86");
  };
  p.draw = function () {
    p.translate(10, 10);
    let pos = p.createVector(p.width / 2, p.height / 2);
    let mouse = p5.Vector.random2D();

    mouse.mult(100);
    let v = p5.Vector.sub(pos, mouse);
    p.stroke(255, 10);

    p.strokeWeight(4);
    p.line(0, 0, v.x, v.y);
  };
};
new p5(can2, window.document.getElementById("canvas_block_3"));

// ! ******* Canvas 4 ********/
let can4 = function (p) {
  p.setup = function () {
    p.createCanvas(300, 300);
    walker_can4 = new Walker(100, 100, "#FDD2A8");
    walker2_can4 = new Walker(200, 100, "#FDD2A8");
  };

  p.draw = function () {
    p.background("#529A86");

    let gravity = p.createVector(0, 0.1);

    walker_can4.apply_force(gravity);
    walker2_can4.apply_force(gravity);

    if (p.mouseIsPressed) {
      let pull_force = p.createVector(p.mouseX, p.mouseY);

      let pf1 = p5.Vector.sub(pull_force, walker_can4.pos).limit(0.2);
      let pf2 = p5.Vector.sub(pull_force, walker2_can4.pos).limit(0.2);

      // outwards force
      // w1.mult(-1)

      walker_can4.apply_force(pf1);
      walker2_can4.apply_force(pf2);

      // draw pull line
      p.line(p.mouseX, p.mouseY, walker_can4.pos.x, walker_can4.pos.y);
      p.line(p.mouseX, p.mouseY, walker2_can4.pos.x, walker2_can4.pos.y);
    }

    walker_can4.edges();
    walker_can4.walk();
    // stop the forces from adding up
    walker_can4.stop_force();
    walker_can4.show();

    walker2_can4.edges();
    walker2_can4.walk();
    // stop the forces from adding up
    walker2_can4.stop_force();
    walker2_can4.show();
  };

  class Walker {
    constructor(x, y, cl) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0).mult(2);
      this.acc = p.createVector(0, 0);
      this.r = 16;
      this.cl = cl;
    }

    apply_force(force) {
      this.acc.add(force);
    }

    stop_force() {
      this.acc.set(0, 0);
    }

    walk() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }

    show() {
      p.stroke(255).strokeWeight(2).fill(this.cl);
      p.ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    edges() {
      // this.r = 16
      if (this.pos.y >= p.height - this.r) {
        this.pos.y = p.height - this.r;
        this.vel.y *= -1;
      }
      if (this.pos.y <= 0 + this.r) {
        this.pos.y = 0 + this.r;
        this.vel.y *= -1;
      }
      if (this.pos.x >= p.width - this.r) {
        this.pos.x = p.width - this.r;
        this.vel.x *= -1;
      }

      if (this.pos.x <= 0 + this.r) {
        this.pos.x = 0 + this.r;
        this.vel.x *= -1;
      }
    }
  }
};
new p5(can4, window.document.getElementById("canvas_block_4"));




// ! ******* Canvas 5 ********/
let can5 = function (p) {
  let walls=[];
  let ray;
  let partical;
  let xoff = 0;
  let yoff = 1000;
  
  p.setup = function () {
    p.createCanvas(300, 300);
    p.background("#111");

    for (let i = 0; i < 5; i++) {
      let x1 = p.random(p.width);
      let x2 = p.random(p.width);
      let y1 = p.random(p.height);
      let y2 = p.random(p.height);
      walls[i] = new Boundary(x1,y1,x2,y2);
  }

  walls.push(new Boundary(0,0,p.width,0));
  walls.push(new Boundary(0,0,0,p.height));
  walls.push(new Boundary(0,p.height,p.width,p.height));
  walls.push(new Boundary(p.width,0,p.width,p.height));

  partical = new Partical();  
  }

  p.draw = function () {
    p.background('#111');
    for (let wall of walls) {
        p.stroke(255)
        p.strokeWeight(1)
        wall.show(); 
    }

    partical.update( p.noise(xoff)*p.width, p.noise(yoff)*p.height);
    if (p.mouseIsPressed) {
        partical.update( p.mouseX, p.mouseY);
    }
    
    // the light line
    p.stroke(82, 154, 134, 10);
    p.strokeWeight(4)
    partical.look(walls);
    
    // the light ball
    p.fill(253, 210, 168,100);
    p.strokeWeight(1)
    partical.show();


    xoff += 0.01;
    yoff += 0.01;
  }



  //? classes and objects 

  // the light line
  class Ray {
    constructor(ps,angle) {
      this.pos = ps;
      this.dir = p5.Vector.fromAngle(angle);
    }
  
    look_at(x,y){
      this.dir.x = x- this.pos.x;
      this.dir.y = y - this.pos.y;  
      p.this.dir.normalize();
    }
  
  
    show() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.pop();
    }
  
    cast(wall) {
      const x1 = wall.a.x;
      const y1 = wall.a.y;
      const x2 = wall.b.x;
      const y2 = wall.b.y;
  
      const x3 = this.pos.x;
      const y3 = this.pos.y;
      const x4 = this.pos.x + this.dir.x;
      const y4 = this.pos.y + this.dir.y;
  
      
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den == 0) {
          return;
      }
      
  
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  
      if (t > 0 && t < 1 && u > 0) {
         const pt = p.createVector();
         pt.x = x1+t*(x2-x1);
         pt.y = y1+t*(y2-y1);
         return pt;
      }else{
          return;
      }
    }
    }
  
    // the light source
    class Partical {
      constructor() {
        this.pos = p.createVector(p.width / 2, p.height / 2);
        this.rays = [];
    
        for (let a = 0; a < 360; a += 0.5) {
          this.rays.push(new Ray(this.pos, p.radians(a)));
        }
      }
    
      show() {
       p.ellipse(this.pos.x, this.pos.y, 15);
        for (let ray of this.rays) {
          ray.show();
        }
      }
    
      look(walls) {
        for (let ray of this.rays) {
          let closest = null;
          let record = Infinity;
          for (const wall of walls) {
            const pt = ray.cast(wall);
            if (pt) {
              const d = p5.Vector.dist(this.pos,pt);
              if (d < record) {
                record = d;
                closest = pt;
              }
            }
          }
          if (closest) {
            p.line(this.pos.x, this.pos.y, closest.x, closest.y)
          }
        }
      }
    
      update(x, y) {
        this.pos.set(x, y);
      }
    }

    
    // the wall
    class Boundary {
      constructor(x1,x2,y1,y2) {
          this.a = p.createVector(x1,x2)
          this.b = p.createVector(y1,y2)
      }
    
      show(){
          
        p.line(this.a.x, this.a.y, this.b.x, this.b.y)
      }
    }
  
  }
  







new p5(can5, window.document.getElementById('canvas_block_5'))