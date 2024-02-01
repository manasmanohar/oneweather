import React, { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { WeatherProvider } from "./context/weatherContext";
import { ThemeProvider } from "./context/themeContext";
interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="bg-black text-white">
          <Navbar />
          {children}
          <Footer />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
