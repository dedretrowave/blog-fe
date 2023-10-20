import React from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";

import TagIcon from "@mui/icons-material/Tag";
// import ListItemIcon from "@mui/icons-material/List";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => {
          return (
            <a href={`/tags/${name}`}
               key={i}
               style={{textDecoration: "none", color: "black"}}>
              <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemButton>
                    <TagIcon/>
                  </ListItemButton>
                  {isLoading? (
                    <Skeleton width={100}/>
                  ) : (
                    <ListItemText primary={name}/>
                  )}
                </ListItemButton>
              </ListItem>
            </a>
          );
        })}
      </List>
    </SideBlock>
  );
}