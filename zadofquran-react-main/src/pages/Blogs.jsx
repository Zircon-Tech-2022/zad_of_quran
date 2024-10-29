import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import Body from "../ui/Body";
import { Grid } from "@mui/material";
import styles from "./blogs.module.css";
import { Link } from "react-router-dom";
import MyPagination from "../ui/MyPagination";
import Empty from "../ui/Empty";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import PageLayout from "../ui/PageLayout";
import { API_URL } from "../Constants";
import { useLangContext } from "../context/LangContext";
import { t } from "i18next";

async function getBlogs(page, language) {
    const res = await fetch(`${API_URL}blogs?page=${page || 1}&limit=5`, {
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

const Blogs = () => {
    const [blogs, setBlogs] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const { language } = useLangContext();
    const page = searchParams.get("page");

    useEffect(() => {
        document.title = t("latest-blogs");
        setLoading(true);
        async function callFun() {
            try {
                const data = await getBlogs(page, language);

                setBlogs(data.data);
                setLoading(false);
            } catch (err) {}
        }
        callFun();
    }, [page, language]);
    return (
        <PageLayout>
            <Header title={t("latest-blogs")} />
            <Body>
                {loading && <Spinner />}
                {!loading && (
                    <div className={styles.blogs}>
                        <Grid container justifyContent="center" gap={"8rem"}>
                            {blogs.data?.length
                                ? blogs.data.map((blog, index) => {
                                      return (
                                          <Grid
                                              key={index}
                                              item
                                              xl={10}
                                              md={11}
                                              sm={8}
                                              xs={12}
                                              data-aos="fade-up"
                                              data-aos-duration="1000"
                                              data-aos-delay="100"
                                          >
                                              <Link
                                                  to={`/${language}/blogs/${blog.slug}`}
                                                  className={styles.blog}
                                              >
                                                  <div
                                                      className={
                                                          styles.blogImage
                                                      }
                                                  >
                                                      <img
                                                          src={blog.image}
                                                          alt="blog image"
                                                          width={300}
                                                          height={300}
                                                      />
                                                  </div>
                                                  <div
                                                      className={
                                                          styles.blogContent
                                                      }
                                                  >
                                                      <h3 className="mainHeading">
                                                          {blog.title}
                                                      </h3>
                                                      <p>{blog.description}</p>
                                                  </div>
                                              </Link>
                                          </Grid>
                                      );
                                  })
                                : ""}
                            {!blogs?.data?.length && (
                                <div className={styles.blog}>
                                    <Empty text={t("no-blogs")} />
                                </div>
                            )}
                        </Grid>

                        {blogs?.total ? (
                            <div className="pagination">
                                <MyPagination
                                    dataLength={blogs?.total || 1}
                                    pagePerView={5}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </Body>
        </PageLayout>
    );
};

export default Blogs;
