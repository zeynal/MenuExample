import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { CurrencyComponent } from './currency/currency.component';
import { LanguageComponent } from './language/language.component';
import { AsideBlockComponent } from './aside/aside-block.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthenticationService } from '../../services/login/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyComponent,
    LanguageComponent,
    AsideBlockComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],exports: [
    HeaderComponent
  ],
  providers: [
    AuthenticationService,
    FormBuilder
  ],
  bootstrap: [HeaderComponent]
})

export class HeaderModule { }
