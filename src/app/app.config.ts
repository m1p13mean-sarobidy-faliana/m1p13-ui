import '@/app/config/zod';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideApi} from '@m1p13/client';
import {provideToastr} from 'ngx-toastr';
import 'ngx-toastr/toastr';
import {routes} from './app.routes';
import {authInterceptor} from './providers/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideApi({basePath: import.meta.env.NG_APP_API_URL}),
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
