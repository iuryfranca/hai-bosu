import { Injectable } from '@angular/core';
import { IFoods } from '../foods/foods.service';
import { AlertController } from '@ionic/angular';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '@environment/environment';
import { AuthService, IUser } from '../auth/auth.service';

export interface ICart extends IFoods {
  amount_in_cart: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private firestoreRef = getFirestore(initializeApp(environment.firebase));

  cart: ICart[] = [] as ICart[];
  temporaryCart: ICart[] = [] as ICart[];

  constructor(
    private alertController: AlertController,
    private authServise: AuthService
  ) {
    if (authServise.userAuth) {
      this.cart = authServise.userAuth.cart;
    }
  }

  amountPriceCart() {
    return this.cart?.reduce((a, b) => a + b.price * b.amount_in_cart, 0);
  }

  addItemCart = async (newProduct: IFoods): Promise<void> => {
    const existingItem = this.cart?.find(
      (product) => product.name === newProduct.name
    );

    this.temporaryCart = [...this.cart];

    if (existingItem) {
      this.temporaryCart.splice(this.temporaryCart.indexOf(existingItem), 1, {
        ...existingItem,
        amount_in_cart: existingItem.amount_in_cart + 1,
      });
    } else {
      this.temporaryCart = [
        ...this.temporaryCart,
        { ...newProduct, amount_in_cart: 1 },
      ];
    }

    await this.changeItemsInFirebase('add');
  };

  removeItem = async (name: string) => {
    const existingItem: ICart = this.cart?.find(
      (product) => product.name === name
    );
    this.temporaryCart = [...this.cart];

    if (existingItem && existingItem.amount_in_cart > 1) {
      this.temporaryCart.splice(this.temporaryCart.indexOf(existingItem), 1, {
        ...existingItem,
        amount_in_cart: existingItem.amount_in_cart - 1,
      });
    } else {
      this.temporaryCart.splice(this.cart?.indexOf(existingItem), 1);
    }

    await this.changeItemsInFirebase('remove');
  };

  removeAllItemCart = async (name: string) => {
    this.temporaryCart = this.cart?.filter((obj) => obj.name !== name);
    await this.changeItemsInFirebase('remove');
  };

  changeItemsInFirebase = async (action: 'add' | 'remove') => {
    console.log(this.authServise.userAuth);
    const documentRef = doc(
      this.firestoreRef,
      'users',
      this.authServise.userAuth.uid
    );

    await updateDoc(documentRef, {
      cart: [...this.temporaryCart],
    })
      .then(async () => {
        await this.authServise
          .getUserById(this.authServise.userAuth?.uid)
          .then((user: IUser) => {
            this.cart = user.cart;
            sessionStorage.setItem('userAuth', JSON.stringify(user));
          });
      })
      .catch((error) => {
        this.showAlert(
          `Erro ao ${
            action === 'add' ? 'adicionar' : 'remover'
          } produto no carrinho`,
          error.code
        );
      });
  };

  getAmountItemCart = (name: string): number => {
    return this.cart?.find((item) => item.name === name)?.amount_in_cart;
  };

  getAmountAllItemsCart = (): number => {
    return this.cart?.reduce((a, b) => a + b.amount_in_cart, 0);
  };

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
