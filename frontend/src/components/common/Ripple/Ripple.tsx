import React, { useLayoutEffect, useState } from 'react'

import PropTypes from 'prop-types';
import { RippleContainer } from './ripple.style';

interface RippleProps {
    duration?: number;
    backgroundColor?: string;
  }
  
  interface RippleState {
    x: number;
    y: number;
    size: number;
  }
  
  const useDebouncedRippleCleanUp = (
    rippleCount: number,
    duration: number,
    cleanUpFunction: () => void
  ) => {
    useLayoutEffect(() => {
      let bounce: NodeJS.Timeout | null = null;
      if (rippleCount > 0) {
        clearTimeout(bounce!);
  
        bounce = setTimeout(() => {
          cleanUpFunction();
          clearTimeout(bounce!);
        }, duration * 4);
      }
  
      return () => clearTimeout(bounce!);
    }, [rippleCount, duration, cleanUpFunction]);
  };
  
  const Ripple: React.FC<RippleProps> = ({ duration = 600, backgroundColor = "#fff" }) => {
    const [rippleArray, setRippleArray] = useState<RippleState[]>([]);
  
    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
      setRippleArray([]);
    });
  
    const addRipple = (event: any) => {
      const rippleContainer = event.currentTarget.getBoundingClientRect();
      const size =
        rippleContainer.width > rippleContainer.height
          ? rippleContainer.width
          : rippleContainer.height;
      const x = event.pageX - rippleContainer.x - size / 2;
      const y = event.pageY - rippleContainer.y - size / 2;
      const newRipple = {
        x,
        y,
        size,
      };
  
      setRippleArray([...rippleArray, newRipple]);
    };
  
    return (
      <RippleContainer $duration={duration} $backgroundColor={backgroundColor} onMouseDown={addRipple}>
        {rippleArray.length > 0 &&
          rippleArray.map((ripple, index) => {
            return (
              <span
                key={"span" + index}
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            );
          })}
      </RippleContainer>
    );
  };
  
  Ripple.propTypes = {
    duration: PropTypes.number,
    backgroundColor: PropTypes.string,
  };
  
  Ripple.defaultProps = {
    duration: 600,
    backgroundColor: "#fff",
  };


  export default Ripple