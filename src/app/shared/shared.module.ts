import {CoreModule} from '@abp/ng.core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {ThemeSharedModule} from '@abp/ng.theme.shared';
import {NgxValidateCoreModule} from '@ngx-validate/core';
import {ZorroModule} from "./DesignModules/zorro/zorro.module";

@NgModule({
    declarations: [],
    exports: [
        CoreModule,
        ThemeSharedModule,
        NgbDropdownModule,
        NgxValidateCoreModule,
        ZorroModule
    ],
    providers: []
})
export class SharedModule {
}
