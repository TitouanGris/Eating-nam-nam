import React from "react";
import { NavLink } from "react-router-dom";

function PostModal() {
  return (
    <div className="post">
      <div className="post-modal">
        <p>Recette postée avec succès !</p>
        <NavLink to="/browse">Retourner à la page d'accueil</NavLink>
      </div>
    </div>
  );
}

export default PostModal;
