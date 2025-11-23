import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

@Component({
    selector: 'ns-item-add',
    standalone: true,
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
    template: `
        <ActionBar title="Dodaj Przedmiot"></ActionBar>
        <StackLayout class="p-20">
            <Label text="Formularz." class="h2"></Label>
        </StackLayout>
    `
})
export class ItemAddComponent {}