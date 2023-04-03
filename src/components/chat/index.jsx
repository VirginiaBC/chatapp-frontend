import React from 'react';
import { 
    useMultiChatLogic, 
    MultiChatSocket, 
    MultiChatWindow 
} from 'react-chat-engine-advanced';
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customeMessageForms/StandardMessageForm";
import Ai from '@/components/customeMessageForms/Ai';
import AiCode from '@/components/customeMessageForms/AiCode';
import AiAssist from '@/components/customeMessageForms/AiAssist';
import AiImage from '@/components/customeMessageForms/AiImage';

const Chat = ({user, secret}) => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        secret
    );

  return (
    <div style = {{flexBasis:"100%"}}>
        {/* socket */}
        <MultiChatSocket {...chatProps} /> 
        {/* pass in is to connect
        render component and give us authentification to connect react 
        chat engine website */}
        {/* component */}
        <MultiChatWindow  
            {...chatProps}
            style = {{height : "100vh"}}
            renderChatHeader = {(chat) => <Header chat= {chat} />}
            renderMessageForm = {(props) => {
                if (chatProps.chat?.title.startsWith("AiChat_")){
                    return <Ai props = {props} activeChat = {chatProps.chat} />;
                }
                if (chatProps.chat?.title.startsWith("AiCode_")){
                    return <AiCode props = {props} activeChat = {chatProps.chat} />;
                }
                if (chatProps.chat?.title.startsWith("AiAssist_")){
                    return <AiAssist props = {props} activeChat = {chatProps.chat} />;
                }
                if (chatProps.chat?.title.startsWith("AiImage_")){
                    return <AiImage props = {props} activeChat = {chatProps.chat} />;
                }
                return (
                    <StandardMessageForm props = {props} activeChat = {chatProps.chat} />
                )
            }}
        />
    </div>

  )
}

export default Chat