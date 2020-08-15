import React, {useState} from 'react'

export const TicketContext = React.createContext()

export const TicketProvider = ({children}) => {
  const [ticket, setTicket] = useState(null)

  return (
    <TicketContext.Provider 
      value={{ticket, setTicket}}
    >
      {children}
    </TicketContext.Provider>
  );
};