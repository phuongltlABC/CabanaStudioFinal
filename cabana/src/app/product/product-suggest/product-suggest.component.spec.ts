import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuggestComponent } from './product-suggest.component';

describe('ProductSuggestComponent', () => {
  let component: ProductSuggestComponent;
  let fixture: ComponentFixture<ProductSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSuggestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
