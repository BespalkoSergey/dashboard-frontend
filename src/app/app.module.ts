import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RouterModule, Routes } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { UserAuthService } from './services/user-auth.service'
import { Observable } from 'rxjs'
import { AuthBearerService } from './services/auth-bearer.service'
import { canActivateAuthGuard } from './guards/can-activate-auth.guard'
import { canMatchDashboardGuard } from './guards/can-match-dashboard.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [canActivateAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canMatch: [canMatchDashboardGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthBearerService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: UserAuthService) => (): Observable<boolean> => authService.initialize(),
      multi: true,
      deps: [UserAuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
