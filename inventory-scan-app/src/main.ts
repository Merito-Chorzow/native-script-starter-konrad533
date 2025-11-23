import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptHttpClientModule,
  platformNativeScript,
  NativeScriptRouterModule,
} from '@nativescript/angular';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import '@angular/compiler';

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
        importProvidersFrom(NativeScriptCommonModule, NativeScriptFormsModule),
        provideHttpClient(),  
      ]
    });
  }
});
