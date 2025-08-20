import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterreducer'
import notificationReducer from './reducers/notificationreducer'


const store = configureStore({  
  reducer: {    
    anecdotes: anecdoteReducer,    
    filter: filterReducer,
    notification: notificationReducer 
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)