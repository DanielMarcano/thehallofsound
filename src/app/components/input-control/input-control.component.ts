import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
})
export class InputControlComponent implements OnInit, ControlValueAccessor {
  @Input()
  inputLabel = '';

  @Input()
  type = '';

  @Input()
  placeholder = '';

  @Input()
  formControlName = '';

  @Input()
  error = '';

  focused = false;

  value = '';

  isDisabled = false;

  onChange = (_: any) => {};

  onTouch = () => {};

  constructor() {}

  ngOnInit(): void {}

  onInput(event: { target: any }): void {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  updateFocus(value: boolean): void {
    if (!value) {
      this.onTouch();
    }

    this.focused = value;
  }
}
