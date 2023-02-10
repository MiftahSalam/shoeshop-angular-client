import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Item, UpdateItem } from 'src/app/core/model/graphql/cart.graphql';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storedCartItems = new BehaviorSubject<Item[]>({} as Item[]);

  constructor() {}

  getAllAvailableCartItems(): Item[] {
    const storedCartItemsStr = localStorage.getItem('cartItems');
    this.storedCartItems.next(
      storedCartItemsStr && JSON.parse(storedCartItemsStr)
    );

    return this.storedCartItems.value;
  }

  addCartItem(newItem: Item) {
    let cartItems = this.getAllAvailableCartItems();
    const curItemsCount = (cartItems && cartItems.length) || 0;
    if (curItemsCount > 0) {
      if (
        cartItems.find((item) => item.product.id === newItem.product.id) ===
        undefined
      ) {
        cartItems.push(newItem);
      }
    } else {
      cartItems = new Array<Item>(newItem);
    }

    if (curItemsCount !== cartItems.length) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.storedCartItems.next(cartItems);
    }
  }

  removeItemFromCart(id: string) {
    let cartItems = this.getAllAvailableCartItems();
    const prevItemsCount = (cartItems && cartItems.length) || 0;
    if (prevItemsCount > 0) {
      cartItems = cartItems.filter((item) => item.product.id !== id);
    }

    if (prevItemsCount !== cartItems.length) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.storedCartItems.next(cartItems);
    }
  }

  updateCartItem(updateItem: UpdateItem) {
    let cartItems = this.getAllAvailableCartItems();
    const curItemsCount = (cartItems && cartItems.length) || 0;

    if (curItemsCount > 0) {
      let foundItem = cartItems.find(
        (item) => item.product.id === updateItem.productId
      );
      if (foundItem) {
        const idx = cartItems.indexOf(foundItem);

        // console.log('CartService-updateCartItem idx', idx);

        foundItem.quantity = updateItem.quantity;
        cartItems[idx] = foundItem;
      }
    }

    // console.log('CartService-updateCartItem cartItems', cartItems);
    // console.log('CartService-updateCartItem curItemsCount', curItemsCount);
    // console.log(
    //   'CartService-updateCartItem cartItems.length',
    //   cartItems.length
    // );

    if (curItemsCount === cartItems.length) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.storedCartItems.next(cartItems);
    }
  }
}
