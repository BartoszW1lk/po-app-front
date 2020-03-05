import {Injectable} from '@angular/core';
import {Plik} from '../model/plik';
import {Notatka} from '../model/notatka';

@Injectable({
  providedIn: 'root'
})
export class PlikContainer {
  listOfPlik: Plik[] = [];
  listOfPlikNames: string[] = [];
  setListOfPlik(newList: Plik[]) {
    this.listOfPlik = newList;
  }
  getListOfPlik(): Plik[] {
    return this.listOfPlik;
  }
  getPlikById(id: number): Plik {
    if (this.listOfPlik == null) {
      return null;
    } else {
      for (const plik of this.listOfPlik) {
        if (plik.id === id) {
          return plik;
        }
      }
      return null;
    }
  }
  getPlikNazwaById(id: number): string {
    if (this.listOfPlik == null) {
      return null;
    } else {
      for (const plik of this.listOfPlik) {
        if (plik.id === id) {
          return plik.nazwa;
        }
      }
      return null;
    }
  }
  getPlikByIdString(id: string): Plik {
    if (id != null) {
      return this.getPlikById(Number(id));
    }
    return null;
  }
  getPlikTitleByIdString(id: string): string {
    if (id != null) {
      return this.getPlikNazwaById(Number(id));
    }
    return null;
  }
  getListOfPlikByNoteId(id: number): Plik[] {
    if (this.listOfPlik != null) {
      const listOfPlikReturn: Plik[] = [];
      for (const plik of this.listOfPlik) {
        if (plik.notatkaId.toString() === id.toString()) {
          listOfPlikReturn.push(plik);
        }
      }
      return listOfPlikReturn;
    }
    return null;
  }
}
