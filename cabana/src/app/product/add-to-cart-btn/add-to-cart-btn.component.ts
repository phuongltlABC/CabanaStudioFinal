// add-to-cart-btn.component.ts
import { Component, Input } from '@angular/core';
import { CartService } from '../../service/cart.service';

interface Product {
  productId: string;
  name: string;
  brand: string;
  description: string;
  room: string;
  type: string;
  color: string;
  material: string;
  price: number;
  stock: number;
  status: string;
  discount: object;
  dimensions: object;
  images: string[];
}

@Component({
  selector: 'app-add-to-cart-btn',
  imports: [],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrls: ['./add-to-cart-btn.component.css']
})
export class AddToCartBtnComponent {
  @Input() product: any;
  quantity: number = 1; // Default quantity

  constructor(private cartService: CartService) {}

  addToCart(): void {
    if (this.product) {
      console.log("Thêm sản phẩm kiểm tra", this.product);
      // Gọi phương thức addToCart của CartService và truyền vào CartItem đúng cấu trúc
      this.cartService.addToCart({
        productId: this.product._id || this.product.productId,
        name: this.product.name,
        brand: this.product.brand, // brand cần được truyền vào
        price: this.product.price,
        quantity: this.quantity,
        selected: false, // mặc định là chưa chọn
      });
    }
  }
}