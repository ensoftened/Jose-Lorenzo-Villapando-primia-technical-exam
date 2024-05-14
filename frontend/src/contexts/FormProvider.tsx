import { createContext, useContext } from 'react';



interface FormContextProps {
  myFunction: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined)

export const useFormContext = () : FormContextProps => {

const context = useContext(FormContext);
if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context
};

export const FormProvider = ({ children } : any) => {
    
  const myFunction = () => {
    // Your function logic here
    console.log('Function executed!');
  };

  return (
    <FormContext.Provider value={{ myFunction }}>
      {children}
    </FormContext.Provider>
  );
};