import { Component, OnInit } from '@angular/core';
import {Notatka} from '../model/notatka';
import {ApiServiceService} from '../api-service/api-service.service';
import { NoteData } from '../note-data/note-data';
import {KursContainer} from '../model-container/kurs-container';
import {UczelniaContainer} from '../model-container/uczelnia-container';
import {ProwadzacyContainer} from '../model-container/prowadzacy-container';
import {PlikContainer} from '../model-container/plik-container';

@Component({
  selector: 'app-all-notes-view',
  templateUrl: './all-notes-view.component.html',
  styleUrls: ['./all-notes-view.component.css']
})
export class AllNotesViewComponent implements OnInit {
  notatki: Notatka[] = [];

  constructor(private apiService: ApiServiceService, private noteData: NoteData,
              private kursContainer: KursContainer, private uczelniaContainer: UczelniaContainer,
              private plikContainer: PlikContainer,
              private prowadzacyContainer: ProwadzacyContainer) { }

  ngOnInit() {
    this.getAllNotes();
    this.getAllCourses();
    this.getAllColleges();
    this.getAllTeachers();
    this.getAllFiles();
  }
  public getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notatki = res;
      },
      err => {
        alert('An error has occurred');
      }
    );
  }
  public showNote(notatka: Notatka) {
    this.noteData.setNote(notatka);
  }
  deleteNote(noteToDelete: Notatka) {
    this.apiService.deleteNote(noteToDelete.id).subscribe();
  }
  public getAllCourses() {
    this.apiService.getAllCourses().subscribe(
      res => {
        this.kursContainer.setListOfKurs(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }
  public getAllColleges() {
    this.apiService.getAllColleges().subscribe(
      res => {
        this.uczelniaContainer.setListOfUczelnia(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }
  public getAllTeachers() {
    this.apiService.getAllTeacher().subscribe(
      res => {
        this.prowadzacyContainer.setListOfProwadzacy(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }
  public getAllFiles() {
    this.apiService.getAllFiles().subscribe(
      res => {
        this.plikContainer.setListOfPlik(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }
}
