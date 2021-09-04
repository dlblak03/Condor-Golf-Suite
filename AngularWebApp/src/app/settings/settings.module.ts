import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeTogglerComponent } from './theme-toggler/theme-toggler.component';
import { AngularMaterialModule } from './../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    ThemeTogglerComponent
  ],
  exports: [
    ThemeTogglerComponent
  ]
})
export class SettingsModule { }
