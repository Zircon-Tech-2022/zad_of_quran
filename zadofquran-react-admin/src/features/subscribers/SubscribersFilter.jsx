import React from "react";
import SearchFilter from "../../ui/SearchFilter";
import FilterLayout from "../../ui/FilterLayout";
import { Grid } from "@mui/material";

const SubscribersFilter = () => {
    return (
        <FilterLayout title="لائحة المشتركين">
            <Grid container justifyContent={"space-between"} spacing="3rem">
                <Grid item xl={3.5} lg={5} md={6} xs={12}>
                    <SearchFilter />
                </Grid>
            </Grid>
        </FilterLayout>
    );
};

export default SubscribersFilter;
