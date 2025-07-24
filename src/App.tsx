import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
// import { Header } from '@/components/layout/Header'

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
    <Header />
    <Outlet />
  </div>
);
export default App;
