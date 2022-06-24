import React from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

const DefaultCard = (props: any) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{props.title}</Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default DefaultCard;
