import { Outlet } from "react-router-dom"
import SideBar from "./components/sidebar"
import Header from "./components/header"


function App() {
 

  return (
    <>
      <div className="appContainer">
        <SideBar></SideBar>
        <div className="container">
          <Header></Header>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default App
