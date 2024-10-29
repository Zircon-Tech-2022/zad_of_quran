import React from "react";
import Table from "../../ui/table/Table";
import TeacherRow from "./TeacherRow";

const teachers = [
    {
        id: 1,
        name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
        image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
        phone: "01245632589",
        email: "zircon@zircon.comad ",
    },
    {
        id: 2,
        name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
        image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
        phone: "01245632589",
        email: "zircon@zircon.com",
    },
    {
        id: 3,
        name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
        image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
        phone: "01245632589",
        email: "zircon@zircon.com",
    },
    {
        id: 4,
        name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
        image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
        phone: "01245632589",
        email: "zircon@zircon.com",
    },
    {
        id: 5,
        name: "علي علاء الدين الي مخلص كل حاجة واي حاجة ",
        image: "https://images.pexels.com/photos/7869562/pexels-photo-7869562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi unde laudantium doloribus delectus minima sed suscipit incidunt, facere recusandae aperiam soluta vel quos ullam, sint alias exercitationem fuga saepe cumque.",
        phone: "01245632589",
        email: "zircon@zircon.com",
    },
];
const TeacherTable = () => {
    return (
        <Table columns="0.4fr 1.5fr 1fr 1.2fr 1.2fr .5fr" minWidth="150rem">
            <Table.Header>
                <div># </div>
                <div>الاسم</div>
                <div>الصورة</div>
                <div>رقم الهاتف</div>
                <div>الايميل</div>
                {/* <div>الوصف</div> */}
                <div>الاجراءات</div>
            </Table.Header>
            <Table.Body
                data={teachers}
                render={(teacher) => (
                    <TeacherRow teacher={teacher} key={teacher.id} />
                )}
            ></Table.Body>
        </Table>
    );
};

export default TeacherTable;
