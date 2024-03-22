// this function will recognized browser to help localStorage not defined
const isBrowser = (): boolean => typeof window !== 'undefined';
export default isBrowser;
