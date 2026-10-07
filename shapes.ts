// 1. Интерфейс Shape (Абстракция)
// Принцип I (Interface Segregation): Интерфейс содержит только необходимые методы.
// Принцип D (Dependency Inversion): Высокоуровневые модули будут зависеть от этой абстракции.
interface Shape {
  area(): number;
  perimeter(): number;
}

// 2. Конкретные реализации фигур
// Принцип S (Single Responsibility): Каждый класс отвечает только за расчеты своей фигуры.
// Принцип L (Liskov Substitution): Любая из этих фигур может быть использована вместо Shape.

class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public area(): number {
    return this.width * this.height;
  }

  public perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Triangle implements Shape {
  private a: number;
  private b: number;
  private c: number;

  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  public area(): number {
    // Формула Герона
    const p = this.perimeter() / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
  }

  public perimeter(): number {
    return this.a + this.b + this.c;
  }
}

// 3. Коллекция фигур
// Принцип D (Dependency Inversion): Класс зависит от интерфейса Shape, а не от конкретных классов.
// Принцип O (Open/Closed): Мы можем добавлять новые фигуры, не меняя код этого класса.
class ShapeCollection {
  private shapes: Shape[];

  constructor() {
    this.shapes = [];
  }

  public add(shape: Shape): void {
    this.shapes.push(shape);
  }

  public totalArea(): number {
    // Используем reduce для элегантного суммирования (или цикл for)
    return this.shapes.reduce((total, shape) => total + shape.area(), 0);
  }

  public totalPerimeter(): number {
    return this.shapes.reduce((total, shape) => total + shape.perimeter(), 0);
  }
}

// --- Пример использования ---

const collection = new ShapeCollection();

collection.add(new Circle(5));
collection.add(new Rectangle(4, 6));
collection.add(new Triangle(3, 4, 5));

console.log(`Общая площадь: ${collection.totalArea().toFixed(2)}`);
console.log(`Общий периметр: ${collection.totalPerimeter().toFixed(2)}`);

// Принцип O (Open/Closed):
// Если мы захотим добавить квадрат, мы просто создадим новый класс:
class Square implements Shape {
  constructor(private side: number) {}

  area(): number {
    return this.side * this.side;
  }
  perimeter(): number {
    return 4 * this.side;
  }
}

// И добавим его в коллекцию. Код ShapeCollection менять не нужно.
collection.add(new Square(4));
console.log(`Новая площадь: ${collection.totalArea().toFixed(2)}`);
