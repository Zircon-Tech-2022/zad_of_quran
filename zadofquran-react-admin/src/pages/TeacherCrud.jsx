import TeacherTable from "../features/teachers/TeacherTable";
import PageLayout from "../ui/PageLayout";
import TeachersFilter from "../features/teachers/TeachersFilter";

const TeacherCrud = () => {
    return (
        <PageLayout>
            <TeachersFilter />
            <TeacherTable />
        </PageLayout>
    );
};

export default TeacherCrud;
