import React from "react";
import Table from "../../ui/table/Table";
import CourseRow from "./CourseRow";
import styled from "styled-components";
import { useCourse } from "./useCourse";
import Spinner from "../../ui/Spinner";
import MyPagination from "../../ui/MyPagination";

// const Courses = [
//     {
//         id: 1,
//         name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
//         image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description:
//             "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
//         phone: "01245632589",
//         email: "zircon@zircon.comad ",
//     },
//     {
//         id: 2,
//         name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
//         image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description:
//             "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
//         phone: "01245632589",
//         email: "zircon@zircon.com",
//     },
//     {
//         id: 3,
//         name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
//         image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description:
//             "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
//         phone: "01245632589",
//         email: "zircon@zircon.com",
//     },
//     {
//         id: 4,
//         name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
//         image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description:
//             "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
//         phone: "01245632589",
//         email: "zircon@zircon.com",
//     },
//     {
//         id: 5,
//         name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
//         image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description:
//             "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
//         phone: "01245632589",
//         email: "zircon@zircon.com",
//     },
// ];
const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const CourseTable = () => {
    const { data, isLoading } = useCourse();
    const courses = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 1.2fr .6fr 1fr 1.5fr 1fr .5fr" minWidth="150rem">
                <Table.Header>
                    <div># </div>
                    <div>الاسم</div>
                    <div>الحالة</div>
                    <div>الصورة</div>
                    <div>الوصف</div>
                    <div>الظهور في الموقع</div>
                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={courses}
                    render={(course, index) => (
                        <CourseRow
                            course={course}
                            key={course.id}
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

export default CourseTable;
