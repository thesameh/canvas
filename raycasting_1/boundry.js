class Boundary {
  constructor(x1,x2,y1,y2) {
      this.a = createVector(x1,x2)
      this.b = createVector(y1,y2)
  }

  show(){
      
      line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}
