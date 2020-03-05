import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllNotesViewComponent } from './all-notes-view/all-notes-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { StartPageComponent } from './start-page/start-page.component';

const appRoutes: Routes = [
  {
    path: 'all-notes-view',
    component: AllNotesViewComponent
  },
  {
    path: 'start-page',
    component: StartPageComponent
  },
  {
    path: 'note-form',
    component: NoteFormComponent
  },
  {
    path: 'note-add',
    component: NoteAddComponent
  },
  {
    path: 'note-edit',
    component: NoteEditComponent
  },
  {
    path: 'note-view',
    component: NoteViewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AllNotesViewComponent,
    NoteViewComponent,
    NoteFormComponent,
    NoteAddComponent,
    NoteEditComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
