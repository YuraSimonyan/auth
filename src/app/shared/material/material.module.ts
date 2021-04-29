import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class MaterialModule {

}
