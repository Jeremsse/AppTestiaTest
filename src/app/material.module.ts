import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
