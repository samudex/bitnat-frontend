import { ReactNode } from "react"
import Navbar from "./Navbar"
import { CssBaseline } from "@mui/material"

export interface LayoutProps {
    children: ReactNode
}

const Layout = (props: LayoutProps) => {
    return (
        <div>
            <CssBaseline />
            <Navbar />
            {props.children}
        </div>
    )
}

export default Layout
