import { createFileRoute } from '@tanstack/react-router'

import LeCart from "../components/Cart/_cart"

export const Route = createFileRoute('/cart')({
  component: Cart,
})

function Cart() {
  return (
    <LeCart />
  )
}
