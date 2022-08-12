import { DependencyList } from "react";

export function areEqual(prevDeps: DependencyList, nextDeps: DependencyList) {
  if (prevDeps.length !== nextDeps.length) {
    throw new Error('Size of deps must not be changed');
  }

  for (let i = 0; i < nextDeps.length; ++i) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false;
    }
  }

  return true;
}
