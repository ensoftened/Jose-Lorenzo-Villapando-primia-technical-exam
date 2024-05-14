import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import "./style-helpers/css-animations/fade-scale-animation.css";
import "./style-helpers/css-animations/slide-in-animation.css";

import {
  useState,
  useEffect,

  useRef,
  createContext,
  useLayoutEffect,
} from "react";

import { ThemeProvider } from "styled-components";

import { theme } from "@style-helpers/theme";
import Login from "@pages/Login/Login";

import auth from "@services/authService";
import {  Route, Routes, useLocation } from "react-router-dom";
import MainPage from "@pages/MainPage/MainPage";
import { ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { fetchUserInfo } from "@state/user/userSlice";

import { ModalProvider } from "@contexts/ModalProvider";

export const DeviceContext = createContext("");
export const UserContext = createContext({});
export const RootContext = createContext<any>(null);

function App() {
  console.log("APP RENDERED", process.env.NODE_ENV)
  //console.log("APP RENDERED");
  const userInfoFromLS: any = auth.getCurrentUserInfoFromLocalStorage();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const device = windowWidth <= 768 ? "M" : "B";

  const dispatch = useDispatch();

  const Wrapper = ({ children }: any) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const rootRef = useRef<any>();

  return (
    <UserContext.Provider value={userInfoFromLS}>
      <DeviceContext.Provider value={device}>
        <RootContext.Provider value={rootRef}>
          <ThemeProvider theme={theme}>
            <div
              ref={rootRef}
              className="App"
              style={{
                overflow: "hidden",
                backgroundColor: theme.neutral.lightest,
              }}
            >
              <ModalProvider>
                <Wrapper>
                  <Routes>
    
                    <Route path="/*" element={<MainPage />} />
                  </Routes>
                </Wrapper>
              </ModalProvider>
              {/* <FormPage /> */}

              <ToastContainer position="bottom-center"/>
            </div>
          </ThemeProvider>
        </RootContext.Provider>
      </DeviceContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
