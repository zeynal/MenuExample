import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { TestComponent } from './test/test.component';
import { ContainerRoutingModule } from './container-routing.module';

@NgModule({
  declarations: [
    ContainerComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule
  ],exports: [
    ContainerComponent
  ],
  providers: [],
  bootstrap: [ContainerComponent]
})

export class ContainerModule { }
