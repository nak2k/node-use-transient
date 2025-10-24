import { DependencyList, useReducer } from "react";
import { areEqual } from "./areEqual.js";

interface TransientState<T> {
  deps: DependencyList;
  getValue: () => T | undefined;
  transient: T | undefined;
}

/**
 * The hook to get a value for fallback.
 * 
 * @param getValue 
 * @param deps 
 * @returns 
 */
export function useTransient<T>(getValue: () => T | undefined, deps: DependencyList) {
  const [state, dispatch] = useReducer((state: TransientState<T>, deps: DependencyList): TransientState<T> => {
    return {
      deps,
      getValue,
      transient: getValue() ?? state.getValue(),
    };
  }, deps, deps => ({
    deps,
    getValue,
    transient: getValue(),
  }));

  if (!areEqual(state.deps, deps)) {
    dispatch(deps);
  }

  return state.transient;
}
