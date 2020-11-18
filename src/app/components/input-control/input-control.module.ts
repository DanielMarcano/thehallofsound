import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputFileControlComponent } from '../input-file-control/input-file-control.component';
import { InputControlComponent } from './input-control.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InputControlComponent, InputFileControlComponent],
  exports: [InputControlComponent, InputFileControlComponent],
})
export class InputControlModule {}
