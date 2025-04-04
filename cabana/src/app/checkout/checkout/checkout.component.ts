import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalTemp: number = 0;

  relatedProducts = [
    { imageUrl: 'path/to/image1.jpg', name: 'Double Bed & Side Tables', oldPrice: 460000, price: 402000 },
    { imageUrl: 'path/to/image2.jpg', name: 'Double Bed & Side Tables', oldPrice: 460000, price: 402000 },
    { imageUrl: 'path/to/image3.jpg', name: 'Double Bed & Side Tables', oldPrice: 460000, price: 402000 },
    { imageUrl: 'path/to/image4.jpg', name: 'Double Bed & Side Tables', oldPrice: 460000, price: 402000 },
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items.map(item => ({ ...item, selected: true }));
      this.totalPrice = cart.totalPrice;
      this.updateTotalTemp();
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.loadCart();
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  updateTotalTemp(): void {
    this.totalTemp = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  proceedToOrder(): void {
    if (this.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      items: this.cartItems,
      totalPrice: this.totalTemp,
      createdAt: new Date()
    };
    console.log("Order Created: ", order);
  }
}
