import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, AddToCartBtnComponent,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  productId: string = '';  
  product: any = {};  
  isLoading: boolean = true;  // Cờ để kiểm tra xem dữ liệu có đang được tải hay không
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
     // Lấy tham số id từ URL
     this.productId = this.route.snapshot.paramMap.get('productId')!;
     console.log('productId:', this.productId);  // Kiểm tra giá trị productId
 
     // Gọi API để lấy chi tiết sản phẩm
     this.productService.getProductById(this.productId).subscribe(
       (data) => {
         this.product = data;
         this.isLoading = false;
       },
       (error) => {
         console.error('Lỗi khi tải chi tiết sản phẩm:', error);
         this.isLoading = false;
       }
     );
   }
  }



