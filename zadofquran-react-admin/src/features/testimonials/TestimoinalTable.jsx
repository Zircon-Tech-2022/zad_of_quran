import Table from "../../ui/table/Table";
import styled from "styled-components";
import { useTestimoinal } from "./useTestimoinal";
import Spinner from "../../ui/Spinner";
import TestimoinalRow from "./TestimoinalRow";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const TestimoinalTable = () => {
    const { data, isLoading } = useTestimoinal();
    const testimoinals = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 1fr .5fr 1.5fr .4fr" minWidth="150rem">
                <Table.Header>
                    <div># </div>
                    <div>الاسم</div>
                    <div>الحالة</div>
                    <div>الرأي</div>

                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={testimoinals}
                    render={(testimoinal, index) => (
                        <TestimoinalRow
                            testimoinal={testimoinal}
                            key={testimoinal.id}
                            num={index + 1}
                        />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default TestimoinalTable;
