import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Cadastro from './routes/Cadastro.jsx'
import Intranet from './routes/Intranet.jsx'
import Historico from './routes/Historico.jsx'
import Login from './routes/Login.jsx'
import HomeAdm from './routes/HomeADM.jsx'
import CadastroOs from './routes/CadastroOs.jsx'
// import Agendamento from './routes/historico.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { path: "/", element: <Home /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/intranet", element: <Intranet/> },
      { path: "/historico", element: <Historico/> },
      { path: "/login", element: <Login/> },
      {path: "/homeAdm", element: <HomeAdm/>},
      {path: "/cadastroOs", element: <CadastroOs/>},
      // { path: "/agendamento", element: <Agendamentos/> }


    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)