import {configureStore,createSlice,combineReducers} from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const notificationSlice=createSlice({
    name:'notification',
    initialState:{
        count:0,
    },
    reducers:{
        increase:(state)=>{
            state.count+=1
        },
        reset:(state)=>{
            state.count=0
        },
        decrease:(state)=>{
            if(state.count>0){
                state.count-=1
                console.log("decrease",state.count)
            }
        }
    },
})

export const {increase,reset,decrease}=notificationSlice.actions


const persistConfig={
    key:'root',
    storage,
}

const rootReducer=combineReducers({
    notification:notificationSlice.reducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
    
})

const persistor=persistStore(store)

export { persistor,store}