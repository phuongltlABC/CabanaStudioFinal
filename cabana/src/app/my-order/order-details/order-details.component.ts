import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  orderItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderID = this.route.snapshot.paramMap.get('orderID');
    console.log('Order ID from route:', orderID);

    if (orderID) {
      this.orderService.getOrderDetails(orderID).subscribe(data => {
        console.log('Data from API:', data);
        this.order = data.order;
        this.orderItems = data.orderItems;
      }, err => {
        console.error('Error fetching order details:', err);
      });
    }
  }
}
