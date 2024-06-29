import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DarkModeService } from './services/dark-mode.service';
import { provideHttpClient } from '@angular/common/http';
import { CountriesService } from './services/countries.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    DarkModeService,
    CountriesService
  ]
};
