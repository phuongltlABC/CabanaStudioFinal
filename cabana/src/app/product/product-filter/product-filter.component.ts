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


// Khai báo material gốc ở đầu class
predefinedMaterials: string[] = ['Wood', 'Metal', 'Glass', 'Leather', 'Fabric', 'Polyester', 'Cotton'];
materials: { name: string; count: number }[] = [];
selectedMaterials: string[] = [];


  rooms: { name: string; count: number }[] = []; 
  types: { name: string; count: number }[] = [];
  colors = [
    { name: 'Gray', hex: '#C4C4C4' },
    { name: 'Black', hex: '#000000' },
    { name: 'Dark Blue', hex: '#0056b3' },
    { name: 'Brown', hex: '#8B0000' }
  ];
materialCounts: any;

 


  constructor(private filterService: FilterService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.allProducts = data;
        this.updateRoomCounts(); 
        this.updateTypeCounts(); 
        this.updateMaterialCounts();
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    );
  }
  // updateMaterialCounts() {
  //   const materialCounts: { [key: string]: number } = {};
  
   
  //   this.predefinedMaterials.forEach(m => materialCounts[m] = 0);
  
  //   this.allProducts.forEach(product => {
  //     if (product.material) {
        
  //       const materials = product.material.split(',').map((m: string) => m.trim().toLowerCase());
        
  //       materials.forEach((material: string | string[]) => {
          
  //         this.predefinedMaterials.forEach(predefined => {
  //           if (material.includes(predefined.toLowerCase())) {
  //             materialCounts[predefined]++;
  //           }
  //         });
  //       });
  //     }
  //   });
  
  //   console.log("Material counts:", materialCounts);
  // }
  
  updateMaterialCounts() {
    const materialCounts: { [key: string]: number } = {};
  
    
    this.predefinedMaterials.forEach(m => materialCounts[m] = 0);
  
    this.allProducts.forEach(product => {
      if (product.material) {
        const materialText = product.material.toLowerCase(); 
  
        this.predefinedMaterials.forEach(predefined => {
          if (materialText.includes(predefined.toLowerCase())) {
            materialCounts[predefined]++;
          }
        });
      }
    });
  

    this.materials = Object.keys(materialCounts)
      .filter(m => materialCounts[m] > 0)
      .map(m => ({ name: m, count: materialCounts[m] }));
  
    console.log('Updated Material Counts:', this.materials);
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
    // Kiểm tra xem màu đã được chọn chưa, nếu có thì bỏ chọn
    if (this.selectedColor === color.name) {
      this.selectedColor = ''; // Bỏ chọn
    } else {
      this.selectedColor = color.name; // Chọn màu mới
    }
    console.log('Selected color:', this.selectedColor); // Debug log
    this.applyFilter(); // Áp dụng bộ lọc
  }
  selectMaterial(material: string) {
    if (this.selectedMaterials.includes(material)) {
      this.selectedMaterials = this.selectedMaterials.filter(m => m !== material);
    } else {
      this.selectedMaterials.push(material);
    }
    this.applyFilter();
  }
  
  applyFilter() {
    
    const filters = {
      color: this.selectedColor || null, 
      // price: this.selectedPrice || null,
      price: {
        min: this.minPrice || 0,
        max: this.maxPrice || 12000000
      },
      types: this.selectedTypes.length > 0 ? this.selectedTypes : null, // Thêm bộ lọc loại sản phẩm
      
      rooms: this.selectedRooms.length > 0 ? this.selectedRooms : null, // Truyền danh sách phòng
      materials: this.selectedMaterials.length > 0 ? this.selectedMaterials : null 
    };
    console.log('Applying filters:', filters); // Debug log
    this.filterService.setFilters(filters);
  }


}
