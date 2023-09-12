import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RouterModule, Routes } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthService } from './modules/auth/auth.service'
import { Observable } from 'rxjs'
import { AuthBearerInterceptor } from './interceptors/auth-bearer.interceptor'
import { canActivateAuthGuard } from './guards/can-activate-auth.guard'
import { canMatchDashboardGuard } from './guards/can-match-dashboard.guard'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DEFAULT_ROUTER_FEATURENAME, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AuthModule } from './modules/auth/auth.module'
import { AuthComponent } from './modules/auth/auth.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthComponent,
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
  imports: [
    AuthModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    StoreModule.forRoot({ [DEFAULT_ROUTER_FEATURENAME]: routerReducer }, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthBearerInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => (): Observable<boolean> => authService.initialize(),
      multi: true,
      deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
