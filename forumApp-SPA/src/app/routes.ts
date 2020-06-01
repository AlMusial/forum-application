import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues/issues.component';
import { MessagesComponent } from './messages/messages.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [// array of routes
    { path: '', component: HomeComponent },
    {
        path: '', // do tej sciezki dodje sie sciezki childrenroutes
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'issues', component: IssuesComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'favourite', component: FavouriteComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
    // cokolwiek bedzie innego niz zdefiniowane routes zostanie przekierowane do home
    // first match win system dlatego wazna kolejnosc
];
