import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionSpecialOffersComponent } from './promotion-special-offers.component';

describe('PromotionSpecialOffersComponent', () => {
  let component: PromotionSpecialOffersComponent;
  let fixture: ComponentFixture<PromotionSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionSpecialOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
