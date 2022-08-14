import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="space-y-8 bg-gray-200 h-full">
      <Header />

      {children}
    </div>
  );
};

export default Layout;
