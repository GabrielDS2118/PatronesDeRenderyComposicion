import React, { useReducer } from 'react';

function useLocalStorage(itemName, initialValue) {

  
  //ACTION TYPES
  const actionTypes = {
    'success': 'SUCCESS',
    'error': 'ERROR',
    'save': 'SAVE',
    'sicronize': 'SICRONIZE',
  };
  
  //ACTION CREATORS
  const onSuccess = (item) => dispatch({type: actionTypes.success, payload: item})
  const onError = (error) => dispatch({type: actionTypes.error, payload: error})
  const onSave = (item) => dispatch({type: actionTypes.save, payload: item})
  const onSincronize = () => dispatch({type: actionTypes.sicronize})

  const initialState = ({initialValue}) => ({
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initialValue
  })

  const reducerObject = (state,payload) => ({
    [actionTypes.success]: {
      ...state,
      item: payload,
      loading: false,
      sincronizedItem: true
    },

    [actionTypes.error] : {
      ...state,
      loading: false,
      error: payload
    },

    [actionTypes.save] : {
      ...state,
      item: payload
    },

    [actionTypes.sicronize] : {
      ...state,
      loading: true,
      sincronizedItem: false
    }
  });

  const reducer = (state,action) => {
    return reducerObject(state,action.payload)[action.type] || state
  }

  const [state, dispatch] = useReducer(reducer, initialState({initialValue})) 

  const {sincronizedItem,error,loading,item} = state;

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 3000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

export { useLocalStorage };
