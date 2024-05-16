import { useState } from "react";
import { GptMessage,MyMessage,TextMessageBox, TypingLoader } from "../../components";


interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async( text: string) => {

    setIsLoading(true);
    setMessages ((prev) => [...prev, {text: text, isGpt: false}] );
    //TODO: UseCase

    setIsLoading(false);

    //Todo Añadir el mensaje de isgppt en true

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}

          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correciones" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="Esto es de OpenIA " />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}


          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas"
        disableCorrections
      />


    </div>
  );
};
