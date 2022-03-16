import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router";

import { AppHeader } from "./cmps/AppHeader.jsx";

import routes from "./routes.js";

export function RootCmp() {
  // const params = useParams();
  return (
    <div className="root-cmp">
      <Router>
        <AppHeader />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              // params={params}
              element={<route.component />}
              path={route.path}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}
