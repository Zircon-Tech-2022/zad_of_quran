import React from "react";
import SearchFilter from "../../ui/SearchFilter";
import FilterLayout from "../../ui/FilterLayout";
import { Grid } from "@mui/material";
import AddSupervisorModal from "./AddSupervisorModal";

const SupervisorsFilter = () => {
    return (
        <FilterLayout title="لائحة المدرسين">
            <Grid container justifyContent={"space-between"} spacing="3rem">
                <Grid item xl={3.5} lg={5} md={6} xs={12}>
                    <SearchFilter />
                </Grid>
                <Grid item>
                    <AddSupervisorModal />
                </Grid>
            </Grid>
        </FilterLayout>
    );
};

export default SupervisorsFilter;
