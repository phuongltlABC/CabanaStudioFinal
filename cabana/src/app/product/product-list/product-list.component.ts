import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { FilterService } from '../../service/filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Danh sách sản phẩm sau khi lọc
  allProducts: any[] = []; // Lưu toàn bộ danh sách sản phẩm từ API
  displayedProducts: any[] = []; // Sản phẩm hiển thị theo phân trang
  itemsPerPage: number = 12; //
  currentIndex: number = 0; // Chỉ số sản phẩm hiện tại
  searchText: string = ''; // Biến lưu nội dung tìm kiếm
  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // Lắng nghe bộ lọc từ FilterService
    this.filterService.filters$.subscribe((filters) => {
      console.log('Filters received:', filters);
      this.applyFilters(filters);
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.allProducts = data; // Lưu toàn bộ sản phẩm
        console.log('All products from API:', this.allProducts);

        // Kiểm tra xem có sản phẩm nào bị thiếu màu không
        this.allProducts.forEach((product) => {
          if (!product.color) {
            console.warn('Product missing color:', product);
          }
        });

        this.products = [...this.allProducts]; // Sao chép danh sách sản phẩm
        this.displayedProducts = this.products.slice(0, this.itemsPerPage);
      },
      (error) => {
        console.error(' Lỗi khi tải sản phẩm:', error);
      }
    );
  }
  // searchProducts(searchText: string): void {
  //   console.log('Search text:', searchText); 
  //   this.searchText = searchText.toLowerCase().trim(); 
  //   this.applyFilters(this.filterService.getCurrentFilters()); 
  // }
  searchProducts(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement) return; // Nếu inputElement là null thì dừng luôn
    const searchText = inputElement.value.toLowerCase().trim();
    console.log("Từ khóa tìm kiếm:", searchText);
    this.searchText = searchText;
    this.applyFilters(this.filterService.getCurrentFilters());
  }

  applyFilters(filters: any): void {
    let filteredProducts = [...this.allProducts];
     // Debug log các bộ lọc
  console.log('Filters applied:', filters);
  console.log('All products:', this.allProducts);

    if (filters.color) {
      const colorFilter = filters.color.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(product => 
        (product.color ? product.color.toLowerCase() : "").includes(colorFilter) 
      );
    }

    if (filters.rooms) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.room) return false;
        const productRooms = product.room.split(',').map((r: string) => r.trim()); // Tách các phòng của sản phẩm
        return filters.rooms.some((room: any) => productRooms.includes(room)); // Kiểm tra xem sản phẩm có ít nhất 1 phòng được chọn không
      });
    }
     // Lọc theo tìm kiếm
     if (this.searchText) {
      filteredProducts = filteredProducts.filter(product =>
        product.name?.toLowerCase().includes(this.searchText)
      );
    }
    // Lọc theo type
    if (filters.types) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.type) return false;
        const productTypes = product.type.split(',').map((t: string) => t.trim());
        return filters.types.some((type: any) => productTypes.includes(type));
      });
    }
  


    console.log('Filtered products:', filteredProducts); // Debug log
    this.products = filteredProducts; // Cập nhật danh sách sản phẩm đã lọc
    this.displayedProducts = this.products.slice(0, this.itemsPerPage); // Hiển thị phân trang
 
  }

  loadMore(): void {
    const currentLength = this.displayedProducts.length;
    const nextLength = currentLength + this.itemsPerPage;

    this.displayedProducts = this.products.slice(0, nextLength);
  }

  get progressPercentage(): number {
    return (this.displayedProducts.length / this.products.length) * 100;
  }
}
