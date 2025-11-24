import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-grey-50">
      <Header />
      <main className="flex-1 container mx-auto p-4 pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
