import { Outlet } from 'react-router-dom';
import LayoutPrincipal from './layouts/LayoutPrincipal';
import { ToastContainer, toast } from 'react-toastify';





function App() {



  


  return (

    <>


      

        <LayoutPrincipal>
          <Outlet  />
          <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </LayoutPrincipal>



    </>




  )
}

export default App
