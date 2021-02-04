import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {path: 'list', component: NotesListComponent, data: {reuse: true}},
  {path: 'list', component: NotesListComponent},
  {path: 'new', component: NoteDetailsComponent},
  {path: ':id', component: NoteDetailsComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
