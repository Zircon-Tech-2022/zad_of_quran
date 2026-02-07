import Table from "../../ui/table/Table";
import styled from "styled-components";
import { usePlans } from "./usePlans";
import Spinner from "../../ui/Spinner";
import PlansRow from "./PlansRow";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const PlansTable = () => {
    const { data, isLoading } = usePlans();
    const plans = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table
                columns="0.4fr 1.5fr .8fr 1fr 1fr 1fr 1fr 1fr 1fr .4fr"
                minWidth="150rem"
            >
                <Table.Header>
                    <div># </div>
                    <div>اسم الخطة</div>
                    <div>الحالة</div>
                    <div>السعر</div>
                    <div>الخصم</div>
                    <div>عدد الحصص الشهرية</div>
                    <div>النوع</div>
                    <div>عدد الحصص الاسبوعية</div>
                    <div>مدة الحصة</div>

                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={plans}
                    render={(plan, index) => (
                        <PlansRow plan={plan} key={plan.id} num={index + 1} />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default PlansTable;
