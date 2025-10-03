import { useState, useEffect } from "react";

// Hook que retorna true se a tela for maior ou igual a 768px (md)
export function useIsScreenMdUp() {
    const [isMdUp, setIsMdUp] = useState(false); // inicia como false

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR-safe

        const handleResize = () => setIsMdUp(window.innerWidth >= 768);
        handleResize(); // define valor inicial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMdUp;
}