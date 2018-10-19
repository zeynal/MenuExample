import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AuthGuard } from '../../guards';

const routes: Routes = [
  { path: 'test', component: TestComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
