import {Component, OnInit} from '@angular/core';
import {ListService, PagedResultDto} from '@abp/ng.core';
import {AuthorService, AuthorDto} from '@proxy/authors';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbDateNativeAdapter, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationService, Confirmation} from '@abp/ng.theme.shared';
import {BookDto} from "@proxy/books";
import {AddEditBookComponent} from "../book/add-edit-book/add-edit-book.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {AddEditAuthorComponent} from "./add-edit-author/add-edit-author.component";

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.scss'],
    providers: [ListService, {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
})
export class AuthorComponent implements OnInit {
    author = {items: [], totalCount: 0} as PagedResultDto<AuthorDto>;

    isModalOpen = false;

    form: FormGroup;

    selectedAuthor = {} as AuthorDto;

    constructor(
        public readonly list: ListService,
        private authorService: AuthorService,
        private fb: FormBuilder,
        private confirmation: ConfirmationService,
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
    }

    ngOnInit(): void {
        const authorStreamCreator = (query) => this.authorService.getList(query);

        this.list.hookToQuery(authorStreamCreator).subscribe((response) => {
            this.author = response;
        });
    }

    createAuthor() {
     this.showModal()
    }

    editAuthor(id: string) {
        this.authorService.get(id).subscribe((author) => {
            this.showModal(author)
        });
    }

    delete(id: string) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure')
            .subscribe((status) => {
                if (status === Confirmation.Status.confirm) {
                    this.authorService.delete(id).subscribe(() => this.list.get());
                }
            });
    }

    showModal(author?: AuthorDto): void {
        const dialogueRef = this.modalService.create({
            nzTitle: author?.id ? 'Edit Author' : 'Add Author',
            nzContent: AddEditAuthorComponent,
            nzComponentParams: {
                selectedAuthor: author
            }
        });

        dialogueRef.afterClose.subscribe(res => {
            if (res) {
                if (res.id) {
                    this.authorService
                        .update(res.id, res.item)
                        .subscribe(() => {
                            this.list.get()
                        }, error => {
                        }, () => {
                            this.message.create('info', `This Author Is Updated Successfully`);
                        });
                } else {
                    this.authorService.create(res.item).subscribe(() => {
                        this.list.get()
                    }, error => {
                    }, () => {
                        this.message.create('success', `This Author Is Added Successfully`);
                    });
                }
            }
        })
    }
}
