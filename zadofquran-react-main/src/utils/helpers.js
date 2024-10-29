export const scrollToSection = (ref) => {
    const topPos = +ref?.offsetTop - 90;
    const scrollOptions = {
        top: topPos,
        behavior: "smooth",
    };
    window.scrollTo(scrollOptions);
};

export const ObserverFun = (setActiveSection) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        { rootMargin: "-50% 0px -50% 0px" }
    );
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        observer.observe(section);
    });
    return () => {
        sections.forEach((section) => {
            observer.unobserve(section);
        });
    };
};
