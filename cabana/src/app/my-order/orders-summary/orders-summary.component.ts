import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent implements OnInit {
  orders: any[] = [];
  searchText: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Gọi API lấy danh sách orders
    this.orderService.getOrders().subscribe((data) => {
      // Nếu dữ liệu từ backend có các trường: "Order ID", "Status", v.v...
      this.orders = data; // Lưu vào mảng orders
      console.log('Orders:', this.orders); // Debug
    });
  }

  // Ví dụ filter theo searchText, dùng "Order ID" nếu đó là tên trường trong DB
  get filteredOrders() {
    if (!this.searchText) return this.orders;
    return this.orders.filter(o =>
      (o["Order ID"] || '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
