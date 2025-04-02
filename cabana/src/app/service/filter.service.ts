import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(newFilters: any) {
    console.log('FilterService nhận filter:', newFilters); // Debug log
    this.filtersSubject.next(newFilters);
  };
  getCurrentFilters(): any {
    return this.filtersSubject.getValue();
  }
}
