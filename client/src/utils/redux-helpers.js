export const getLoadingReducer = () => {
  return state => {
    state.isLoading = true;
  };
}

export const getErrorReducer = err => {
  return state => {
    state.error = err;
    state.isLoading = false;
  }
};

export const createAsyncEventHandlers = (asyncThunk,  onFulfilled) => {
  return {
    [asyncThunk.rejected]: ( state, { error } ) => getErrorReducer(error),
    [asyncThunk.pending]: getLoadingReducer(),
    [asyncThunk.fulfilled]: onFulfilled
  }
};