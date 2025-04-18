import { createFileRoute } from '@tanstack/react-router'
import StudioRoute from "../components/admin/StudioRoute"

export const Route = createFileRoute('/admin')({
  component: Admin,
})

function Admin() {
  return (
    <div>
      <StudioRoute />
    </div>
  )
}