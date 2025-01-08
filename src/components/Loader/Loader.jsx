import { FallingLines } from "react-loader-spinner";
import s from "./Loader.module.css";

function Loader() {
    return (
        <div className={s.spinner}>
            <FallingLines
                color="#3f50b5"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    );
}

export default Loader;
