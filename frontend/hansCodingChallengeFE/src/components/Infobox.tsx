import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../models/root";

export const Infobox = observer(() => {
    const {
        store: {
          information
        },
      } = useRootStore();
  return <div>
    {information.title} 
    {information.message} 
    {information.type} 
  </div>;
});
