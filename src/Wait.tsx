import React, { ReactNode, Suspense, SuspenseProps } from 'react';
import { use } from "react-use-polyfill";

interface RenderProps<T> {
  /**
   * The promise to get the value for rendering.
   * 
   * If use(promise) throws an exception, the fallback is rendered.
   */
  promise: Promise<T>;

  /**
   * The render prop to render resolved value or transient value.
   * 
   * This function is also called during fallback.
   */
  render: (value: T, pending?: boolean) => ReactNode;
}

/**
 * 
 */
export interface WaitProps<T> extends RenderProps<T> {
  /**
   * The value that is rendered during fallback.
   * 
   * If omitted, the fallback prop is rendered instead of.
   */
  transient?: T;

  /**
   * The fallback that is rendered if the transient prop is undefined.
   */
  fallback: SuspenseProps['fallback'];

  /**
   * Whether the render prop is always called during fallback.
   */
  always?: boolean;
}

/**
 * Wait the promise, and render the resolved value.
 * 
 * @param props 
 * @returns 
 */
export function Wait<T>(props: WaitProps<T>) {
  const { promise, transient, render, fallback, always } = props;

  return <Suspense
    fallback={transient !== undefined || always ? <>{render(transient!, true)}</> : fallback}
    children={<Render promise={promise} render={render} />}
  />;
}

function Render<T>(props: RenderProps<T>) {
  const value = use(props.promise);

  return <>{props.render(value, false)}</>;
}
