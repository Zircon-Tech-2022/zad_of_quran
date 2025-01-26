import React from "react";
import SubscriberTable from "../features/subscribers/SubscriberTable";
import PageLayout from "../ui/PageLayout";
import SubscribersFilter from "../features/subscribers/SubscribersFilter";

const SubscribersCrud = () => {
    return (
        <PageLayout>
            <SubscribersFilter />
            <SubscriberTable />
        </PageLayout>
    );
};

export default SubscribersCrud;
