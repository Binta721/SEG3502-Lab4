import { Routes } from '@angular/router';
import { ContactForm } from './contact-form/contact-form';
import { ContactResult } from './contact-result/contact-result';

export const routes: Routes = [
  { path: 'formulaire', component: ContactForm },
  { path: 'resultat', component: ContactResult },
  { path: '', redirectTo: 'formulaire', pathMatch: 'full' },
  { path: '**', redirectTo: 'formulaire' }
];