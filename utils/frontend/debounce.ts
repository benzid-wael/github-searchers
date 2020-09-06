import debounce from 'lodash/debounce';
import { useCallback, useRef } from 'react';

/*
 * Custom React hook to debounce call inside react component
 * See: https://stackoverflow.com/questions/59183495/cant-get-lodash-debounce-to-work-properly-executed-multiple-times-reac
 */
export const UseDebouncedCallback = (callback, delay, opts?: { leading?: boolean; trailing?: boolean }) => {
    const callbackRef = useRef();
    callbackRef.current = callback;
    return useCallback(
        debounce(
            (...args) => {
                if (callbackRef.current) {
                    // @ts-ignore
                    callbackRef.current(...args);
                }
            },
            delay,
            opts,
        ),
        [],
    );
};

export default UseDebouncedCallback;
