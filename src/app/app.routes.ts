import { Routes } from '@angular/router';
import { App } from './app';
import { Supersales } from './supersales/supersales';
import { Agentsales } from './agentsales/agentsales';

export const routes: Routes = [
    { path: '', component: App, pathMatch: 'full' },
    { path: 'supersales' , component: Supersales },
    { path: 'agentsales' , component:Agentsales },
    { path: '**', redirectTo: '' }


    
];
