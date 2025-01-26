import React from "react";
import Table from "../../ui/table/Table";
import SubscriberRow from "./SubscriberRow";
import styled from "styled-components";
import { useSubscriber } from "./useSubscriber";
import Spinner from "../../ui/Spinner";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const SubscriberTable = () => {
    const { data, isLoading } = useSubscriber();
    const users = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table columns="0.4fr 1.5fr 1fr  1.2fr .5fr" minWidth="150rem">
                <Table.Header>
                    <div># </div>
                    <div>الاسم</div>
                    <div>رقم الهاتف</div>
                    <div>الايميل</div>
                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={users}
                    render={(user, index) => (
                        <SubscriberRow user={user} key={user.id} num={index + 1} />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default SubscriberTable;
