import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionSalesEventComponent } from './promotion-sales-event.component';

describe('PromotionSalesEventComponent', () => {
  let component: PromotionSalesEventComponent;
  let fixture: ComponentFixture<PromotionSalesEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionSalesEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionSalesEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
