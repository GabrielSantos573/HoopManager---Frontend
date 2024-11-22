import { ReactNode } from "react";
import { Header } from "../Header";
import { Navbar } from "../Navbar";
import { Footer } from "../Foooter";

interface LayoutProps {
  children: ReactNode;
  pag: string;
  onClick?: () => void;
}

const Layout = ({ children, pag }: LayoutProps) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header pag={pag} />
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
