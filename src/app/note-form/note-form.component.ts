import {Component, EventEmitter, Injectable, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Notatka} from '../model/notatka';
import {ApiServiceService} from '../api-service/api-service.service';
import {KursContainer} from '../model-container/kurs-container';
import {ProwadzacyContainer} from '../model-container/prowadzacy-container';
import {UczelniaContainer} from '../model-container/uczelnia-container';
import {Prowadzacy} from '../model/prowadzacy';
import {Uczelnia} from '../model/uczelnia';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Kurs} from '../model/kurs';
import {Plik} from '../model/plik';
import {PlikContainer} from '../model-container/plik-container';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit, OnChanges {
 // file
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  saveFileFlag: boolean;
  // file



  @Input()
  noteInitial: Notatka;
  id: number;
  nazwa: string;
  opis: string;
  ocena: string;
  kursId: string;
  prowadzacyId: string;
  uczelniaId: string;
  listOfPlikId: string[];

  noteFormDiv: boolean;
  kursSelectDiv: boolean;
  prowadzacySelectDiv: boolean;
  uczelniaSelectDiv: boolean;
  plikSelectDiv: boolean;

  kursTitle: string;
  prowadzacyName: string;
  uczelniaName: string;
  listOfPlik: Plik[] = [];

  @Output()
  eventEmitter = new EventEmitter<Notatka>();

  constructor(private apiService: ApiServiceService, private kursContainer: KursContainer,
              private prowadzacyContainer: ProwadzacyContainer,
              private uczelniaContainer: UczelniaContainer,
              private  plikContainer: PlikContainer) { }

  ngOnInit() {
    this.noteFormDiv = false;
    this.kursSelectDiv = true;
    this.prowadzacySelectDiv = true;
    this.uczelniaSelectDiv = true;
    this.plikSelectDiv = true;
    this.saveFileFlag = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.noteChange();
  }
  noteChange() {
    if (this.noteInitial != null) {
      this.id = this.noteInitial.id;
      this.nazwa = this.noteInitial.nazwa;
      this.opis = this.noteInitial.opis;
      this.ocena = this.noteInitial.ocena;
      this.kursId = this.noteInitial.kursId;
      this.prowadzacyId = this.noteInitial.prowadzacyId;
      this.uczelniaId = this.noteInitial.uczelniaId;
      this.listOfPlikId = this.noteInitial.listOfPlikId;
      this.initializeListOfPlik();
      this.noteInitial = null;
    }
    const newNote: Notatka = {
      id: this.id,
      nazwa: this.nazwa,
      opis: this.opis,
      ocena: this.ocena,
      kursId: this.kursId,
      prowadzacyId: this.prowadzacyId,
      uczelniaId: this.uczelniaId,
      listOfPlikId: this.listOfPlikId
    };
    this.kursTitle = this.kursContainer.getKursTitleByIdString(this.kursId);
    this.prowadzacyName = this.prowadzacyContainer.getProwadzacyNameByIdString(this.prowadzacyId);
    this.uczelniaName = this.uczelniaContainer.getUczelniaNameByIdString(this.uczelniaId);
    this.eventEmitter.emit(newNote);
  }
  selectKurs() {
    this.noteFormDiv = true;
    this.kursSelectDiv = false;
    this.prowadzacySelectDiv = true;
    this.uczelniaSelectDiv = true;
    this.plikSelectDiv = true;
  }
  selectProwadzacy() {
    this.noteFormDiv = true;
    this.kursSelectDiv = true;
    this.prowadzacySelectDiv = false;
    this.uczelniaSelectDiv = true;
    this.plikSelectDiv = true;
  }
  selectUczelnia() {
    this.noteFormDiv = true;
    this.kursSelectDiv = true;
    this.prowadzacySelectDiv = true;
    this.uczelniaSelectDiv = false;
    this.plikSelectDiv = true;
  }
  selectPlik() {
    this.noteFormDiv = true;
    this.kursSelectDiv = true;
    this.prowadzacySelectDiv = true;
    this.uczelniaSelectDiv = true;
    this.plikSelectDiv = false;
  }
  endSelect() {
    this.noteFormDiv = false;
    this.kursSelectDiv = true;
    this.prowadzacySelectDiv = true;
    this.uczelniaSelectDiv = true;
    this.plikSelectDiv = true;
  }
  selectedKurs(kurs: Kurs) {
    this.endSelect();
    this.kursId = kurs.id.toString();
    this.noteChange();
  }
  selectedProwadzacy(prowadzacy: Prowadzacy) {
    this.endSelect();
    this.prowadzacyId = prowadzacy.id.toString();
    this.noteChange();
  }
  selectedUczelnia(uczelnia: Uczelnia) {
    this.endSelect();
    this.uczelniaId = uczelnia.id.toString();
    this.noteChange();
  }
  upload() {
    if (this.selectedFiles != null) {
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.apiService.pushFileToStorage(this.currentFileUpload, this.id).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            alert('File Successfully Uploaded');
          }
          this.selectedFiles = undefined;
        }
      );
    }
  }
  initializeListOfPlik() {
    this.listOfPlik = this.plikContainer.getListOfPlikByNoteId(this.noteInitial.id);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  getFile(id: number) {
    const link = document.createElement('a');
    link.setAttribute('href', this.apiService.GET_FILE + id);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
