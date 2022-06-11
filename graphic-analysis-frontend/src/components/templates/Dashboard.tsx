import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const DashboardTemplate: NextPage = ({children}: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const MainWrapper = experimentalStyled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
  }));

  const PageWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",

    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("lg")]: {
      paddingTop: "64px",
    },
    [theme.breakpoints.down("lg")]: {
      paddingTop: "64px",
    },
  }));

  return (
    <MainWrapper>
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#fbfbfb",
        }}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DashboardTemplate;
