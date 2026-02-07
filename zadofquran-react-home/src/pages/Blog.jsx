import Body from "../ui/Body";
import Header from "../ui/Header";
import { useEffect, useState } from "react";
import styles from "./blog.module.css";
import Empty from "../ui/Empty";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import PageLayout from "../ui/PageLayout";
import { API_URL } from "../Constants";
import { t } from "i18next";
import { useLangContext } from "../context/LangContext";
async function getBlog(slug, language) {
    const res = await fetch(`${API_URL}blogs/${slug}`, {
        headers: {
            "accept-language": language,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer `,
        },
    });
    let result = res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
}

const Blog = () => {
    const { blogSlug } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const { language } = useLangContext();
    useEffect(() => {
        async function callFun() {
            try {
                const data = await getBlog(blogSlug, language);
                setBlog(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        callFun();
        if (!loading) {
            if (blog?.data?.title && !loading) {
                document.title = blog.data.title;
            } else {
                document.title = " لا يوجد تدوينة لعرضها";
            }
        }
    }, [blogSlug, loading, language]);

    return (
        <PageLayout>
            <Header />
            <Body>
                {loading && <Spinner />}
                {!loading && (
                    <div className={styles.blog}>
                        {blog.data && (
                            <>
                                <div className={styles.blogImage}>
                                    <img
                                        src={blog.data.image}
                                        alt="blog"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <div className={styles.blogContent}>
                                    <h3 className="mainHeading">
                                        {blog.data.title}
                                    </h3>
                                    <span className={styles.date}>
                                        {blog.data.created_at}
                                    </span>
                                </div>
                                <p
                                    className={styles.blogText}
                                    dangerouslySetInnerHTML={{
                                        __html: blog.data.content,
                                    }}
                                >
                                    {/* {blog.data.content} */}
                                </p>
                            </>
                        )}
                        {!blog.data && <Empty text={t("no-blogs")} />}
                    </div>
                )}
            </Body>
        </PageLayout>
    );
};

export default Blog;
