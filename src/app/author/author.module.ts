import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditAuthorComponent } from './add-edit-author/add-edit-author.component';

@NgModule({
  declarations: [AuthorComponent, AddEditAuthorComponent],
  imports: [SharedModule, AuthorRoutingModule, NgbDatepickerModule],
})
export class AuthorModule {}
