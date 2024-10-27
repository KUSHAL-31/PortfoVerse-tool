import Header from "./components/Header/Header";
import CreateProfile from "./components/pages/CreateProfile";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import Page3 from "./components/pages/Page3";

function App() {
  const { loading, authUser } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  if (loading === undefined || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute authUser={authUser} />}>
          <Route path="/create-profile" element={<CreateProfile />} />
        </Route>
        <Route exact path="/page3" element={<Page3 />} />
      </Routes>
    </>
  );
}

export default App;
