import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { 
    NativeScriptCommonModule, 
    NativeScriptRouterModule, 
    NativeScriptFormsModule, 
    RouterExtensions 
} from "@nativescript/angular";
import { InventoryService } from "../services/inventory.service";
import { Item } from "../models/item.model";
import * as camera from "@nativescript/camera";
import { ImageAsset } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ns-item-add',
    standalone: true,
    imports: [
        NativeScriptCommonModule, 
        NativeScriptRouterModule, 
        NativeScriptFormsModule, 
    ],
    schemas: [NO_ERRORS_SCHEMA],
    template: `
        <ActionBar title="Dodaj Przedmiot"></ActionBar>

        <ScrollView>
            <StackLayout class="p-20">
                <Label text="Nazwa produktu *" class="font-bold m-b-5"></Label>
                <TextField [(ngModel)]="name" hint="Wpisz nazwę produktu" class="input p-10 m-b-20 bg-white border rounded"></TextField>

                <Label text="Kod produktu *" class="font-bold m-b-5"></Label>
                <TextField [(ngModel)]="code" hint="Wpisz kod produktu" class="input p-10 m-b-20 bg-white border rounded"></TextField>

                <Label text="Status produktu *" class="font-bold m-b-5"></Label>
                <GridLayout columns="auto, auto" class="m-b-20">
                    <Label [text]="isAvailabe ? 'Status: Dostępny' : 'Status: Niedostępny'" col="0" class="h3" [color]="isAvailabe ? 'green' : 'red'"></Label>
                    <Switch [(ngModel)]="isAvailabe" col="1" class="m-l-20"></Switch>
                </GridLayout>

                <Label text="Opis produktu" class="font-bold m-b-5"></Label>
                <TextView [(ngModel)]="description" hint="Wpisz krótki opis produktu" class="input p-10 m-b-20 bg-white border rounded"></TextView>

                <Label text="Zdjęcie produktu" class="font-bold m-b-5"></Label>
                
                <Image *ngIf="photoAsset" [src]="photoAsset" width="200" height="200" class="m-b-10 bg-gray-200 rounded"></Image>

                <Button text="Zrób zdjęcie" (tap)="takePhoto()" class="btn btn-outline m-b-20"></Button>

                <Button [text]="isEditing ? 'Zapisz zmiany' : 'Zapisz produkt'" (tap)="save()" class="btn btn-primary m-t-20"></Button>
                <Button text="Anuluj" (tap)="goBack()" class="btn btn-outline m-b-10 text-muted"></Button>

            </StackLayout>
        </ScrollView>
    `
})
export class ItemAddComponent {
    name='';
    code='';
    description='';
    photoAsset: ImageAsset | null = null;
    isAvailabe = true;

    isEditing = false;
    itemId: string | null = null;

    constructor(
        private inventoryService: InventoryService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isEditing = true;
            this.itemId = id;
            const item = this.inventoryService.getItemById(id);

            if (item) {
                this.name = item.name;
                this.code = item.code;
                this.description = item.description || '';
                this.photoAsset = item.photo;
                this.isAvailabe = item.status === 'Dostępny';
            }
        }
    }

    takePhoto() {
        camera.requestPermissions().then(
            () => {
                camera.takePicture({
                    width: 300,
                    height: 300,
                    keepAspectRatio: true,
                    saveToGallery: false
                }).then((imageAsset) => {
                    this.photoAsset = imageAsset;
                }).catch((err) => {
                    console.log("Błąd kamery: " + err.message);
                });
            },
            () => {
                alert("Brak uprawnień do użycia kamery.");
            }
        );
    }

    save() {
        if (!this.name || !this.code) {
            alert("Wpisz nazwę i kod produktu.");
            return;
        }

        const itemData: Item = {
            id: this.isEditing && this.itemId ? this.itemId : Date.now().toString(),
            name: this.name,
            code: this.code,
            description: this.description,
            status: this.isAvailabe ? 'Dostępny' : 'Niedostępny',
            photo: this.photoAsset
        };

        if (this.isEditing) {
            this.inventoryService.updateItem(itemData);
        }
        else {
            this.inventoryService.addItem(itemData);
        }

        this.goBack();
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}