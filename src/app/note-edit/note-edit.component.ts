import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Notatka} from '../model/notatka';
import {ApiServiceService} from '../api-service/api-service.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {NoteFormComponent} from '../note-form/note-form.component';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  @ViewChild(NoteFormComponent, {static: false})
  noteFormComponent: NoteFormComponent;


  notatka: Notatka;
  noteToEdit: Notatka;
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.getNote();
    localStorage.removeItem('note_to_edit');
  }
  getNote() {
    const idString = localStorage.getItem('note_to_edit');
    const id = (Number(idString));
    this.apiService.getNoteById(id).subscribe(
      res => {
        this.noteToEdit = res;
        this.notatka = this.noteToEdit;
        this.noteChange(this.noteToEdit);
      },
      err => {
        alert('An error in "getNoteById(id: number)" method has occurred');
      }
    );
  }
  updateNote() {
    if (this.notatka.nazwa != null && this.notatka.opis != null) {
      const note: Notatka = {
        id: this.notatka.id,
        nazwa: this.notatka.nazwa,
        opis: this.notatka.opis,
        ocena: this.notatka.ocena,
        kursId: this.notatka.kursId,
        prowadzacyId: this.notatka.prowadzacyId,
        uczelniaId: this.notatka.uczelniaId,
        listOfPlikId: this.notatka.listOfPlikId
      };
      this.noteFormComponent.upload();
      this.apiService.updateNote(note).subscribe(
        res => {
        },
        err => {alert('An error occurred while updating the note'); }
      );
    }
  }
  noteChange(newNote: Notatka) {
    this.notatka = newNote;
  }

}
