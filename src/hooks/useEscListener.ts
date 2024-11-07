import {useEffect} from "react";

const useEscListener = (cb: Function) => {
    useEffect(() => {
        const handleEsc = (e: any) => {
            const {code} = e;
            code === "Escape" && cb();
        }

        document.addEventListener("keydown", handleEsc);

        return (() => {
            document.removeEventListener("keydown", handleEsc);
        });
    }, [cb]);
}

export default useEscListener;
