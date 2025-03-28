import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBlogComponent } from './feature-blog.component';

describe('FeatureBlogComponent', () => {
  let component: FeatureBlogComponent;
  let fixture: ComponentFixture<FeatureBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
