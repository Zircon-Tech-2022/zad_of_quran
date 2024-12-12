import React from "react";
import Filters from "../../ui/Filters";
import SearchFilter from "../../ui/SearchFilter";
import FilterLayout from "../../ui/FilterLayout";
import { Grid } from "@mui/material";

import AddPlansModal from "./AddPlansModal";

const PlansFilter = () => {
    return (
        <FilterLayout title="خطط الأسعار">
            {/* <Filters
                filterField="courses"
                label="الجزئية الدراسية"
                options={[
                    { value: "all", title: "All" },
                    { value: "no-discount", title: "No discount" },
                    { value: "with-discount", title: "With discount" },
                ]}
            /> */}
            <Grid container justifyContent={"space-between"} spacing="3rem">
                <Grid item xl={3.5} lg={5} md={6} xs={12}>
                    <SearchFilter />
                </Grid>
                <Grid item>
                    <AddPlansModal />
                </Grid>
            </Grid>
        </FilterLayout>
    );
};

export default PlansFilter;
