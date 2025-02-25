import { Outlet } from 'react-router-dom';
import LayoutPrincipal from './layouts/LayoutPrincipal';





function App() {


  return (

    <>

      

        <LayoutPrincipal>
          <Outlet  />
        </LayoutPrincipal>



    </>




  )
}

export default App
