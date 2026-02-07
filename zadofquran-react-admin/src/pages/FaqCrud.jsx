import PageLayout from "../ui/PageLayout";
import FaqsFilter from "../features/faqs/FaqsFilter";
import FaqTable from "../features/faqs/FaqTable";

const TeacherCrud = () => {
    return (
        <PageLayout>
            <FaqsFilter />
            <FaqTable />
        </PageLayout>
    );
};

export default TeacherCrud;
