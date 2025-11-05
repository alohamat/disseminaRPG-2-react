import { createContext, type Dispatch, type SetStateAction } from "react";

interface SixSevenContextProps {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
}

export const SixSevenContext = createContext<SixSevenContextProps>({
    count: 1,
    setCount: () => {}
})