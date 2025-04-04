import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  order: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.order = this.cartService.getOrder(); // Lấy dữ liệu đơn hàng


    }}
