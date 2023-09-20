import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { RootLayout, Error } from "./components"
import { Homepage, CrushPage, AddCrushPage } from "./pages"



export default function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'crush/:id',
        element: <CrushPage />
      },
      {
        path: 'add-crush',
        element: <AddCrushPage />
      }
    ]
  }])
  return <RouterProvider router={router} />
}
