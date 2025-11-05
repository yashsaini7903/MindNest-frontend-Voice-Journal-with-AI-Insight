import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Signup from "./components/Signup";

const Auth=()=>{
    return <>
    <Header></Header>
    <Outlet></Outlet>
    
    </>
}
export default Auth;