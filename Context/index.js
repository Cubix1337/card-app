import {createContext} from 'react'
export const CardsContext = createContext({set:()=>{},remove:()=>{}}) 
export const UserContext = createContext({name:'',company:'',jobTitle:''}) 
export const SnackbarContext = createContext()