const vec = function (x = 0, y = 0, z = 0): vector {
    var self: vector = {
      x,
      y,
      z,
      copy: function (other: vector) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
      },
      clone: function () {
        return vec().copy(self);
      },
      add: function (other: vector) {
        self.x = self.x + other.x;
        self.y = self.y + other.y;
        self.z = self.z + other.z;
        return this;
      },
      sub: function (other: vector) {
        self.x = self.x - other.x;
        self.y = self.y - other.y;
        self.z = self.z - other.z;
        return this;
      },
      mult: function (escalar: number) {
        self.x = self.x * escalar;
        self.y = self.y * escalar;
        self.z = self.z * escalar;
        return this;
      },
      div: function (escalar: number) {
        if (escalar == 0) {
          escalar += 0.01;
        }
        return self.mult(1 / escalar);
      },
      dot: function (other: vector) {
        return self.x * other.x + self.y * other.y + self.z * other.z;
      },
      cross: function (other: vector) {
        const tempx = self.y * other.z - self.z * other.y;
        const tempy = self.z * other.x - self.x * other.z;
        const tempz = self.x * other.y - self.y * other.x;
        //self.x = tempx;
        //self.y = tempy;
        //self.z = tempz;
        return vec(tempx, tempy, tempz);
      },
      magSquared: function () {
        return self.dot(self);
      },
      mag: function () {
        return Math.sqrt(self.dot(self));
      },
      setMag: function (newmag: number) {
        if(self.mag()==0) self.x = 1;
        self.mult(newmag / self.mag());
        return this;
      },
      limit: function (uplimit: number) {
        if (self.mag() > uplimit) {
          self.setMag(uplimit);
        }
        return this;
      },
      heading: function () {
        return Math.atan2(self.y, self.x);
      },
      rotate: function (a: number, o: vector = vec(0, 0, 0)) {
        //let newHeading = self.heading() + a;
        let newx = (self.x - o.x) * Math.cos(a) - (self.y - o.y) * Math.sin(a);
        let newy = (self.x - o.x) * Math.sin(a) + (self.y - o.y) * Math.cos(a);
        self.x = newx;
        self.y = newy;
        // const mag = self.mag();
  
        // self.x = Math.cos(newHeading) * mag;
        // self.y = Math.sin(newHeading) * mag;
        return this;
      },
      angleBetween: function angleBetween(v: vector) {
        const dotmagmag = self.dot(v) / (self.mag() * v.mag());
        let angle;
        // Mathematically speaking: the dotmagmag variable will be between -1 and 1
        // inclusive. Practically though it could be slightly outside this range due
        // to floating-point rounding issues. This can make Math.acos return NaN.
        //
        // Solution: we'll clamp the value to the -1,1 range
        angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        angle = angle * Math.sign(self.cross(v).z || 1);
        return angle;
      },
      random2D: function (scl: number = 1) {
        self.x = scl;
        self.y = 0;
        self.z = 0;
        return vec(scl, 0, 0).rotate(Math.random() * Math.PI * 2);
      },
      distanceToSquared: function (other: vector) {
        let temp = vec().copy(self);
        temp.sub(other);
        return temp.magSquared();
      },
      dist: function (other: vector) {
        let temp = vec().copy(self);
        temp.sub(other);
        return temp.mag();
      },
    };
  
    return self;
  };
  
  export type vector = {
    x: number;
    y: number;
    z: number;
    copy: (other: vector) => vector;
    clone: () => vector;
    add: (other: vector) => vector;
    sub: (other: vector) => vector;
    mult: (number: number) => vector;
    div: (number: number) => vector;
    dot: (other: vector) => number;
    cross: (other: vector) => vector;
    magSquared: () => number;
    mag: () => number;
    setMag: (number: number) => vector;
    limit: (number: number) => vector;
    heading: () => number;
    rotate: (number: number, o?: vector) => vector;
    angleBetween: (other: vector) => number;
    random2D: (number: number) => vector;
    distanceToSquared: (other: vector) => number;
    dist: (other: vector) => number;
  };
  
  export { vec };