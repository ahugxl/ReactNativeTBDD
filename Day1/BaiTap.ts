// 1. Create a class Person with attributes name and age. Write a method to display this information.
class Person {
  constructor(public name: string, public age: number) {}
  displayInfo() {
    console.log(`Person: ${this.name}, Age: ${this.age}`);
  }
}
console.log("1. Person");
const p = new Person("Alice", 30);
p.displayInfo();

// 2. Write a class Student extending Person with an additional attribute grade. Add a method to display all info.
class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }
  displayAllInfo() {
    console.log(`Student: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}
console.log("\n2. Student");
const s1 = new Student("Bob", 16, "10th");
s1.displayAllInfo();

// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
class Car {
  constructor(public brand: string, public model: string, public year: number) {}
  showInfo() {
    console.log(`Car: ${this.brand} ${this.model} (${this.year})`);
  }
}
console.log("\n3. Car");
const car = new Car("Toyota", "Corolla", 2020);
car.showInfo();

// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
  perimeter() {
    return 2 * (this.width + this.height);
  }
}
console.log("\n4. Rectangle");
const rect = new Rectangle(4, 5);
console.log("Area:", rect.area(), "Perimeter:", rect.perimeter());

// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
  constructor(public balance: number = 0) {}
  deposit(amount: number) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }
  withdraw(amount: number) {
    if (amount <= 0) throw new Error("Withdraw must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }
}
console.log("\n5. BankAccount");
const acct = new BankAccount(100);
acct.deposit(50);
acct.withdraw(30);
console.log("Balance:", acct.balance);

// 6. Create a class Book with attributes title, author, year.
class Book {
  constructor(public title: string, public author: string, public year: number) {}
}
console.log("\n6. Book");
const book = new Book("1984", "George Orwell", 1949);
console.log(book.title, book.author, book.year);

// 7. Write a class User with private property name and getter/setter.
class User {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  set name(newName: string) {
    if (!newName) throw new Error("Name cannot be empty");
    this._name = newName;
  }
}
console.log("\n7. User getter/setter");
const user = new User("Charlie");
console.log("Name:", user.name);
user.name = "Charles";
console.log("Updated name:", user.name);

// 8. Create a Product class with name, price. Create an array of products and filter products with price > 100.
class Product {
  constructor(public name: string, public price: number) {}
}
console.log("\n8. Product filter");
const products = [
  new Product("Pen", 5),
  new Product("Headphones", 120),
  new Product("Monitor", 220),
  new Product("Notebook", 15),
];
const expensive = products.filter(p => p.price > 100);
console.log("Expensive products:", expensive.map(p => p.name));

// 9. Define an interface Animal with name and method sound().
interface AnimalInterface {
  name: string;
  sound(): string;
}
console.log("\n9. Animal interface usage");
const animalLike: AnimalInterface = { name: "Generic", sound: () => "..." };
console.log(animalLike.name, animalLike.sound());

// 10. Create a class Account with public, private and readonly fields.
class AccountExample {
  public id: number;
  private secret: string;
  readonly createdAt: Date;
  constructor(id: number, secret: string) {
    this.id = id;
    this.secret = secret;
    this.createdAt = new Date();
  }
  revealSecret() {
    // private field accessible inside class
    return this.secret;
  }
}
console.log("\n10. AccountExample");
const accEx = new AccountExample(1, "super-secret");
console.log("Created at:", accEx.createdAt);
console.log("Reveal secret:", accEx.revealSecret());
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
class AnimalBase {
  constructor(public name: string) {}
}

class Dog extends AnimalBase {
  bark() {
    return `${this.name} says: Woof!`;
  }
}

class Cat extends AnimalBase {
  meow() {
    return `${this.name} says: Meow!`;
  }
}
console.log("\n11. Dog/Cat bark/meow");
const d = new Dog("Rex");
const c = new Cat("Mittens");
console.log(d.bark());
console.log(c.meow());

// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
interface Flyable {
  fly(): string;
}
interface Swimmable {
  swim(): string;
}

class Bird implements Flyable {
  constructor(public name: string) {}
  fly() {
    return `${this.name} is flying`;
  }
}

class Fish implements Swimmable {
  constructor(public name: string) {}
  swim() {
    return `${this.name} is swimming`;
  }
}
console.log("\n12. Flyable/Swimmable");
const b = new Bird("Sparrow");
const f = new Fish("Goldie");
console.log(b.fly());
console.log(f.swim());
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
abstract class Shape {
  abstract area(): number;
  // 25. Create a class Shape with a static method describe(), also satisfies item 25
  static describe() {
    return "A Shape has area() that concrete shapes must implement.";
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }
  area() {
    return this.side * this.side;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}
console.log("\n13 & 25. Shape (abstract) and static describe");
console.log(Shape.describe());
const sq = new Square(3);
const cir = new Circle(2);
console.log("Square area:", sq.area(), "Circle area:", cir.area().toFixed(2));

// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
class Employee {
  constructor(public name: string) {}
  work() {
    return `${this.name} is working.`;
  }
}

class Manager extends Employee {
  manageTeam() {
    return `${this.name} is managing the team.`;
  }
}

class Developer extends Employee {
  writeCode() {
    return `${this.name} is writing code.`;
  }
}
console.log("\n14. Employee, Manager, Developer");
const mgr = new Manager("Dana");
const dev = new Developer("Eli");
console.log(mgr.manageTeam());
console.log(dev.writeCode());

// 15. Create a Library class that can store Book and User objects. Add method to add books.
class Library {
  books: Book[] = [];
  users: User[] = [];
  addBook(b: Book) {
    this.books.push(b);
  }
  addUser(u: User) {
    this.users.push(u);
  }
}
console.log("\n15. Library add Book/User");
const lib = new Library();
lib.addBook(book);
lib.addUser(user);
console.log("Library books:", lib.books.map(b => b.title));
console.log("Library users:", lib.users.map(u => u.name));

// 16. Create a generic class Box that can store any type of value.
class Box<T> {
  constructor(private value: T) {}
  getValue() {
    return this.value;
  }
  setValue(v: T) {
    this.value = v;
  }
}
console.log("\n16. Box generic");
const numberBox = new Box<number>(42);
console.log("Box value:", numberBox.getValue());
numberBox.setValue(84);
console.log("Box new value:", numberBox.getValue());

// 17. Write a singleton Logger class that logs messages to console.
class Logger {
  private static _instance: Logger | null = null;
  private constructor() {}
  static get instance() {
    if (!Logger._instance) Logger._instance = new Logger();
    return Logger._instance;
  }
  log(message: string) {
    console.log(`[Logger] ${message}`);
  }
}
console.log("\n17. Singleton Logger");
Logger.instance.log("Hello singleton");

// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
class MathUtil {
  static add(a: number, b: number) {
    return a + b;
  }
  static subtract(a: number, b: number) {
    return a - b;
  }
  static multiply(a: number, b: number) {
    return a * b;
  }
  static divide(a: number, b: number) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}
console.log("\n18. MathUtil static");
console.log("Add:", MathUtil.add(2, 3), "Divide:", MathUtil.divide(10, 2));

// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
class AnimalPolymorph {
  constructor(public name: string) {}
  sound() {
    return `${this.name} makes a sound.`;
  }
}

class DogPoly extends AnimalPolymorph {
  sound() {
    return `${this.name} barks.`;
  }
}

class CatPoly extends AnimalPolymorph {
  sound() {
    return `${this.name} meows.`;
  }
}
console.log("\n19. Polymorphism");
const animals: AnimalPolymorph[] = [new DogPoly("Rex"), new CatPoly("Whiskers")];
animals.forEach(a => console.log(a.sound()));

// 20. Write a Vehicle interface and implement it in Car and Bike classes.
interface Vehicle {
  start(): string;
  stop(): string;
}

class CarVehicle implements Vehicle {
  constructor(public brand: string) {}
  start() {
    return `${this.brand} car started.`;
  }
  stop() {
    return `${this.brand} car stopped.`;
  }
}

class Bike implements Vehicle {
  constructor(public brand: string) {}
  start() {
    return `${this.brand} bike started.`;
  }
  stop() {
    return `${this.brand} bike stopped.`;
  }
}
console.log("\n20. Vehicle");
const myCar = new CarVehicle("Honda");
const myBike = new Bike("Giant");
console.log(myCar.start(), myBike.start());

// 21. Generic Repository
class Repository<T> {
  private items: T[] = [];
  add(item: T) {
    this.items.push(item);
  }
  getAll() {
    return [...this.items];
  }
}
console.log("\n21. Repository generic");
const repo = new Repository<Product>();
repo.add(new Product("Mouse", 25));
repo.add(new Product("Keyboard", 45));
console.log("Repo items:", repo.getAll().map(i => i.name));

// 22. Create a class Stack with push, pop, peek, isEmpty methods.
class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}
console.log("\n22. Stack");
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop(), "IsEmpty:", stack.isEmpty());

// 23. Create an interface Payment with method pay(amount). Implement CashPayment and CardPayment.
interface Payment {
  pay(amount: number): string;
}

class CashPayment implements Payment {
  pay(amount: number) {
    return `Paid ${amount} in cash`;
  }
}

class CardPayment implements Payment {
  constructor(private cardNumber: string) {}
  pay(amount: number) {
    // naive mask
    const masked = this.cardNumber.slice(-4).padStart(this.cardNumber.length, "*");
    return `Paid ${amount} with card ${masked}`;
  }
}
console.log("\n23. Payment implementations");
const cash = new CashPayment();
const card = new CardPayment("1234567890123456");
console.log(cash.pay(50), card.pay(150));

// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
abstract class Appliance {
  abstract turnOn(): string;
}

class Fan extends Appliance {
  turnOn() {
    return "Fan is turned on";
  }
}

class AirConditioner extends Appliance {
  turnOn() {
    return "AirConditioner is turned on";
  }
}
console.log("\n24. Appliance implementations");
const fan = new Fan();
const ac = new AirConditioner();
console.log(fan.turnOn(), ac.turnOn());

// 26. Create a class Order with list of products. Add method to calculate total price.
class Order {
  constructor(public products: Product[] = []) {}
  totalPrice() {
    return this.products.reduce((s, p) => s + p.price, 0);
  }
  addProduct(p: Product) {
    this.products.push(p);
  }
}
console.log("\n26. Order total");
const order = new Order([new Product("TV", 300), new Product("Cable", 20)]);
console.log("Order total:", order.totalPrice());

// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }
  introduce() {
    console.log(`I am ${this.name}, I teach ${this.subject}.`);
  }
}
console.log("\n27. Teacher extends Person");
const teacher = new Teacher("Thinh", 40, "Math");
teacher.introduce();

// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
class AnimalProtected {
  constructor(public name: string) {}
  protected makeSound() {
    return `${this.name} makes sound`;
  }
}

class Dog2 extends AnimalProtected {
  makeSound() {
    return `${this.name} barks loudly`;
  }
  callSound() {
    return this.makeSound();
  }
}

class Cat2 extends AnimalProtected {
  makeSound() {
    return `${this.name} purrs`;
  }
  callSound() {
    return this.makeSound();
  }
}
console.log("\n28. Protected makeSound override");
const dog2 = new Dog2("Buddy");
const cat2 = new Cat2("Luna");
console.log(dog2.callSound(), cat2.callSound());

// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
interface Movable {
  move(speed: number): string;
}

class CarMovable implements Movable {
  constructor(public model: string) {}
  move(speed: number) {
    return `${this.model} car is moving at ${speed} km/h`;
  }
}

class Robot implements Movable {
  constructor(public id: string) {}
  move(speed: number) {
    return `Robot ${this.id} moves at ${speed} m/s`;
  }
}
console.log("\n29. Movable");
const movableCar = new CarMovable("Tesla");
const robot = new Robot("R2D2");
console.log(movableCar.move(120), robot.move(3));
// 30. Create a class School with list of Students and Teachers. Add method to display info.
class School {
  constructor(public students: Student[] = [], public teachers: Teacher[] = []) {}
  addStudent(s: Student) {
    this.students.push(s);
  }
  addTeacher(t: Teacher) {
    this.teachers.push(t);
  }
  displayInfo() {
    console.log("Teachers:");
    this.teachers.forEach(t => console.log(` - ${t.name}, Subject: ${t.subject}`));
    console.log("Students:");
    this.students.forEach(s => console.log(` - ${s.name}, Grade: ${s.grade}`));
  }
}
console.log("\n30. School display");
const school = new School();
school.addStudent(new Student("Gina", 15, "9th"));
school.addTeacher(new Teacher("Hank", 50, "History"));
school.displayInfo();







