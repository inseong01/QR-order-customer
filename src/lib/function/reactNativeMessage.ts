export function postRNMessage(data: string) {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(data);
  }
}
