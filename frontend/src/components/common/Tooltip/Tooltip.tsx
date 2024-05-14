import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { TooltipContent, TooltipWrapper } from './tooltip.style';

// Define types for props
interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const handleMouseEnter = () => {
      const tooltip = document.getElementById('tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      }
    };
  
    const handleMouseLeave = () => {
      const tooltip = document.getElementById('tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      }
    };
  
    return (
      <TooltipWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
        <TooltipContent id="tooltip">{text}</TooltipContent>
      </TooltipWrapper>
    );
  };
  
  export default Tooltip;