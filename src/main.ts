import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app-root/app-root.component';
import { routes } from './app/app.routes';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'; // Ruta correcta a tu interceptor
import { AuthInterceptor } from './app/core/services/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
}).catch(err => console.error(err));
