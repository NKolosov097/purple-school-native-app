import { lazy, Suspense } from "react"

import { Providers } from "@app/providers"

const Login = lazy(() => import("./pages/login/login"))

export default function App() {
  return (
    <Providers>
      <Suspense>
        <Login />
      </Suspense>
    </Providers>
  )
}
