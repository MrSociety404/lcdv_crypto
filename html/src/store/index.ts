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
      money: 0,
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
    addCryptoToWallet: (
      state: any,
      payload: { id: string; quantity: number }
    ) => {
      const crypto = state.cryptos.find(
        (cryptoEl: any) => cryptoEl.id === payload.id
      );
      const cryptoId = state.cryptos.indexOf(crypto);
      if (cryptoId === -1) {
        state.wallet.push({
          id: payload.id,
          quantity: payload.quantity,
        });
      } else {
        state.wallet[cryptoId].quantity += payload.quantity;
      }
    },
    sellCryptoToWallet: (
      state: any,
      payload: { id: string; quantity: number }
    ) => {
      const crypto = state.cryptos.find(
        (cryptoEl: any) => cryptoEl.id === payload.id
      );
      const cryptoId = state.cryptos.indexOf(crypto);
      state.wallet[cryptoId].quantity -= payload.quantity;
    },
  },
});
