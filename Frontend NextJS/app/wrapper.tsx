import React from "react"
import { ToastContainer } from 'react-toastify';

interface WrapperProps {
    children: React.ReactNode
}
const Wrapper:React.FC<WrapperProps> = ({children}) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  )
}

export default Wrapper