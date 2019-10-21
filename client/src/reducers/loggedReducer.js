// Redux reducer that changes state from false to true
const loggedReducer = (state = false, action) => {
  // Switch case that will change state based on action passed in
  switch (action.type) {
    case 'SIGN_IN':
      return (!state);
    default:
      return (state);
  }
};

export { loggedReducer as default };
