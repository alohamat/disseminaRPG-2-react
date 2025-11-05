import { useState } from "react";
import { SixSevenContext } from "./SixSevenContext";

export const SixSevenProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <SixSevenContext.Provider value={{ count, setCount }}>
      {children}
    </SixSevenContext.Provider>
  );
};