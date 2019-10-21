// Redux reducer that changes state from false to true
const formReducer = (state = false, action) => {
  // Switch case that will change state based on action passed in
  switch (action.type) {
    case 'HIDE':
      return (!state);
    default:
      return (state);
  }
};

export { formReducer as default };
