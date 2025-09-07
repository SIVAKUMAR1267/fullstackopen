import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import notificationreducer from './reducers/notificationreducer'
import blogsreducers from './reducers/blogsreducers'
import userreducer from './reducers/userreducer'

const store = configureStore({
  reducer: {
    notification: notificationreducer,
    blogs: blogsreducers,
    users: userreducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
