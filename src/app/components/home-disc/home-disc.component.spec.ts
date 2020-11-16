import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscComponent } from './home-disc.component';

describe('HomeDiscComponent', () => {
  let component: HomeDiscComponent;
  let fixture: ComponentFixture<HomeDiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
