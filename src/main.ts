import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app-root/app-root.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch(err => console.error(err));
