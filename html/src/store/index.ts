import { createStore } from 'vuex';
import { cryptos } from '../utils/config';

export default createStore({
  state() {
    return {
      wallet: [
        {
          id: 'BTC',
          quantity: 140,
        },
        {
          id: 'KMA',
          quantity: 54,
        },
      ],
      cryptos: cryptos,
      money: 26146,
    };
  },
  getters: {
    totalWalletValue: (state: any) => {
      let total = 0;
      state.wallet.forEach((el: any) => {
        const crypto = state.cryptos.find(
          (cryptoEl: any) => cryptoEl.id === el.id
        );
        if (!crypto) return;
        total += crypto.price * el.quantity;
      });
      return total;
    },
  },
  mutations: {
    initCrypto: (state: any, payload: any) => {
      state.cryptos = payload.cryptos;
      state.wallet = payload.wallet;
      state.money = payload.money;
    },
    addCryptoToWallet: (
      state: any,
      payload: { id: string; quantity: number; price: number }
    ) => {
      if (state.money < payload.price) throw new Error('Fond insuffisant');

      const crypto = state.wallet.find(
        (cryptoEl: any) => cryptoEl.id === payload.id
      );
      if (!crypto) {
        // If crypto doesn't exist in wallet add it
        state.wallet.push({
          id: payload.id,
          quantity: payload.quantity,
        });
      } else {
        const cryptoId = state.wallet.indexOf(crypto);
        state.wallet[cryptoId].quantity += payload.quantity;
      }
      state.money -= payload.price;
    },
    sellCryptoToWallet: (
      state: any,
      payload: { id: string; quantity: number; price: number }
    ) => {
      const crypto = state.wallet.find(
        (cryptoEl: any) => cryptoEl.id === payload.id
      );
      if (!crypto) throw new Error('Vous ne possèdez pas de cette crypto');
      const cryptoId = state.wallet.indexOf(crypto);
      if (state.wallet[cryptoId].quantity < payload.quantity)
        throw new Error('Vous ne possèdez pas assez de cette crypto');
      state.wallet[cryptoId].quantity -= payload.quantity;
      state.money += payload.price;
    },
  },
});
