export default (state={authenticated: false}, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        authenticated: true,
        user_id: action.user_id
      };

    case 'UNAUTH_USER':
      return {
        authenticated: false,
      };

    default:
      return state;
  }
}
