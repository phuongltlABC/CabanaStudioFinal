// my-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule],
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.totalPrice = cart.totalPrice;
    });
  }

  updateQuantity(productId: string, event: any): void {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.totalPrice = cart.totalPrice;
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
