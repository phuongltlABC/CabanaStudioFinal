import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink], // Thêm CurrencyPipe, DatePipe, RouterLink
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  orderItems: any[] = [];
  errorMessage: string = ''; // Thêm biến thông báo lỗi

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderID = this.route.snapshot.paramMap.get('orderID');
    console.log('Order ID from route:', orderID);

    if (orderID) {
      this.orderService.getOrderDetails(orderID).subscribe(
        data => {
          console.log('Data from API:', data);
          if (data && data.order && data.orderItems) { // Kiểm tra dữ liệu
            this.order = data.order;
            this.orderItems = data.orderItems;
          } else {
            this.errorMessage = 'Invalid data received from server.';
          }
        },
        err => {
          console.error('Error fetching order details:', err);
          this.errorMessage = 'Failed to fetch order details. Please try again later.';
        }
      );
    }
  }
}