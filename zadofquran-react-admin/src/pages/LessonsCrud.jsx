import LessonTable from "../features/lessons/LessonTable";
import PageLayout from "../ui/PageLayout";
import LessonsFilter from "../features/lessons/LessonsFilter";

const LessonsCrud = () => {
    return (
        <PageLayout>
            <LessonsFilter />
            <LessonTable />
        </PageLayout>
    );
};

export default LessonsCrud;
