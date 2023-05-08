import {FC, useEffect} from "react";

const App: FC = () => {

    useEffect(() => {
        setTimeout(() => {
            window.postMessage({
                type: "CloseAppLoadingUI",
            });
        }, 1000);

    }, []);

    return (<div>
        App
    </div>);
};

export default App;