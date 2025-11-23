import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
    selector: 'ns-items',
    standalone: true,
    imports: [CommonModule, NativeScriptCommonModule, NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
    template: `
        <ActionBar title="Lista Przedmiotów"></ActionBar>
        <GridLayout rows="auto, *" (loaded)="refresh()">
            <Button text="Dodaj produkt" [nsRouterLink]="['/add-item']" class="btn-primary" row="0"></Button>
            <ListView [items]="items" class="list-group" row="1">
                <ng-template let-item="item">
                    <StackLayout [nsRouterLink]="['/item', item.id]" class="p-10">
                        <Label [text]="item.name" class="h2"></Label>
                        <Label [text]="item.code" class="text-muted"></Label>
                    </StackLayout>
                </ng-template>
            </ListView>
        </GridLayout>
    `
})

export class ItemsComponent implements OnInit {
    items: Item[] = [];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit(): void {
        this.fetchData();
    }

    refresh() {
        this.fetchData();
    }

    fetchData() {
        this.inventoryService.getItems().subscribe((data) => {
            this.items = [...data];
        });
    }
}