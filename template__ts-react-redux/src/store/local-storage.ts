import { BasketData } from '../types/state-types';

export const Basket = new class {

  _updateStorageData() {
    window.dispatchEvent(new Event('onStorage'));
  }

  _updatePromo() {
    window.dispatchEvent(new Event('onPromo'));
  }

  _promoKey = 'promo';
  _discountKey = 'discount';

  addItem(id: number) {
    const item = localStorage.getItem(id.toString());
    if (item) {
      const newValue = (Number(item) + 1).toString();
      localStorage.setItem(id.toString(), newValue);
    } else {
      localStorage.setItem(id.toString(), '1');
    }
    ///
    this._updateStorageData();
  }

  setItem(id: number, value: number) {
    localStorage.setItem(id.toString(), value.toString());
    ///
    this._updateStorageData();
  }

  getLength() {
    let length = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (Number(localStorage.key(i))) {
        length += 1;
      }
    }
    return length;
  }

  getItem(id: number) {
    return Number(localStorage.getItem(id.toString()));
  }

  getItems() {
    const items: {[key: number]: number} = {};
    for (let i = 0; i < localStorage.length; i++) {
      if (Number(localStorage.key(i))) {
        items[Number(localStorage.key(i))] = Number(localStorage.getItem(localStorage.key(i) as string));
      }
    }
    return items;
  }

  removeItem(id: number) {
    const item = localStorage.getItem(id.toString());
    if (Number(item) - 1 <= 0) {
      localStorage.removeItem(id.toString());
    } else {
      const newValue = (Number(item) - 1).toString();
      localStorage.setItem(id.toString(), newValue);
    }
    ///
    this._updateStorageData();
  }

  removeAllItems(id: number) {
    localStorage.removeItem(id.toString());
    if (this.getLength() === 0) {
      this.removePromo();
      this.removePromoDiscount();
    }
    ///
    this._updateStorageData();
  }

  resetBasket() {
    const items = this.getItems();
    for (const key in items) {
      localStorage.removeItem(key);
    }
    this.removePromo();
    this.removePromoDiscount();
    ///
    this._updateStorageData();
  }

  setPromo(promo: string) {
    localStorage.setItem(this._promoKey, promo);
  }

  removePromo() {
    localStorage.removeItem(this._promoKey);
  }

  getPromo() {
    return localStorage.getItem(this._promoKey);
  }

  setPromoDiscount(discount: number) {
    localStorage.setItem(this._discountKey, discount.toString());
    ///
    this._updatePromo();
  }

  getPromoDiscount() {
    return Number(localStorage.getItem(this._discountKey));
  }

  removePromoDiscount() {
    localStorage.removeItem(this._discountKey);
    ///
    this._updatePromo();
  }

  getBasketData() {
    const res: BasketData = {
      camerasIds: [],
      coupon: null
    };
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = Number(localStorage.key(i));
      if (storageKey) {
        for (let j = 0; j < Number(localStorage.getItem(localStorage.key(i) as string)); j++) {
          res.camerasIds.push(storageKey);
        }
      }
    } // add cameraIds
    if (localStorage.getItem(this._discountKey) && localStorage.getItem(this._promoKey)) {
      res.coupon = localStorage.getItem(this._promoKey) as string;
    } // add coupon if exists
    return res;
  }
};
