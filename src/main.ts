import {App, appConfig} from '@/app';
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
