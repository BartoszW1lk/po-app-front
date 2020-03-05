import {Kurs} from '../model/kurs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KursContainer {
  listOfKurs: Kurs[] = [];
  setListOfKurs(newList: Kurs[]) {
    this.listOfKurs = newList;
  }
  getListOfKurs(): Kurs[] {
    return this.listOfKurs;
  }
  getKursById(id: number): Kurs {
    if (this.listOfKurs == null) {
      return null;
    } else {
      for (const kurs of this.listOfKurs) {
        if (kurs.id === id) {
          return kurs;
        }
      }
      return null;
    }
  }
  getKursTitleById(id: number): string {
    if (this.listOfKurs == null) {
      return null;
    } else {
      for (const kurs of this.listOfKurs) {
        if (kurs.id === id) {
          return kurs.nazwa;
        }
      }
      return null;
    }
  }
  getKursByIdString(id: string): Kurs {
    if (id != null) {
      return this.getKursById(Number(id));
    }
    return null;
  }
  getKursTitleByIdString(id: string): string {
    if (id != null) {
      return this.getKursTitleById(Number(id));
    }
    return null;
  }
}
