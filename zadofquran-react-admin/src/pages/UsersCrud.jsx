import React from "react";
import UserTable from "../features/users/UserTable";
import PageLayout from "../ui/PageLayout";
import UsersFilter from "../features/users/UsersFilter";

const UsersCrud = () => {
    return (
        <PageLayout>
            <UsersFilter />
            <UserTable />
        </PageLayout>
    );
};

export default UsersCrud;
