"use client";

import { Button } from "@repo/ui/components/button";
import { ModeToggle } from "@repo/ui/components/theme/mode-toggle";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="fixed right-2 top-2">
        <ModeToggle />
      </div>
      <h1>Web Home {count}</h1>
      <Button
        variant="default"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </Button>
    </div>
  );
}
