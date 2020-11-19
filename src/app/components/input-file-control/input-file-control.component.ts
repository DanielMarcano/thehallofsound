import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ReadonlyMode {
  imgUrl: string | File;
  imgTitle: string;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './input-file-control.component.html',
  styleUrls: ['./input-file-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileControlComponent),
      multi: true,
    },
  ],
})
export class InputFileControlComponent implements ControlValueAccessor {
  public file: File | null = null;

  @Output()
  deleted = new EventEmitter();

  @Input()
  inputLabel = '';

  @Input()
  formControlName = '';

  @Input()
  error = '';

  @Input()
  readonlyMode: ReadonlyMode | undefined;

  focus = false;

  imageBase64: string | undefined;

  imgUrl: string | undefined;

  isImageSaved: boolean | undefined;

  onChange = (_: any) => {};

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.file = file;

      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = (rs) => {
          const imgBase64Path = e.target.result;

          this.imageBase64 = imgBase64Path;

          this.isImageSaved = true;
        };
      };

      this.onChange(file);
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  deleteHandler(): void {
    if (this.readonlyMode) {
      this.deleted.emit();
      this.readonlyMode = undefined;
    }

    this.writeValue(null);
  }

  writeValue(value: any): void {
    if (value) {
      this.host.nativeElement.value = value || '';
      return;
    }

    this.host.nativeElement.value = '';
    this.file = null;
    this.imageBase64 = undefined;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {}
}
