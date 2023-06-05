import React, { useContext } from 'react';

const createContext = <A>(name: string, defaultValue?: A) => {
  const ctx = React.createContext<A | undefined>(defaultValue);

  const useCtx = () => {
    const c = useContext(ctx);
    if (!c) throw new Error(`${name} must be inside a provider with a value`);
    return c;
  };

  return [useCtx, ctx.Provider] as const;
};

export default createContext;
