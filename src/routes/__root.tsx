import { createRootRoute} from '@tanstack/react-router'
import { Header } from "../components/Header"
//STYLES
import "../global.css"

export const Route = createRootRoute({
  component: Header
})