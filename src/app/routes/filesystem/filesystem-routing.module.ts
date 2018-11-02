import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesystemListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: FilesystemListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesystemRoutingModule { }
