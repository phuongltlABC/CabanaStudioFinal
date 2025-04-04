import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { FilterService } from '../../service/filter.service';
import { FormsModule } from '@angular/forms';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { CartService } from '../../service/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, AddToCartBtnComponent, FormsModule,RouterLink],
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
    private filterService: FilterService,
    private cartService: CartService,
    private router: Router // Inject Router để điều hướng
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // Lắng nghe bộ lọc từ FilterService
    this.filterService.filters$.subscribe((filters) => {
      console.log('Filters received:', filters);
      this.applyFilters(filters);
    });


  }
  goTo3DModel(): void {
    this.router.navigate(['/spline-viewer']);
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
 // Hàm điều hướng đến trang chi tiết sản phẩm
 goToProductDetail(productId: string) {
  if (productId) {
    this.router.navigate(['/product', productId]);
  } else {
    console.error('productId is undefined or invalid');
  }

}
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
  
    
     // Lọc theo material
  if (filters.materials && filters.materials.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      if (!product.material) return false;

      // Tách các material của sản phẩm thành mảng, loại bỏ khoảng trắng thừa và chuyển về chữ thường
      const productMaterials = product.material.split(',').map((m: string) => m.trim().toLowerCase());

      // Kiểm tra nếu bất kỳ material nào trong bộ lọc có xuất hiện trong danh sách material của sản phẩm
      return filters.materials.some((material: string) => 
        productMaterials.some((prodMat: string) => prodMat.includes(material.toLowerCase()))
      );
    });
  }
     // Lọc theo giá tiền
  if (filters.price) {
    const { min, max } = filters.price;
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && product.price <= max
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

  addToCart(product: any): void {
    this.cartService.addToCart({
      productId: product.productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: 1,
      selected: false
    });
  }
  trackByProduct(index: number, item: any) {
    return item.productId; // Trả về ID để Angular biết đâu là sản phẩm nào
  }
  
}
