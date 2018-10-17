import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { CurrencyComponent } from './currency/currency.component';
import { LanguageComponent } from './language/language.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyComponent,
    LanguageComponent
  ],
  imports: [
    CommonModule
  ],exports: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})

export class HeaderModule { }
