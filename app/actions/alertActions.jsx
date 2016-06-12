export var addAlert = (text, style) => {
  return {
    type: 'ADD_ALERT',
    text,
    style
  };
};

export var removeAlert = (id) => {
  return {
    type: 'REMOVE_ALERT',
    id
  };
};
