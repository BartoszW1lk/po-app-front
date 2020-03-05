import {Prowadzacy} from '../model/prowadzacy';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProwadzacyContainer {
  listOfProwadzacy: Prowadzacy[] = [];
  setListOfProwadzacy(newList: Prowadzacy[]) {
    this.listOfProwadzacy = newList;
  }
  getListOfProwadzacy(): Prowadzacy[] {
    return this.listOfProwadzacy;
  }
  getProwadzacyById(id: number): Prowadzacy {
    if (this.listOfProwadzacy == null) {
      return null;
    } else {
      for (const prowadzacy of this.listOfProwadzacy) {
        if (prowadzacy.id === id) {
          return prowadzacy;
        }
      }
      return null;
    }
  }
  getProwadzacyNameById(id: number): string {
    if (this.listOfProwadzacy == null) {
      return null;
    } else {
      for (const prowadzacy of this.listOfProwadzacy) {
        if (prowadzacy.id === id) {
          return prowadzacy.imie + ' ' + prowadzacy.nazwisko;
        }
      }
      return null;
    }
  }
  getProwadzacyByIdString(id: string): Prowadzacy {
    if (id != null) {
      return this.getProwadzacyById(Number(id));
    }
    return null;
  }
  getProwadzacyNameByIdString(id: string): string {
    if (id != null) {
      return this.getProwadzacyNameById(Number(id));
    }
    return null;
  }

}
