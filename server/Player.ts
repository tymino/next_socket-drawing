export default class Player {
  id: string;
  name: string;
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  color: string;
  radius: number;
  speed: number;

  constructor(id: string) {
    this.id = id;
    this.name = 'user';

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
