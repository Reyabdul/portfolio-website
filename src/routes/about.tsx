import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {

  return (
    <section id="about">
      <h1>This is the about page</h1>
    </section>
  )
}