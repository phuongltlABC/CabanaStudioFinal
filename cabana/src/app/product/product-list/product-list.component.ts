import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, AddToCartBtnComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];  // Danh sách sản phẩm
  displayedProducts: any[] = []; // Danh sách sản phẩm hiển thị
  itemsPerPage: number = 12; // Số sản phẩm mỗi lần hiển thị
  currentIndex: number = 0; // Chỉ số sản phẩm hiện tại
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.displayedProducts = this.products.slice(0, this.itemsPerPage); // Hiển thị 12 sản phẩm đầu tiên
      },
      (error) => {
        console.error(' Lỗi khi tải sản phẩm:', error);
      }
    );
  };
  loadMore(): void {
    const currentLength = this.displayedProducts.length;
    const nextLength = currentLength + this.itemsPerPage;
    
    this.displayedProducts = this.products.slice(0, nextLength);
  };
  get progressPercentage(): number {
    return (this.displayedProducts.length / this.products.length) * 100;
  }
}
