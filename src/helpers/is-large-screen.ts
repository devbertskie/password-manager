import isBrowser from './is-browser';

export const isLargeScreen = () => isBrowser() && window.innerWidth >= 1024;
