import {Component, OnInit} from '@angular/core';
import {ListService, PagedResultDto} from "@abp/ng.core";
import {BookDto, BookService} from "@proxy/books";
import {FormBuilder} from "@angular/forms";
import {Confirmation, ConfirmationService} from "@abp/ng.theme.shared";
import {NzModalService} from "ng-zorro-antd/modal";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    providers: [
        ListService,
    ],
})
export class BookComponent implements OnInit {
    book = {items: [], totalCount: 0} as PagedResultDto<BookDto>;


    constructor(
        public readonly list: ListService,
        private bookService: BookService,
        private fb: FormBuilder,
        private confirmation: ConfirmationService,
        private message: NzMessageService,
        private modalService: NzModalService) {
    }

    ngOnInit() {
        const bookStreamCreator = (query) => this.bookService.getList(query);

        this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
            this.book = response;
        });
    }

    createBook() {
        this.showModal()
    }

    editBook(id: string) {
        this.bookService.get(id).subscribe((book) => {
            this.showModal(book)
        });
    }

    delete(id: string) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.bookService.delete(id).subscribe(() => this.list.get(), error => {
                }, () => {
                    this.message.create('success', `This Book Is Deleted Successfully`);
                });
            }
        });
    }

    showModal(book?: BookDto): void {
        const dialogueRef = this.modalService.create({
            nzTitle: book?.id ? 'Edit Book' : 'Add Book',
            nzContent: AddEditBookComponent,
            nzComponentParams: {
                selectedBook: book
            }
        });

        dialogueRef.afterClose.subscribe(res => {
            if (res) {
                const request = res.id
                    ? this.bookService.update(res.id, res.item)
                    : this.bookService.create(res.item);

                request.subscribe(() => {
                    this.list.get();
                }, error => {
                }, () => {
                    if (res.id) {
                        this.message.create('info', `This Book Is Updated Successfully`);
                    } else {
                        this.message.create('success', `This Book Is Added Successfully`);
                    }
                });
            }
        })
    }
}
