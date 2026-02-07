import Table from "../../ui/table/Table";
import BlogRow from "./BlogRow";
import styled from "styled-components";
import { useBlog } from "./useBlog";
import Spinner from "../../ui/Spinner";
import MyPagination from "../../ui/MyPagination";

const PagParent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    direction: ltr;
`;
const BlogTable = () => {
    const { data, isLoading } = useBlog();
    const blogs = data?.data?.data;

    if (isLoading) return <Spinner />;

    return (
        <div>
            <Table
                columns="0.4fr 1.5fr .8fr 1fr 1.2fr 1.2fr .5fr"
                minWidth="150rem"
            >
                <Table.Header>
                    <div># </div>
                    <div>العنوان</div>
                    <div>الحالة</div>
                    <div>الصورة</div>
                    <div>الوصف </div>
                    <div>المحتوي</div>
                    {/* <div>الوصف</div> */}
                    <div>الاجراءات</div>
                </Table.Header>
                <Table.Body
                    data={blogs}
                    render={(blog, index) => (
                        <BlogRow blog={blog} key={blog.id} num={index + 1} />
                    )}
                ></Table.Body>
            </Table>
            <PagParent>
                <MyPagination dataLength={data?.data?.total} pagePerView={15} />
            </PagParent>
        </div>
    );
};

export default BlogTable;
