import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import { loadFiltersData } from "./components/Filters";
import RecipePost, {
  loadIngredientsData,
  loadUnitsData,
} from "./pages/RecipePost";
import RecipeBrowse from "./pages/RecipeBrowse";
import RecipeDetails, { loadRecipeDetails } from "./pages/RecipeDetails";
import Regime from "./pages/Regime";

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
        path: "/regime",
        element: <Regime />,
      },
      {
        path: "/browse",
        element: <RecipeBrowse />,
        loader: loadFiltersData,
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
        path: "/recipe/:id",
        element: <RecipeDetails />,
        loader: loadRecipeDetails,
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
