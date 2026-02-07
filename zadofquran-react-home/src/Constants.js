import { scrollToSection } from "./utils/helpers";

export const API_URL = import.meta.env.VITE_SERVER_URI;

// export const API_URL = "https://api.zadofquran.com/";
export const NavLinks = [
  {
    id: "about",
    onClick: () => scrollToSection(document?.getElementById("about")),
    ar: "عن الاكاديمية",
    en: "About us",
  },
  {
    id: "testimonials",
    onClick: () => scrollToSection(document?.getElementById("testimonials")),
    ar: "الآراء",
    en: "Testimonials",
  },
  {
    id: "courses",
    onClick: () => scrollToSection(document?.getElementById("courses")),
    ar: "الدورات",
    en: "Courses",
  },
  {
    id: "teachers",
    onClick: () => scrollToSection(document?.getElementById("teachers")),
    ar: "الفريق",
    en: "Team",
  },

  {
    id: "plans",
    onClick: () => scrollToSection(document?.getElementById("plans")),
    ar: "خطط الأسعار",
    en: "Plans",
  },
  {
    to: `blogs`,
    ar: "المدونة",
    en: "Blogs",
  },
  {
    to: `faq`,
    ar: "الأسئلة الشائعة",
    en: "Faqs",
  },
  {
    id: "footer",
    onClick: () => scrollToSection(document?.getElementById("footer")),
    ar: "تواصل معنا",
    en: "Contact us",
  },
  {
    to: `teacher`,
    ar: "معلم؟",
    en: "Teacher?",
  },
];
export const langsArr = ["en", "ar"];
