import React from "react";
import {FC, useEffect} from "react";

import ThreeEngine from "./ThreeEngine";

const App: FC = () => {

    useEffect(() => {
        setTimeout(() => {
            window.postMessage({
                type: "CloseAppLoadingUI",
            });
        }, 1000);

    }, []);

    return (<div className={"app"}>
        <ThreeEngine/>
        <div className={"app-ui"}>App</div>
    </div>);
};

export default App;