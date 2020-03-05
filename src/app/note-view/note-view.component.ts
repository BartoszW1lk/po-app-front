import {Component, Injectable, OnInit} from '@angular/core';
import {Notatka} from '../model/notatka';
import {ApiServiceService} from '../api-service/api-service.service';
import {NoteData} from '../note-data/note-data';
import {KursContainer} from '../model-container/kurs-container';
import {ProwadzacyContainer} from '../model-container/prowadzacy-container';
import {UczelniaContainer} from '../model-container/uczelnia-container';
import {PlikContainer} from '../model-container/plik-container';
import {Plik} from '../model/plik';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  note: Notatka;
  kursTitle: string;
  prowadzacyName: string;
  uczelniaName: string;
  ocena: number;
  listNamesOfPlik: string[] = [];
  listOfPlik: Plik[] = [];
  stars = ['star1', 'star2', 'star3', 'star4', 'star5'];
  starClassChecked = 'fa fa-star checked';
  starClassUnchecked = 'fa fa-star';
  sciezka = '/all-notes-view';

  constructor(private apiService: ApiServiceService, private noteData: NoteData, private kursContainer: KursContainer,
              private prowadzacyContainer: ProwadzacyContainer, private uczelniaContainer: UczelniaContainer,
              private plikContainer: PlikContainer) { }


  ngOnInit() {
    this.getNote();
    this.drawStars();
    this.initializeKursTitle();
    this.initializeProwadzacyName();
    this.initializeUczelniaName();
    this.initializeListOfPlik();
  }
  drawStars() {
    this.ocena = Number(this.note.ocena);
    for (let i = 1; i < 6; i++) {
      document.getElementById('star' + i).className = this.starClassUnchecked;
    }
    let counter = 1;
    for (; counter < this.ocena + 1; counter++) {
      document.getElementById('star' + counter).className = this.starClassChecked;
    }
  }
  initializeKursTitle() {
    if (this.note != null) {
      this.kursTitle = this.kursContainer.getKursTitleByIdString(this.note.kursId);
    }
  }
  initializeProwadzacyName() {
    if (this.note != null) {
      this.prowadzacyName = this.prowadzacyContainer.getProwadzacyNameByIdString(this.note.prowadzacyId);
    }
  }
  initializeUczelniaName() {
    if (this.note != null) {
      this.uczelniaName = this.uczelniaContainer.getUczelniaNameByIdString(this.note.uczelniaId);
    }
  }
  initializeListOfPlik() {
    if (this.note != null) {
      this.listOfPlik = this.plikContainer.getListOfPlikByNoteId(this.note.id);
    }
  }
  getNote() {
    this.note = this.noteData.getNote();
  }
  edit() {
    localStorage.setItem('note_to_edit', this.note.id.toString());
  }
  deleteNote() {
    this.apiService.deleteNote(this.note.id).subscribe();
  }
  getFile(id: number) {
    const link = document.createElement('a');
    link.setAttribute('href', this.apiService.GET_FILE + id);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
