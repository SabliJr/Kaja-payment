import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pot')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pot"!</div>
}
