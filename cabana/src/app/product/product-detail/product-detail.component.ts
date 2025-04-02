import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, AddToCartBtnComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

}
