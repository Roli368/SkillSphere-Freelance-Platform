import AppRoutes from "./routes/AppRoutes";
import useProfile from "./hooks/useProfile";

function App() {
  useProfile();

  return <AppRoutes />;
}

export default App;