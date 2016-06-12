export var toggleLoadingScreen = (screenLoadingText) => {
  return {
    type: 'TOGGLE_LOADING_SCREEN',
    screenLoadingText
  };
};
