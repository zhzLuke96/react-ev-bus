import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const uniqid = () => Math.random()
    .toString(36)
    .substr(2);

const ctxRootName = "__root__";
const ctx = createContext(ctxRootName);

export const BusProvider = ({ name = uniqid() }) =>
    React.createElement(ctx.Provider, { value: name });
export const BusRootProvider = () =>
    React.createElement(ctx.Provider, { value: ctxRootName });

const useEventName = (typeArg: string) => {
    const namePrefix = useContext(ctx);
    const name = useMemo(() => {
        return `@${namePrefix}/${typeArg}`;
    }, [namePrefix, typeArg]);
    return name;
};

export const useBusEffect = (
    type: string,
    lisenter: EventListenerOrEventListenerObject,
    deps = [] as any[],
) => {
    const evName = useEventName(type);
    useEffect(() => {
        window.addEventListener(evName, lisenter);
        return window.removeEventListener(evName, lisenter);
    }, [evName, lisenter, ...deps]);
};

export const useBusState = <T>(type: string) => {
    type StateType = T | null;
    const [state, updateState] = useState(null as StateType);
    const evName = useEventName(type) as "click";

    useEffect(() => {
        const handler = ({ detail }) => {
            updateState(detail);
        };
        window.addEventListener(evName, handler);
        return () => window.removeEventListener(evName, handler);
    }, [updateState, evName]);

    return [
        state,
        (detail: StateType = null) => {
            window.dispatchEvent(
                new CustomEvent(evName, {
                    detail,
                }),
            );
        },
    ];
};

export const useDispatch = (type: string) => {
    const evName = useEventName(type);
    const dispatch = useCallback(
        (detail: any = null) => {
            window.dispatchEvent(new CustomEvent(evName, { detail }));
        },
        [evName],
    );
    return dispatch;
};
