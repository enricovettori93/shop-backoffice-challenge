import {RefObject, useEffect} from "react";

const useClickOutside = (ref: RefObject<any>, cb: Function) => {
    useEffect(() => {
        const handleEsc = (e: any) => {
            const {target} = e;
            if (!target || !target.isConnected) return;
            if (ref.current && !ref.current.contains(target)) {
                cb();
            }
        }

        typeof document.addEventListener("click", handleEsc);

        return (() => {
            typeof document.removeEventListener("click", handleEsc);
        });
    }, [cb, ref]);
}

export default useClickOutside;
