import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen overflow-auto bg-gray-50">
      <Outlet />
    </div>
  );
}

export default App;
