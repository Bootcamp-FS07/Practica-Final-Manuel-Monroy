import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // Importar provideRouter

import { AppComponent } from './app/app-root/app-root.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));
