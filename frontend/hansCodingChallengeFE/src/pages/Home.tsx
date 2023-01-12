import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { List } from "../components/List";
import { Infobox } from "../components/Infobox";

export const Home = () => {
  return <div style={{
    height: '1000px',
    color: 'blue'
  }}>
    <Infobox></Infobox>
    <List></List>
  </div>;
};
