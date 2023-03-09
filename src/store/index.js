import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: {},
});
