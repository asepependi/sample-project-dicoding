import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not support in the browser');
    return;
  }

  const Wb = new Workbox('./sw.bundle.js');

  try {
    await Wb.register();
    console.log('Service Worker registered');
  } catch (error) {
    console.log('Failed to register Service Worker', error);
  }
};

export default swRegister;
