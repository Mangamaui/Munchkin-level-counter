let localStorage = window.localStorage;

export function loadState() {

    try {
        const serializedState = localStorage.getItem("previousState");

        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export function saveState(state) {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("previousState", serializedState);
    } catch (err) {
        console.error(err);
    }
}

export function checkState() {
    const serializedState = localStorage.getItem("previousState");

    return serializedState !== null;
}

export function clearState() {
    localStorage.clear();
}
