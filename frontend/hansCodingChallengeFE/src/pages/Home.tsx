import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { List } from "../components/List";
import { Infobox } from "../components/Infobox";

export const Home = () => {
  return (
    <div
      style={{
        height: "1000px",
        color: "blue",
      }}
    >
      <div style={{
        padding: "10px 0px"
      }}>
        <Infobox></Infobox>
      </div>
      <List></List>
    </div>
  );
};
