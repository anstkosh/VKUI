import React, { useContext } from 'react';
import { AdaptivityContext, SizeType, ViewMode } from '../components/AdaptivityProvider/AdaptivityContext';

interface Config {
  sizeX?: boolean;
  sizeY?: boolean;
  viewMode?: boolean;
}

export { SizeType, ViewMode };

export default function withAdaptivity<T>(TargetComponent: T, config: Config): T {
  function AdaptivityConsumer(props: AdaptivityProps) {
    const context = useContext(AdaptivityContext);
    let update = false;

    if (props.sizeX || props.sizeY) {
      update = true;
    }

    const sizeX = props.sizeX || context.sizeX;
    const sizeY = props.sizeY || context.sizeY;
    const viewMode = context.viewMode;

    // @ts-ignore
    const target = <TargetComponent {...props}
      sizeX={config.sizeX ? sizeX : undefined}
      sizeY={config.sizeY ? sizeY : undefined}
      viewMode={config.viewMode ? viewMode : undefined}
    />;

    if (update) {
      return <AdaptivityContext.Provider value={{ sizeX, sizeY, viewMode }}>
        {target}
      </AdaptivityContext.Provider>;
    }

    return target;
  }

  return AdaptivityConsumer as unknown as T;
}

export interface AdaptivityProps {
  sizeX?: SizeType;
  sizeY?: SizeType;
  viewMode?: ViewMode;
}