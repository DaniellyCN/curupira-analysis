import React from "react";
import FeatherIcon from "feather-icons-react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import SearchDD from "./SearchDD";
import ProfileDD from "./ProfileDD";

interface HeaderProps {
  sx: object;
  customClass?: string;
  position?: string;
  toggleSidebar?: () => void;
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  sx,
  customClass,
  toggleMobileSidebar,
  position,
}) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>
        <SearchDD />
        <Box flexGrow={1} />
        <ProfileDD />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
