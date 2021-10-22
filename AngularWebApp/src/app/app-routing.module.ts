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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '*', redirectTo: '/login'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'teesheet', component: TeeSheetComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'members', component: MembersComponent},
  {path: 'events', component: EventsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'community', component: CommunityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
