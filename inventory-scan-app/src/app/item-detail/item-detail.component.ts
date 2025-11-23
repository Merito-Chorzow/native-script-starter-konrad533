import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
    selector: 'ns-item-detail',
    standalone: true,
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    template: `
        <ActionBar title="Szczegóły Przedmiotu"></ActionBar>
        <StackLayout class="p-20" *ngIf="item">
            <Label [text]="item.name" class="h1"></Label>
            <Label [text]="'Kod: ' + item.code" class="h3"></Label>
            <Label [text]="'Status: ' + item.status"></Label>
            <Label [text]="item.description" textWrap="true"></Label>
        </StackLayout>
    `
})
export class ItemDetailComponent implements OnInit {
    item: Item | undefined;

    constructor(
        private route: ActivatedRoute,
        private inventoryService: InventoryService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.item = this.inventoryService.getItemById(id);
    }
}