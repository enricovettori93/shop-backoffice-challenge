import {ReactNode} from 'react';
import classNames from "classnames";

interface props {
    children: ReactNode
    className?: string
}

const Pill = ({children, className = ""}: props) => {
    const classes = classNames({
        "bg-gray-100 p-3 rounded-full": true,
        [className]: true
    });

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Pill;
