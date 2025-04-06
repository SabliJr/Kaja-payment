import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

import Home from "../components/Home/home";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className='text-center'>
      <Home />
    </div>
  );
}
