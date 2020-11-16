import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalContent {
    @Input() message;

    constructor(public activeModal: NgbActiveModal) { }
}