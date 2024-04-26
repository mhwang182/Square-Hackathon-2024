'use client'
import { ContextProvider } from "../context/AppContext"
import { AuthProvider } from "../context/AuthContext"

const Layout = ({children}) => {
    return (
        <ContextProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ContextProvider>
    )
}

export default Layout