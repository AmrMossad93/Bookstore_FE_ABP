import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <abp-loader-bar></abp-loader-bar>
        <abp-dynamic-layout></abp-dynamic-layout>
        <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#f72585" type="square-jelly-box"
                     [fullScreen]="true">
        </ngx-spinner>
    `,
})
export class AppComponent {
}
