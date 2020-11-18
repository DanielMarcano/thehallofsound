import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileControlComponent } from './input-file-control.component';

describe('InputFileControlComponent', () => {
  let component: InputFileControlComponent;
  let fixture: ComponentFixture<InputFileControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
