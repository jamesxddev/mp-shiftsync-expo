let globalRouter: any = null;

export const setRouter = (routerInstance: any) => {
  globalRouter = routerInstance;
};

export const navigateToLogin = () => {
  if (globalRouter) {
    globalRouter.replace('/login');
  } else {
    console.warn('Router not set');
  }
};