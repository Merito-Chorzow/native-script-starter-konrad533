import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule, RouterExtensions } from '@nativescript/angular';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

@Component({
    selector: 'ns-item-detail',
    standalone: true,
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
    template: `
        <ActionBar title="Szczegóły Przedmiotu"></ActionBar>
        <ScrollView (loaded)="refresh()">
            <StackLayout class="p-20" *ngIf="item">
                <Label [text]="item.name" class="h1 text-center font-bold m-b-10"></Label>

                <Image *ngIf="item.photo" [src]="item.photo" class="m-b-20 bg-gray-100 rounded"></Image>

                <GridLayout columns="*, *" class="m-b-20">
                    <Label col="0" class="h3">
                        <FormattedString>
                            <Span text="Kod: " class="font-bold text-muted text-small m-t-10"></Span>
                            <Span [text]="item.code" class="text-muted text-small m-t-10"></Span>
                        </FormattedString>
                    </Label>

                    <Label col="1" class="h3" textAligment="right">
                        <FormattedString>
                            <Span text="Status: " class="font-bold text-muted text-small m-t-10"></Span>
                            <Span [text]="item.status" [color]="item.status === 'Dostępny' ? 'green' : 'red'"></Span>
                        </FormattedString>
                    </Label>
                </GridLayout>

                <Label class="body m-b-20" textWrap="true">
                    <FormattedString>
                        <Span text="Opis:" class="font-bold text-muted text-small m-t-10"></Span>
                        <Span [text]="item.description || 'Brak opisu'"></Span>
                    </FormattedString>
                </Label>
                

                <GridLayout columns="*, *" gap="10" class="m-t-20">
                    <Button text="Usuń" col="0" (tap)="deleteItem()" class="btn btn-danger text-danger"></Button>
                    <Button text="Edytuj" col="1" (tap)="router.navigate(['/edit-item', item.id])" class="btn btn-primary text-primary"></Button>
                </GridLayout>

            </StackLayout>
        </ScrollView>
    `
})
export class ItemDetailComponent implements OnInit {
    item: Item | undefined;

    constructor(
        private route: ActivatedRoute,
        private inventoryService: InventoryService,
        private router : RouterExtensions
    ) {}

    ngOnInit(): void {
        this.fetchData();
    }

    refresh() {
        this.fetchData();
    }

    fetchData() {
        const id = this.route.snapshot.params['id'];
        this.item = this.inventoryService.getItemById(id);
    }

    deleteItem() {
        if (this.item) {
            this.inventoryService.deleteItem(this.item.id);
            this.router.backToPreviousPage();        
        }
    }
}