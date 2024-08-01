'use client'
import { useState } from "react";


export default function Home() {
  const [state, setState] = useState<number>(0)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {state > 0
        ? "lorem"
        : "ipsum"
      }
      <button onClick={() => setState(state + 1)}>{state}</button>
    </main>
  );
}
