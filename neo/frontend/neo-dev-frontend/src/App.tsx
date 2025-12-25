
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Home from './pages/Home'

function App() {

  const router= createBrowserRouter([
    {
      path:"/",
      Component: Home

    }
  ])

  return (
   <div className="w-full max-w-480 mx-auto   min-h-screen bg-black " >
     <RouterProvider router={router}/>
   </div>

  )
}

export default App
