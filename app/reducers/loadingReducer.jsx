var defaultLoadingState = {
  screenIsLoading: false,
  screenLoadingText: ''
}

export default (state = defaultLoadingState, action) => {
  switch (action.type) {

    case 'TOGGLE_LOADING_SCREEN':
      return {
        ...state,
        screenIsLoading: !state.screenIsLoading,
        screenLoadingText: action.screenLoadingText
      };

    default:
      return state;
  }
}
