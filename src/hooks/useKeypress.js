import { useEffect } from "react";

const useKeypress = (handler) => {
    useEffect(() => {
        const eventListener = (event) => {
            handler(event.key);
        };
        window.addEventListener("keydown", eventListener);
        return () => {
            window.removeEventListener("keydown", eventListener);
        };
    }, [handler]);
};

export default useKeypress;
