import { Grid } from "@mui/material";
import { NextPage } from "next";
import ArticlesByLanguage from "../../components/graph/ArticlesByLanguage/ArticlesByLanguage";
import PermanentProfessorsAndCollaborators from "../../components/graph/PermanentProfessorsAndCollaborators/PermanentProfessorsAndCollaborators";
import SalesOverview from "../../components/graph/SalseOverview";
import DashboardTemplate from "../../components/templates/Dashboard";

const Dashboard: NextPage = () => {
  return (
    <DashboardTemplate>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={12}>
          <ArticlesByLanguage />
        </Grid>
        <Grid item xs={12} lg={12}>
          <PermanentProfessorsAndCollaborators />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          {/* <DailyActivity /> */}
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* <ProductPerfomance /> */}
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* <BlogCard /> */}
        </Grid>
      </Grid>
    </DashboardTemplate>
  );
};

export default Dashboard;
