import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import notificationreducer from './reducers/notificationreducer'
import blogsreducers from './reducers/blogsreducers'
import userreducer from './reducers/userreducer'
import usersreducers from './reducers/usersreducers'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    notification: notificationreducer,
    blogs: blogsreducers,
    users: userreducer,
    blogusers: usersreducers,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
