
const win:any = (window as any); 
const {ReactNativeWebView} = win;

export const isMobileApp = !!ReactNativeWebView || (new URL(window.location.href).searchParams.get('app') );