import {Injectable} from '@angular/core';
import {Uczelnia} from '../model/uczelnia';

@Injectable({
  providedIn: 'root'
})
export class UczelniaContainer {
  listOfUczelnia: Uczelnia[] = [];
  setListOfUczelnia(newList: Uczelnia[]) {
    this.listOfUczelnia = newList;
  }
  getListOfUczelnia(): Uczelnia[] {
    return this.listOfUczelnia;
  }
  getUczelniaById(id: number): Uczelnia {
    if (this.listOfUczelnia == null) {
      return null;
    } else {
      for (const uczelnia of this.listOfUczelnia) {
        if (uczelnia.id === id) {
          return uczelnia;
        }
      }
      return null;
    }
  }
  getUczelniaNameById(id: number): string {
    if (this.listOfUczelnia == null) {
      return null;
    } else {
      for (const uczelnia of this.listOfUczelnia) {
        if (uczelnia.id === id) {
          return uczelnia.nazwa;
        }
      }
      return null;
    }
  }
  getUczelniaByIdString(id: string): Uczelnia {
    if (id != null) {
      return this.getUczelniaById(Number(id));
    }
    return null;
  }
  getUczelniaNameByIdString(id: string): string {
    if (id != null) {
      return this.getUczelniaNameById(Number(id));
    }
    return null;
  }
}
