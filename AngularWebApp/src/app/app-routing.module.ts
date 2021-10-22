import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeeSheetComponent } from './pages/tee-sheet/tee-sheet.component';
import { PlayersComponent } from './pages/players/players.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BillingComponent } from './pages/billing/billing.component';
import { MembersComponent } from './pages/members/members.component';
import { EventsComponent } from './pages/events/events.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CommunityComponent } from './pages/community/community.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '*', redirectTo: '/login'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'teesheet', component: TeeSheetComponent, canActivate: [AuthGuard] },
  {path: 'players', component: PlayersComponent, canActivate: [AuthGuard] },
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  {path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  {path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
