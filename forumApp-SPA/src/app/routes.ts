import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './threads/thread/thread.component';
import { MessagesComponent } from './messages/messages.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AuthGuard } from './guards/auth.guard';
import { ThreadSiteComponent } from './threads/thread-site/thread-site.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { UserDetailResolver } from './resolvers/user-detail.resolver';
import { ThreadDetailResolver } from './resolvers/thread-detail.resolver';
import { ThreadListResolver } from './resolvers/thread-list.resolver';
import { ProfileEditComponent } from './profiles/profile-edit/profile-edit.component';

export const appRoutes: Routes = [// array of routes
    { path: '', component: HomeComponent },
    {
        path: '', // do tej sciezki dodje sie sciezki childrenroutes
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'threads', component: ThreadComponent, resolve: {threads: ThreadListResolver}},
            { path: 'threads/:id', component: ThreadSiteComponent, resolve: {thread: ThreadDetailResolver}},
            { path: 'profile/:id', component: ProfileComponent, resolve: {user: UserDetailResolver}},
            { path: 'profile/edit', component: ProfileEditComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'favourite', component: FavouriteComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
    // cokolwiek bedzie innego niz zdefiniowane routes zostanie przekierowane do home
    // first match win system dlatego wazna kolejnosc
];
