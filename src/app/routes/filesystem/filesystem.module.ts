import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FilesystemRoutingModule } from './filesystem-routing.module';
import { FilesystemListComponent } from './list/list.component';

const COMPONENTS = [
  FilesystemListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FilesystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FilesystemModule { }
