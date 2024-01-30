import React from "react";

export default function Divider() {
  const dividerStyle = {
    border: "1px solid lightgrey",
    marginTop: "0.5em",
    marginBottom: "0.5em",
    width: "60vw",
  };
  return <hr style={dividerStyle} />;
}
