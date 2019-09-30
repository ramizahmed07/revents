export const imageUpload = (state = [], action) => {
  switch (action.type) {
    case 'IMAGE_UPLOAD_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
