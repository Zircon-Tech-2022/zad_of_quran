import PageLayout from "../ui/PageLayout";
import TestimoinalsFilter from "../features/testimonials/TestimoinalsFilter";
import TestimoinalTable from "../features/testimonials/TestimoinalTable";

const TestimoinalsCrud = () => {
    return (
        <PageLayout>
            <TestimoinalsFilter />
            <TestimoinalTable />
        </PageLayout>
    );
};

export default TestimoinalsCrud;
