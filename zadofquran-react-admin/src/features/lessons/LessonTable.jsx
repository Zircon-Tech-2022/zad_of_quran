import Table from "../../ui/table/Table";
import LessonRow from "./LessonRow";
import styled from "styled-components";
import { useLessons } from "./useLessons";
import Spinner from "../../ui/Spinner";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const LessonTable = () => {
    const { data, isLoading } = useLessons();
    const lessons = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 0.6fr 1.2fr 1.2fr 1.2fr 1.5fr 1fr .5fr" minWidth="150rem">
                <Table.Header>
                    <div>#</div>
                    <div>الرقم</div>
                    <div>المشترك</div>
                    <div>المعلم</div>
                    <div>المشرف</div>
                    <div>الدورة</div>
                    <div>الحالة</div>
                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={lessons}
                    render={(lesson, index) => (
                        <LessonRow lesson={lesson} key={lesson.id} num={index + 1} />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default LessonTable;
