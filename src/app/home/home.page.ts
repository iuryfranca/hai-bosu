import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { CartService } from '@app/services/cart/cart.service';
import { FoodsService, IFoods } from '@app/services/foods/foods.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listProducts: IFoods[] = [] as IFoods[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private foodsService: FoodsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.foodsService.getAllFoods().then((res: IFoods[]) => {
      this.listProducts = res;
    });
  }

  get user() {
    return this.authService.userAuth;
  }

  amountItemCartById(name: string) {
    return this.cartService.getAmountItemCart(name);
  }

  get amountItemCart() {
    return this.cartService.getAmountAllItemsCart();
  }

  get amountPriceCart() {
    return this.cartService.amountPriceCart();
  }

  get cart() {
    return this.cartService.cart;
  }

  async addItemCart(newProduct: IFoods) {
    await this.cartService.addItemCart(newProduct);
  }

  async removeItemCart(name: string) {
    await this.cartService.removeItem(name);
  }

  async removeAllItemCart(name: string) {
    await this.cartService.removeAllItemCart(name);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('welcome/login', { replaceUrl: true });
  }
}
