class Player {
  constructor(name) {
    this.id = 1;
    this.name = name;

    this.x = Math.random() * 500;
    this.y = Math.random() * 500;

    this.r = (Math.random() * 255) >> 0;
    this.g = (Math.random() * 255) >> 0;
    this.b = (Math.random() * 255) >> 0;

    this.color = `rgba(${this.r}, ${this.g}, ${this.b}, .5)`;

    this.radius = Math.random() * 20 + 20;
    this.speed = 5;
  }
}

module.exports = { Player };
