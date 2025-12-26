
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Home from './pages/Home'
import Builder from './pages/Builder'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {

  const router= createBrowserRouter([
    {
      path:"/",
      Component: Home
    },
    {
      path:"/builder",
      Component: Builder
    }
  ])

  return (
    <Provider store={store}>
      <div className="w-full max-w-480 mx-auto   min-h-screen bg-black ">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App
