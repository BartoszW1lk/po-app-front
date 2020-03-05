import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../api-service/api-service.service';
import {Notatka} from '../model/notatka';
import {NoteFormComponent} from '../note-form/note-form.component';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {
  @ViewChild(NoteFormComponent, {static: false})
  noteFormComponent: NoteFormComponent;
  savedNote: Notatka;
  notatka: Notatka;
  constructor(private apiService: ApiServiceService) { }
  ngOnInit() {
  }
  saveNote() {
    if (this.notatka.nazwa != null && this.notatka.opis != null) {
      const note: Notatka = {
        id: null,
        nazwa: this.notatka.nazwa,
        opis: this.notatka.opis,
        ocena: this.notatka.ocena,
        kursId: this.notatka.kursId,
        prowadzacyId: this.notatka.prowadzacyId,
        uczelniaId: this.notatka.uczelniaId,
        listOfPlikId: this.notatka.listOfPlikId
      };
      this.apiService.saveNote(note).subscribe(
        res => {
          this.savedNote = res;
        },
        err => {alert('An error occurred while saving the note'); }
      );
    }
  }
  noteChange(newNote: Notatka) {
    this.notatka = newNote;
  }
}
