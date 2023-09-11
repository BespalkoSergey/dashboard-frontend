import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RouterModule, Routes } from '@angular/router'
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
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
