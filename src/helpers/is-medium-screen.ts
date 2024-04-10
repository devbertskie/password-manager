import isBrowser from './is-browser';

const isMediumScreeen = (): boolean => isBrowser() && window.innerWidth >= 768;

export default isMediumScreeen;
