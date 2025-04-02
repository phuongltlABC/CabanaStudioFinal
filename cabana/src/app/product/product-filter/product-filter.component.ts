import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../service/filter.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-filter',
  standalone: true, 
  imports: [CommonModule,FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit{
  selectedPrice: number = 12000000;
  minPrice: number = 0;
  maxPrice: number = 12000000;
  selectedColor: string = '';
  selectedRooms: string[]=[]; 
  selectedTypes: string[] = []; 
  allProducts: any[] = []; 
  rooms: { name: string; count: number }[] = []; 
  types: { name: string; count: number }[] = [];
  colors = [
    { name: 'Gray', hex: '#C4C4C4' },
    { name: 'Black', hex: '#000000' },
    { name: 'Dark Blue', hex: '#0056b3' },
    { name: 'Brown', hex: '#8B0000' }
  ];
  constructor(private filterService: FilterService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.allProducts = data;
        this.updateRoomCounts(); // Cập nhật số lượng room
        this.updateTypeCounts(); // Cập nhật số lượng by Type
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    );
  }
  updateRoomCounts() {
    const roomCounts: { [key: string]: number } = {}; // Lưu số lượng sản phẩm theo từng room
  
    this.allProducts.forEach(product => {
      if (product.room) {
        const rooms = product.room.split(',').map((r: string) => r.trim()); // Tách nhiều phòng
        rooms.forEach((room: string | number) => {
          roomCounts[room] = (roomCounts[room] || 0) + 1; // Tăng số lượng
        });
      }
    });
  
    this.rooms = Object.keys(roomCounts).map(room => ({
      name: room,
      count: roomCounts[room]
    }));
  
    console.log('Updated Room Counts:', this.rooms); // Debug kiểm tra
  }
  updateTypeCounts() {
    const typeCounts: { [key: string]: number } = {};
    this.allProducts.forEach(product => {
      if (product.type) {
        const types = product.type.split(',').map((t: string) => t.trim());
        types.forEach((type: string | number) => {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
      }
    });
    this.types = Object.keys(typeCounts).map(type => ({ name: type, count: typeCounts[type] }));
    console.log('Updated Type Counts:', this.types);
  }

  
  selectRoom(room: string) {
    if (this.selectedRooms.includes(room)) {
      // Nếu phòng đã chọn thì bỏ chọn nó
      this.selectedRooms = this.selectedRooms.filter(r => r !== room);
    } else {
      // Nếu phòng chưa được chọn thì thêm vào danh sách
      this.selectedRooms.push(room);
    }
    this.applyFilter();
  }

  selectType(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.applyFilter();
  }

  selectColor(color: any) {

    this.selectedColor = color.name;
    console.log('Selected color:', this.selectedColor); // Debug log
    this.applyFilter();
  }
  applyFilter() {
    
    const filters = {
      color: this.selectedColor || null, 
      price: this.selectedPrice || null,
      types: this.selectedTypes.length > 0 ? this.selectedTypes : null, // Thêm bộ lọc loại sản phẩm
      rooms: this.selectedRooms.length > 0 ? this.selectedRooms : null // Truyền danh sách phòng
    };
    console.log('Applying filters:', filters); // Debug log
    this.filterService.setFilters(filters);
  }

  materials = [
    { name: 'Oak Wood', count: 12 },
    { name: 'Stainless Metal', count: 36 },
    { name: 'Titanium', count: 6 }
  ];
}
