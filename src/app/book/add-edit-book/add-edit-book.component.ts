import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {AuthorLookupDto, BookDto, BookService, bookTypeOptions} from "@proxy/books";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {ListService} from "@abp/ng.core";
import {NgbDateAdapter, NgbDateNativeAdapter} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-add-edit-book',
    templateUrl: './add-edit-book.component.html',
    styleUrls: ['./add-edit-book.component.scss'],
    providers: [
        ListService,
        {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
    ],
})
export class AddEditBookComponent implements OnInit {
    form: FormGroup;
    bookTypes = bookTypeOptions;
    authors$: Observable<AuthorLookupDto[]>;
    @Input() selectedBook = {} as BookDto;

    constructor(private fb: FormBuilder, private modal: NzModalRef, private bookService: BookService) {
        this.authors$ = bookService.getAuthorLookup().pipe(map((r) => r.items));
    }

    ngOnInit() {
        if (!this.selectedBook) {
            this.selectedBook = {} as BookDto
        }
        this.buildForm();
    }

    destroyModal(): void {
        this.modal.destroy();
    }

    buildForm() {
        this.form = this.fb.group({
            authorId: [this.selectedBook.authorId || null, Validators.required],
            name: [this.selectedBook.name || '', Validators.required],
            type: [this.selectedBook.type || null, Validators.required],
            publishDate: [
                this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
                Validators.required,
            ],
            price: [this.selectedBook.price || null, Validators.required],
        });
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }
        let MODEL = {
            id: this.selectedBook.id,
            item: this.form.value
        }
        console.log(MODEL)
        this.modal.destroy(MODEL);
    }
}
