import Header from "../features/home/Header";
import Stat from "../features/home/Stat";
import Why from "../features/home/Why";
import About from "../features/home/About";
import Courses from "../features/home/Courses";
import Testimonials from "../features/home/Testimonials";
import Plans from "../features/home/Plans";
import Payments from "../features/home/Payments";
import Teachers from "../features/home/Teachers";
import { useEffect } from "react";
import PageLayout from "../ui/PageLayout";
import { t } from "i18next";

export default function Home() {
    useEffect(() => {
        document.title = t("zad");
    }, []);
    return (
        <PageLayout>
            <Header />
            <Stat />
            <Why />
            <About />
            <Testimonials />
            <Courses />
            <Teachers />
            <Plans />
            <Payments />
        </PageLayout>
    );
}
