import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export interface IFoods {
  name: string;
  price: number;
  imgUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private firestoreRef = getFirestore(initializeApp(environment.firebase));

  constructor() {}

  async getAllFoods() {
    const documentRefFoods = collection(this.firestoreRef, 'foods');

    return await getDocs(documentRefFoods).then((res) => {
      return res.docs.map((doc) => doc.data());
    });
  }
}
