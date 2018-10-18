import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { CurrencyComponent } from './currency/currency.component';
import { LanguageComponent } from './language/language.component';
import { AsideBlockComponent } from './aside/aside-block.component';
import { LoginModalComponent } from './login-modal/login-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyComponent,
    LanguageComponent,
    AsideBlockComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
  ],exports: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})

export class HeaderModule { }
