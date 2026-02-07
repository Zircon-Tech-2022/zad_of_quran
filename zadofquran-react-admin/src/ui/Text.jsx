import { useLangContext } from "../context/LangContext";
import { translations } from "../utils/translate";

const Text = ({ text }) => {
  const { lang } = useLangContext();
  return <>{translations[lang][text]}</>;
};

export default Text;
