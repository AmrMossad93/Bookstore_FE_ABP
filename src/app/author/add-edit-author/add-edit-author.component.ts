import {Component, Input, OnInit} from '@angular/core';
import {ListService} from "@abp/ng.core";
import {NgbDateAdapter, NgbDateNativeAdapter} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {AuthorDto} from "@proxy/authors";

@Component({
    selector: 'app-add-edit-author',
    templateUrl: './add-edit-author.component.html',
    styleUrls: ['./add-edit-author.component.scss'],
    providers: [
        ListService,
        {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
    ],
})
export class AddEditAuthorComponent implements OnInit {
    form: FormGroup;

    @Input() selectedAuthor = {} as AuthorDto;

    constructor(private fb: FormBuilder, private modal: NzModalRef) {
    }

    ngOnInit() {
        if (!this.selectedAuthor) {
            this.selectedAuthor = {} as AuthorDto
        }
        this.buildForm()
    }

    buildForm() {
        this.form = this.fb.group({
            name: [this.selectedAuthor.name || '', Validators.required],
            birthDate: [
                this.selectedAuthor.birthDate ? new Date(this.selectedAuthor.birthDate) : null,
                Validators.required,
            ],
        });
    }

    destroyModal(): void {
        this.modal.destroy();
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }
        let MODEL = {
            id: this.selectedAuthor.id,
            item: this.form.value
        }
        console.log(MODEL)
        this.modal.destroy(MODEL);
    }
}
