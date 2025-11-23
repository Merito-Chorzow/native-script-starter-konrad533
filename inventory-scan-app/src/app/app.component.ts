import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PageRouterOutlet } from '@nativescript/angular';
import { NativeScriptRouterModule } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  standalone: true,
  // templateUrl: './app.component.html',
  template: `<page-router-outlet></page-router-outlet>`,
  imports: [NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}
