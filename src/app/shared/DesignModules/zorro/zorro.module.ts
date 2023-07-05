import {NgModule} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";

const zorroModules = [
    NzButtonModule,
    NzTableModule,
    NzMenuModule,
    NzModalModule,
    NzMessageModule
]

@NgModule({
    declarations: [],
    exports: [zorroModules]
})
export class ZorroModule {
}
