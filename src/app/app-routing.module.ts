import { AuthGaurdService } from './gaurds/auth-gaurd.service';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { ProcessorPagesComponent } from './processor-pages/processor-pages.component';
import { VendorPagesComponent } from './vendor-pages/vendor-pages.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'pages', component: PagesComponent, children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule' }
    ],canActivate:[AuthGaurdService]
  },
  {
    path: 'admin', component: AdminPagesComponent, children: [
      { path: '', loadChildren: './admin-pages/admin-pages.module#AdminPagesModule' }
    ],canActivate:[AuthGaurdService]
  },
  {
    path: 'processor', component: ProcessorPagesComponent, children: [
      { path: '', loadChildren: './processor-pages/processor-pages.module#ProcessorPagesModule' }
    ],canActivate:[AuthGaurdService]
  },
  {
    path: 'vendor', component: VendorPagesComponent, children: [
      { path: '', loadChildren: './vendor-pages/vendor-pages.module#VendorPagesModule' }
    ],canActivate:[AuthGaurdService]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
