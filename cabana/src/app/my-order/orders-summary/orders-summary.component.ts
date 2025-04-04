import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe], // Thêm CurrencyPipe
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent implements OnInit {
  orders: any[] = [];
  searchText: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      console.log('Orders:', this.orders);
    });
  }

  get filteredOrders() {
    if (!this.searchText) return this.orders;
    return this.orders.filter(o =>
      (o["Order ID"] || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}