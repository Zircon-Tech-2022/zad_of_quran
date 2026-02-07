import SearchFilter from "../../ui/SearchFilter";
import FilterLayout from "../../ui/FilterLayout";
import { Grid } from "@mui/material";
import AddLessonModal from "./AddLessonModal";

const LessonsFilter = () => {
    return (
        <FilterLayout title="الحلقات">
            <Grid container justifyContent={"space-between"} spacing="3rem">
                <Grid item xl={3.5} lg={5} md={6} xs={12}>
                    <SearchFilter />
                </Grid>
                <Grid item>
                    <AddLessonModal />
                </Grid>
            </Grid>
        </FilterLayout>
    );
};

export default LessonsFilter;
