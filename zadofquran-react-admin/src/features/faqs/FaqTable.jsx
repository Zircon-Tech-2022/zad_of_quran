import Table from "../../ui/table/Table";
import styled from "styled-components";
import { useFaq } from "./useFaq";
import Spinner from "../../ui/Spinner";
import FaqRow from "./FaqRow";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const FaqTable = () => {
    const { data, isLoading } = useFaq();
    const faqs = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 1fr .5fr 1.5fr .4fr" minWidth="150rem">
                <Table.Header>
                    <div># </div>
                    <div>السؤال</div>
                    <div>الحالة</div>
                    <div>الاجابة</div>

                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={faqs}
                    render={(faq, index) => (
                        <FaqRow faq={faq} key={faq.id} num={index + 1} />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default FaqTable;
