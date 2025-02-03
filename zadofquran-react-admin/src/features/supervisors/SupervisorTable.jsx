import React from "react";
import Table from "../../ui/table/Table";
import SupervisorRow from "./SupervisorRow";
import styled from "styled-components";
import { useSupervisor } from "./useSupervisor";
import Spinner from "../../ui/Spinner";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const SupervisorTable = () => {
    const { data, isLoading } = useSupervisor();
    const supervisors = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 1fr 1.2fr 1fr" minWidth="150rem">
                <Table.Header>
                    <div># </div>
                    <div>الاسم</div>
                    <div>البريد الالكتروني</div>
                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={supervisors}
                    render={(supervisor, index) => (
                        <SupervisorRow
                            supervisor={supervisor}
                            key={supervisor.id}
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

export default SupervisorTable;
