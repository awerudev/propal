import React, {useEffect, useState} from "react";

const useTimer = (delay) => {
    const [state, setState] = useState(60)
    const [stop, isSetStop] = useState(true)

    useEffect(() => {
        console.log("?")
        if (!stop && state > 0) {
            console.log("TIMER RUNNING=>>>>>>>>>>>");
            setTimeout(() => {
                setState((prev => prev - 1))
            }, delay)
        }
    }, [state])

    return [state, (e) => {setState(e)},
       () => {
        isSetStop(true);
        console.log(stop);
    }, () => {
        isSetStop(false);
        setState(state => state-1)
    }]
}

export default useTimer