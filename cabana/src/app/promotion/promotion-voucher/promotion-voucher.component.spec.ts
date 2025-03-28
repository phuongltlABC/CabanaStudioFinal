import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionVoucherComponent } from './promotion-voucher.component';

describe('PromotionVoucherComponent', () => {
  let component: PromotionVoucherComponent;
  let fixture: ComponentFixture<PromotionVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
