import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeTogglerComponent } from './theme-toggler/theme-toggler.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ThemeTogglerComponent
  ],
  exports: [
    ThemeTogglerComponent
  ]
})
export class SettingsModule { }
