import React, {Fragment} from "react";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
  Skeleton,
} from "@mui/material";

import { SideBlock } from "./SideBlock";

export const CommentsBlock = ({
  items,
  children,
  isLoading = true,
  }) => {
  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => {
          return (
            <Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40}/>
                  ) : (
                    <Avatar
                      alt={obj.author.fullName}
                      src={obj.author.avatarUrl}
                    />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{display:"flex",flexDirectionL:"column"}}>
                    <Skeleton variant="text" height={25} width={120}/>
                    <Skeleton variant="text" height={18} width={230}/>
                  </div>
                ) : (
                  <ListItemText primary={obj.author.fullName} secondary={obj.text}/>
                )}
              </ListItem>
              <Divider variant="inset" component="li"/>
            </Fragment>
          )
        })}
      </List>
      {children}
    </SideBlock>
  )
}