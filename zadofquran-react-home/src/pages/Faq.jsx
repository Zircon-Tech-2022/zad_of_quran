import React, { useEffect, useState } from "react";
import AppLayout from "../ui/AppLayout";
import Body from "../ui/Body";
import Header from "../ui/Header";
import AccordionComponent from "../features/faq/Accordion";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import PageLayout from "../ui/PageLayout";
import { t, use } from "i18next";
import { useLangContext } from "../context/LangContext";
async function getFaq(page, language) {
    const res = await fetch(
        `${import.meta.env.VITE_API_URI}FAQs?page=${page || 1}&limit=20`,
        {
            headers: {
                "accept-language": language,
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer `,
            },
        }
    );
    let result = res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
}
const Faq = () => {
    const [faqs, setFaq] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const { language } = useLangContext();
    const page = searchParams.get("page");

    useEffect(() => {
        document.title = t("faq");
        setLoading(true);
        async function callFun() {
            try {
                const data = await getFaq(page, language);
                setFaq(data.data);
                setLoading(false);
            } catch (err) { }
        }
        callFun();
    }, [page, language]);
    return (
        <PageLayout>
            <Header title={t("faq")} />
            <Body>
                {!loading && (
                    <AccordionComponent total={faqs?.total} data={faqs?.data} />
                )}
                {loading && <Spinner />}
            </Body>
        </PageLayout>
    );
};

export default Faq;
