import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from ".";
import DefaultLayout from "../layouts/DefaultLayout";
import { RouteType } from "../types";
import NotFound from "../components/Util/NotFound";

const RouteConfig: React.FC = () => {
  return (
    <Routes>
      {publicRoute.map((route: RouteType, index: number) => {
        const Layout = route.layout || DefaultLayout;
        const Component = route.component;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          />
        );
      })}
      <Route
        path="*"
        element={
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default RouteConfig;
