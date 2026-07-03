'use client';

import React, { createContext, useState, useContext } from 'react';

const IntroContext = createContext({
  isIntroComplete: false,
  setIntroComplete: () => {}
});

export const IntroProvider = ({ children }) => {
  const [isIntroComplete, setIntroComplete] = useState(false);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);
