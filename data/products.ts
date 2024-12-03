
export interface Product {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    inStock: boolean;
  }
  

  export const products: Product[] = [
    { id: 1, title: "Classic Burger", imageUrl: "/img/classic-burger.jpg", price: 5.5, inStock: true },
    { id: 2, title: "Supreme Burger", imageUrl: "/img/supreme-burger.jpg", price: 6.99, inStock: true },
    { id: 3, title: "Chicken Burger", imageUrl: "/img/chicken-burger.png", price: 6.4, inStock: true },
    { id: 4, title: "Kingdom Burger", imageUrl: "/img/kingdom-burger.jpg", price: 7.99, inStock: true },
    { id: 5, title: "Coke 25Cl", imageUrl: "/img/coke.png", price: 3.0, inStock: true },
    { id: 6, title: "Pepsi 25Cl", imageUrl: "/img/pepsi.png", price: 3.0, inStock: true },
    { id: 7, title: "Ice Tea 25Cl", imageUrl: "/img/icetea.png", price: 3.0, inStock: false },
    { id: 8, title: "Sprite 25Cl", imageUrl: "/img/sprite.png", price: 3.0, inStock: true },
    { id: 9, title: "Fries", imageUrl: "/img/fries.png", price: 3.1, inStock: true },
    { id: 10, title: "Potatoes", imageUrl: "/img/potatoes.png", price: 3.3, inStock: true },
    { id: 11, title: "Ketchup", imageUrl: "/img/ketchup.png", price: 0.5, inStock: true },
    { id: 12, title: "Mayonnaise", imageUrl: "/img/mayonnaise.png", price: 0.5, inStock: true },
    { id: 13, title: "Ice Xpress", imageUrl: "/img/ice-xpress.png", price: 7.0, inStock: true }
  ];
  