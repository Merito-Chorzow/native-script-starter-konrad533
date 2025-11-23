import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
    selector: 'ns-item-detail',
    standalone: true,
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
    template: `
        <ActionBar title="Szczegóły Przedmiotu"></ActionBar>
        <ScrollView>
            <StackLayout class="p-20" *ngIf="item">
                <Label [text]="item.name" class="h1 text-center font-bold m-b-10"></Label>

                <Image *ngIf="item.photo" [src]="item.photo" class="m-b-20 bg-gray-100 rounded"></Image>

                <Label text="Kod:" class="text-muted text-small m-t-10"></Label>
                <Label [text]="item.code" class="h3 m-b-10"></Label>

                <Label text="Status:" class="text-muted text-small m-t-10"></Label>
                <Label [text]="item.status" class="h3 m-b-10" [color]="item.status === 'Dostępny' ? 'green' : 'red'"></Label>

                <Label text="Opis:" class="text-muted text-small m-t-10"></Label>
                <Label [text]="item.description" textWrap="true"></Label>
            </StackLayout>
        </ScrollView>
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