import styles from "./contactForm.module.css";
import MyInput from "./form/MyInput";
import { useForm } from "react-hook-form";
import { Textarea } from "./form/Textarea";
import Button from "./Button";
import { useContact } from "../features/useContact";
import Spinner from "./Spinner";
import { t } from "i18next";

const ContactForm = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();
    const { contact, isLoading } = useContact(setError);
    function onSubmit(data) {
        contact(data, {
            onSuccess: () => {
                reset();
            },
        });
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mainHeading">{t("contact-us")}</h3>
            <MyInput
                id="name_id"
                disabled={isLoading}
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                type="text"
                label={t("name")}
            />
            <MyInput
                id="phone_id"
                disabled={isLoading}
                reg={{
                    ...register("phone", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.phone}
                type="text"
                label={t("phone")}
                style={{ direction: "ltr"}}
            />
            <MyInput
                id="email_id"
                disabled={isLoading}
                reg={{
                    ...register("email", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.email}
                type="text"
                label={t("email")}
            />
            <MyInput
                id="subject_id"
                disabled={isLoading}
                reg={{
                    ...register("subject", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.subject}
                type="text"
                label={t("subject")}
            />
            <div>
                <Textarea
                    id="content_id"
                    disabled={isLoading}
                    name="content"
                    setValue={setValue}
                    // editValue={faqData?.answer}
                    placeholder={t("message")}
                    {...register("content", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                ></Textarea>
                <span style={{ color: "#d32f2f" }}>
                    {errors?.content?.message}
                </span>
            </div>
            {isLoading && <Spinner />}
            <Button className="buttonFill" disabled={isLoading} type="submit">
                {t("send")}
            </Button>
        </form>
    );
};

export default ContactForm;
