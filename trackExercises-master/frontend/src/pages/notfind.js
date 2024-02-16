import { useEffect } from "react";
import Swal from "sweetalert2";

const NotFind=(param)=>{
    let Token = param.Token
    useEffect(()=>{
        
        if(Token==null){
             window.location.replace("/")
        }
        else{
            window.location.replace("/dashboard") 
        }

    },[Token])
 
    return (<>
   {
   
   
   Swal.fire({
    icon: 'error',
  title: '404',
  text: 'There\'s Nothing here...',

})}
    </>)
}
export default NotFind;