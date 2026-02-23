import '@/app/config/zod';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideToastr} from 'ngx-toastr';
import 'ngx-toastr/toastr';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
    }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
