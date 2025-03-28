import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  selectedPrice: number = 12000000;
  minPrice: number = 0;
  maxPrice: number = 12000000;

  colors = [
    { name: 'Gray', hex: '#C4C4C4' },
    { name: 'Black', hex: '#000000' },
    { name: 'Dark Blue', hex: '#0056b3' },
    { name: 'Brown', hex: '#8B0000' }
  ];

  selectColor(color: any) {
    console.log('Selected color:', color.name);
  }
  rooms = [
    { name: 'Living Room', count: 8 },
    { name: 'Bedroom', count: 12 },
    { name: 'Kitchen & Dining', count: 36 },
    { name: 'Bathroom', count: 4 },
    { name: 'Home Office', count: 8 }
  ];

  types = [
    { name: 'Beds & Frames', count: 10 },
    { name: 'Chairs & Sofas', count: 15 },
    { name: 'Desks & Tables', count: 8 }
  ];

  materials = [
    { name: 'Oak Wood', count: 12 },
    { name: 'Stainless Metal', count: 36 },
    { name: 'Titanium', count: 6 }
  ];

  products = [
    { name: 'Double Bed & Side Tables', price: 460000, discount: 13, img: 'assets/img-product/breeze-grey-hanging-egg-chair-1.jpg' },
    { name: 'Modern Wooden Table', price: 350000, discount: 10, img: 'assets/img-product/corner-wall-mounted-shelf-1.jpg' },
    { name: 'Luxury Sofa Set', price: 780000, discount: 15, img: 'assets/img-product/novara-2-door-shoe-cabinet(1).jpg' }
  ];
  
}
