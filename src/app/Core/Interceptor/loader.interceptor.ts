import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {LoaderService} from "../Services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    count = 0;

    constructor(private loaderService: LoaderService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.show()
        this.count++;
        return next.handle(request)
            .pipe(tap(
                ), finalize(() => {
                    this.count--;
                    if (this.count == 0) {
                        this.loaderService.hide()
                    }
                })
            );
    }
}
