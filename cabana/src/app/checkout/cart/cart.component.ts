import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FeatureProductComponent } from "../../homepage/feature-product/feature-product.component";
import { Router } from 'express';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FeatureProductComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Cập nhật tên đúng của styleUrls
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalTemp = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.totalTemp = cart.totalPrice;
    });
  }

  /** Xóa sản phẩm khỏi giỏ hàng */
  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.updateTotal();
  }

  /** Cập nhật số lượng sản phẩm */
  updateQuantity(item: any, change: number): void {
    const updatedItem = this.cartItems.find(i => i.productId === item.productId);
    if (updatedItem) {
      updatedItem.quantity = Math.max(1, updatedItem.quantity + change); // Không cho phép số lượng < 1
    }
    this.updateTotal();
  }

  /** Cập nhật tổng tiền */
  updateTotal(): void {
    this.totalTemp = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /** Tạo đơn hàng */
  createOrder(): void {
    const selectedItems = this.cartItems;

    const order = {
      items: selectedItems,
      totalPrice: this.totalTemp,
      createdAt: new Date()
    };
    this.cartService.setOrder(order);
  }
}
