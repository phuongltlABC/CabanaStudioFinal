import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductListComponent } from "../product-list/product-list.component";
@Component({
  selector: 'app-product',
  imports: [RouterLink, FormsModule, CommonModule, ProductFilterComponent, ProductListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {


  
  
}
