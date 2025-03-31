import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
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
}
