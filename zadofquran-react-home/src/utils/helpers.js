export const scrollToSection = (ref) => {
    const topPos = +ref?.offsetTop - 90;
    const scrollOptions = {
        top: topPos,
        behavior: "smooth",
    };
    window.scrollTo(scrollOptions);
};

export const calculateTimezone = (local, gmt) => {
    const [localHours, localMinutes] = local.split(":").map(Number);
    const [gmtHours, gmtMinutes] = gmt.split(":").map(Number);

    const localTotalMinutes = localHours * 60 + localMinutes;
    const gmtTotalMinutes = gmtHours * 60 + gmtMinutes;

    const differenceInMinutes = localTotalMinutes - gmtTotalMinutes;

    const hours = Math.floor(Math.abs(differenceInMinutes) / 60);
    const minutes = Math.abs(differenceInMinutes) % 60;

    let sign = differenceInMinutes >= 0 ? '+' : '-';

    let formattedOffset = `GMT${sign}${hours}`;

    if (minutes) {
        formattedOffset += `:${minutes.toString().padStart(2, '0')}`;
    }

    return formattedOffset;
}

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
