import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-information',
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-information.component.html',
  styleUrl: './customer-information.component.css'
})
export class CustomerInformationComponent implements OnInit {
  order: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.order = this.cartService.getOrder(); // Lấy dữ liệu đơn hàng


    }
    createOrder(): void {
      const selectedItems = this.order;
  
      const order = {
        items: selectedItems,
        totalPrice: this.order.totalPrice,
        createdAt: new Date()
      };
      this.cartService.setOrder(order);
    }
  }