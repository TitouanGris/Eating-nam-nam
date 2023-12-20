import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Filters, { loadFiltersData } from "./pages/Filters";
import RecipeBrowse from "./pages/RecipeBrowse";
import RecipePost, {
  loadIngredientsData,
  loadUnitsData,
} from "./pages/RecipePost";
import "./styles/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/browse",
        element: <RecipeBrowse />,
      },
      {
        path: "/publish",
        element: <RecipePost />,
        async loader() {
          const filtersData = await loadFiltersData();
          const ingredientsData = await loadIngredientsData();
          const unitsData = await loadUnitsData();
          return {
            filters: filtersData,
            ingredients: ingredientsData,
            units: unitsData,
          };
        },
      },
      {
        path: "/filters",
        element: <Filters />,
        loader: loadFiltersData,
      },
    ],
  },
]);
//       // {
//       //   path:"/bouh",
//       //   element: <>Composant </>
//       //   children: [
//       //     //avec barre
//       //   ]
//       // }
//     ],
//   },
//   // {
//   //   path: "/recipe-create",
//   //   element: <RecipeCreate />,
//   // },
//   // {
//   //   path: "/user-profile",
//   //   element: <UserProfile />,
//   // },
//   // {
//   //   path: "/filters",
//   //   element: <Filters />,
//   // },
//   // {
//   //   path: "/favorite-recipes",
//   //   element: <FavoriteRecipes />,
//   // },
// ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
