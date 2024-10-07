import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { StoreClientModule } from './store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  	importProvidersFrom(
      BrowserAnimationsModule,
			StoreClientModule,
			StoreModule.forRoot({}),
			StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
			EffectsModule.forRoot([])
		),
  ]
};
