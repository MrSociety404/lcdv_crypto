import router from '../router';

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  useGrouping: true,
  minimumFractionDigits: 0,
});

export const navigateBack = () => {
  router.go(-1);
};

export const navigateTo = (path: string, option?: any) => {
  if (option) {
    return router.push({ name: path, params: option });
  }
  router.push({ name: path });
};
