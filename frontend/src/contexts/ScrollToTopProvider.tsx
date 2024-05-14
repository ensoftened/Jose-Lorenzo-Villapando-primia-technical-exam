import React, { createContext, useContext, useEffect } from 'react';

interface ScrollToTopContextProps {
  scrollToTop: () => void;
}

const ScrollToTopContext = createContext<ScrollToTopContextProps | undefined>(undefined);

export const useScrollToTop = (): ScrollToTopContextProps => {
  const context = useContext(ScrollToTopContext);
  if (!context) {
    throw new Error('useScrollToTop must be used within a ScrollToTopProvider');
  }
  return context;
};

export const ScrollToTopProvider: React.FC = ({ children }: any) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <ScrollToTopContext.Provider value={{ scrollToTop }}>
      {children}
    </ScrollToTopContext.Provider>
  );
};