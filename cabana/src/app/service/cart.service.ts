import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartItem {
  productId: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
  //call on global
})

export class CartService {
  private cartKey = 'my-cart';
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private totalPriceSubject = new BehaviorSubject<number>(this.calculateTotal());
  private orderData: any = null;

  constructor() {}

  getCart(): Observable<{ items: CartItem[], totalPrice: number }> {
    return new BehaviorSubject({ items: this.cartItems, totalPrice: this.calculateTotal() }).asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.totalPriceSubject.asObservable();
  }

  addToCart(product: CartItem, quantity: number = 1): void {
    console.log("Before Add:", this.cartItems);
    const existingProductIndex = this.cartItems.findIndex(item => item.productId === product.productId);
  
    if (existingProductIndex !== -1) {
      this.cartItems[existingProductIndex].quantity += quantity;
    } else {
      this.cartItems = [...this.cartItems, { ...product, quantity }];
    }
  
    this.saveCart();
    console.log("After Add:", this.cartItems); // Kiểm tra lại giỏ hàng
  }
  
  

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    const product = this.cartItems.find(item => item.productId === productId);
    if (product) {
      product.quantity = quantity > 0 ? quantity : 1;
    }
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
    this.totalPriceSubject.next(this.calculateTotal());
  }
  setOrder(order: any): void {
  this.orderData = order;
}

  getOrder(): any {
  return this.orderData;
}

}
