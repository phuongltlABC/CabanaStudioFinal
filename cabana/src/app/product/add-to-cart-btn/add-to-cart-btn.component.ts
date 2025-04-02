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
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        productId: this.product.productId,
        name: this.product.name,
        price: this.product.price,
        quantity: 1
      });
    }
  }
}

