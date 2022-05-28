import { Grid } from "@mui/material";
import BlogCard from "../templates/dashboard/BlogCard";
import SalesOverview from "../templates/dashboard/graph/SalseOverview";
import ArticlesByLanguage from "../templates/dashboard/graph/ArticlesByLanguage";
import DailyActivity from "../templates/dashboard/DailyActivity";
import ProductPerfomance from "../templates/dashboard/ProductPerfomance";

export default function Index() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ArticlesByLanguage />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerfomance />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
  );
}
