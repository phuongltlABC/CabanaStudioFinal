import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCartComponent implements OnInit {
  cartItems: any[] = [];
  groupedCart: { [brand: string]: any[] } = {};
  totalPrice: number = 0;
  totalTemp: number = 0;
  selectedItemCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items.map(item => ({ ...item, selected: false }));
      this.groupCartItems();
      this.totalPrice = cart.totalPrice;
    });
  }

  groupCartItems(): void {
    this.groupedCart = this.cartItems.reduce((acc, item) => {
      (acc[item.brand] = acc[item.brand] || []).push(item);
      return acc;
    }, {});
  }

  updateQuantity(productId: string, event: any): void {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.loadCart();
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.groupedCart = {};
    this.totalPrice = 0;
  }

  toggleBrandSelection(brand: string): void {
    if (brand === 'all') {
      const allSelected = this.cartItems.every(item => item.selected);
      this.cartItems.forEach(item => item.selected = !allSelected);
    } else {
      const allBrandSelected = this.groupedCart[brand].every(item => item.selected);
      this.groupedCart[brand].forEach(item => item.selected = !allBrandSelected);
    }
    this.updateTotalTemp();
  }

  toggleSelection(productId: string): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.selected = !item.selected;
    }
    this.updateTotalTemp();
  }

  updateTotalTemp(): void {
    const selectedItems = this.cartItems.filter(item => item.selected); // Thêm dòng này để khai báo biến
    this.totalTemp = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.selectedItemCount = selectedItems.length;
  }
  

  createOrder(): void {
    const selectedItems = this.cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
  
    const order = {
      items: selectedItems,
      totalPrice: this.totalTemp,
      createdAt: new Date()
    };
  
    this.cartService.setOrder(order);
  
    console.log("Navigating to checkout..."); // ✅ Kiểm tra xem hàm có chạy đến đây không
    
    this.router.navigate(['/check-out']).then(success => {
      if (success) {
        console.log("Navigation success!"); // ✅ Nếu thành công, in ra console
      } else {
        console.error("Navigation failed!"); // ❌ Nếu thất bại, in lỗi
      }
    });
  }
}  
