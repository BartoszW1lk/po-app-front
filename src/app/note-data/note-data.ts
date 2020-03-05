import {Notatka} from '../model/notatka';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteData {
  private note: Notatka;
  getNote(): Notatka {
    return this.note;
  }
  setNote(note: Notatka) {
    this.note = note;
  }
}
