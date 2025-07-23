import UserChat from "./userChat/userChat.jsx"
import SupportChat from "./supportChat/supportChat.jsx"

const Chat = () => {


    const role = localStorage.getItem('urole');

 

        return (
            <div className="chat">
            <div className="chat__wrapper">
                <div className="chat__title">
                    <h1 className="chat__title-text">Служба поддержки</h1>
                </div>

                {/* {role === "buyer" ? ( */}
                    <UserChat/>

             
      
              </div>
            </div>
        )
    }
    
    export default Chat