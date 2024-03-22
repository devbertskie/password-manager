import isBrowser from './is-browser';

const isSmallScreen = (): boolean => isBrowser() && window.innerWidth < 768;

export default isSmallScreen;
