import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000';  // Trỏ tới backend

  constructor(private http: HttpClient) {}

  // Lấy toàn bộ đơn hàng
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  // Lấy chi tiết 1 đơn hàng
  getOrderDetails(orderID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${orderID}`);
  }
}
