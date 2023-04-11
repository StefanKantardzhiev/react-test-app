import { useState } from "react"

export const useLocalStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {
        const localStorageData = localStorage.getItem(key);

        if (localStorageData) {
            const newData = JSON.parse(localStorageData);
            return newData;
        }
        return initialValue;
    });

    const setLocalStorageState = (value) => {

        // set values simultaneously in state and local storage
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }

    return [
        state,
        setLocalStorageState
    ]
};

