import React from "react";
import BlogTable from "../features/blogs/BlogTable";
import PageLayout from "../ui/PageLayout";
import BlogsFilter from "../features/blogs/BlogsFilter";

const BlogCrud = () => {
    return (
        <PageLayout>
            <BlogsFilter />
            <BlogTable />
        </PageLayout>
    );
};

export default BlogCrud;
