import { createContext, useContext, useReducer } from 'react';
//import reducer from './reducer';


const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return { ...state, currentUser: action.payload };
  
      default:
        throw new Error('No matched action!');
    }
  };


const initialState = {
  currentUser: null,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
