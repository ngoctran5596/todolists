import { useContext, createContext } from 'react';

const Context = createContext(store);
const useStore = () => useContext(Context);



export default {
    useStore
};