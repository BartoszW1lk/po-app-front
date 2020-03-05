import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Notatka} from '../model/notatka';
import {Uczelnia} from '../model/uczelnia';
import {Prowadzacy} from '../model/prowadzacy';
import {Plik} from '../model/plik';
import {Kurs} from '../model/kurs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private BASE_URL = 'http://localhost:8081';
  private ALL_NOTES = `${this.BASE_URL}/notatka/all`;
  private GET_NOTE_BY_ID = `${this.BASE_URL}/notatka/getById/`;
  private SAVE_NOTE = `${this.BASE_URL}/notatka`;
  private UPDATE_NOTE = `${this.BASE_URL}/notatka/update/`;
  private DELETE_NOTE = `${this.BASE_URL}/notatka/delete/`;

  private GET_ALL_COURSES = `${this.BASE_URL}/kurs/all`;

  private GET_ALL_COLLEGES = `${this.BASE_URL}/uczelnia/all`;

  private GET_ALL_TEACHERS = `${this.BASE_URL}/prowadzacy/all`;

  private GET_ALL_FILES = `${this.BASE_URL}/plik/all`;
  private FILE_SAVE = `${this.BASE_URL}/plik/save/`;
  public GET_FILE = `${this.BASE_URL}/plik/get/`;

  constructor(private http: HttpClient) { }
  getAllNotes(): Observable<Notatka[]> {
    return this.http.get<Notatka[]>(this.ALL_NOTES);
  }
  getNoteById(id: number): Observable<Notatka> {
    return this.http.get<Notatka>(this.GET_NOTE_BY_ID + id);
  }
  saveNote(note: Notatka): Observable<Notatka> {
    return this.http.post<Notatka>(this.SAVE_NOTE, note);
  }
  updateNote(note: Notatka): Observable<Notatka> {
    alert('Zaktualizowano notatkę!');
    return this.http.post<Notatka>(this.UPDATE_NOTE + note.id, note);
  }
  deleteNote(id: number): Observable<any> {
    alert(this.DELETE_NOTE + id);
    return this.http.get(this.DELETE_NOTE + id.toString());
  }
  getAllCourses(): Observable<Kurs[]> {
    return this.http.get<Kurs[]>(this.GET_ALL_COURSES);
  }
  getAllColleges(): Observable<Uczelnia[]> {
    return this.http.get<Uczelnia[]>(this.GET_ALL_COLLEGES);
  }
  getAllTeacher(): Observable<Prowadzacy[]> {
    return this.http.get<Prowadzacy[]>(this.GET_ALL_TEACHERS);
  }
  getAllFiles(): Observable<Plik[]> {
    return this.http.get<Plik[]>(this.GET_ALL_FILES);
  }
  pushFileToStorage(file: File, id: number): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.FILE_SAVE + id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
  getFileById(id: number) {
    return this.http.get<Plik>(this.GET_FILE + id);
  }
}
