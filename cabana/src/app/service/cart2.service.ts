import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  /**
   * Thêm sản phẩm vào giỏ hàng.
   * Nếu sản phẩm đã có, tăng số lượng.
   * Nếu chưa có, thêm mới.
   */
  addToCart(product: any) {
    let items = [...this.cartItems.getValue()]; // Lấy danh sách hiện tại của giỏ hàng
    let existingItemIndex = items.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Sản phẩm đã có trong giỏ, tăng số lượng
      items[existingItemIndex].quantity += 1;
      items[existingItemIndex].subTotal = items[existingItemIndex].quantity * items[existingItemIndex].price;
    } else {
      // Sản phẩm chưa có trong giỏ, thêm mới
      items.push({ ...product, quantity: 1, subTotal: product.price });
    }

    this.updateCart(items);
  }

  /**
   * Nhóm sản phẩm theo brand và thêm tất cả vào giỏ hàng.
   */
  sortByBrand(): any {
    let items = this.cartItems.getValue();
    let grouped = items.reduce((acc, item) => {
      if (!acc[item.brand]) {
        acc[item.brand] = [];
      }
      acc[item.brand].push(item);
      return acc;
    }, {});

    return grouped;
  }

  /**
   * Tính tổng giá tạm thời của toàn bộ giỏ hàng.
   */
  getTotalTemp(): number {
    let items = this.cartItems.getValue();
    return items.reduce((total, item) => total + item.subTotal, 0);
  }

  /**
   * Cập nhật số lượng sản phẩm trong giỏ hàng.
   */
  updateQuantity(productId: number, quantity: number) {
    let items = this.cartItems.getValue();
    let existingItem = items.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.subTotal = existingItem.price * quantity;
    }

    this.updateCart(items);
  }

  /**
   * Xóa một sản phẩm khỏi giỏ hàng.
   */
  removeFromCart(productId: number) {
    let items = this.cartItems.getValue().filter(item => item.id !== productId);
    this.updateCart(items);
  }

  /**
   * Cập nhật giỏ hàng và phát giá trị mới.
   */
  private updateCart(items: any[]) {
    this.cartItems.next([...items]);
  }

  /**
   * Lấy danh sách sản phẩm trong giỏ hàng.
   */
  getCartItems() {
    return this.cartItems$;
  }
}
