import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
import { WrapperComponent } from './shared/layouts/wrapper/wrapper.component';
import { HomeComponent } from './z_app_common/components/home/home.component';


const routes: Routes = [
	{
		path: '', component: WrapperComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'home', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
		]
	},
	{
		path: 'operation',
		loadChildren: () =>
			import('./Modules/operation/operation.module').then(m => m.OperationModule)
	},
	{
		path: 'login',
		loadComponent: () =>
			import('src/app/z_app_common/components/login/login.component').then(a => a.LoginComponent)
	},
	{
		path: 'unauthorized',
		loadComponent: () =>
			import('src/app/z_app_common/components/unauthorize/unauthorize.component').then(a => a.UnauthorizeComponent)
	},
	{
		path: '**',
		loadComponent: () =>
			import('src/app/z_app_common/components/not-found/not-found.component').then(a => a.NotFoundComponent)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
