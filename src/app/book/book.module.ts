import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookRoutingModule} from './book-routing.module';
import {BookComponent} from './book.component';
import {BaseThemeSharedModule} from "@abp/ng.theme.shared";
import {CoreModule, LocalizationModule} from "@abp/ng.core";
import {
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbInputDatepicker
} from "@ng-bootstrap/ng-bootstrap";
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "../shared/shared.module";
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';

@NgModule({
    declarations: [
        BookComponent,
        AddEditBookComponent
    ],
    imports: [
        CommonModule,
        BookRoutingModule,
        BaseThemeSharedModule,
        LocalizationModule,
        CoreModule,
        NgbInputDatepicker,
        NgbDatepickerModule,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem,
        SharedModule
    ]
})
export class BookModule {
}
