import MyInput from "../../ui/form/MyInput";
import React, { useContext } from "react";
import styles from "./planForm.module.css";
import { Textarea } from "../../ui/form/Textarea";
import { useForm } from "react-hook-form";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { usePlan } from "./usePlan";
import MultiSelect from "../../ui/form/MultiSelect";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";
const PlanForm = ({ id }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        getValues,
        setError,
        setValue,
    } = useForm();
    const { isLoading, plan } = usePlan(setError);
    const { close } = useContext(ModalContext);
    const { language } = useLangContext();
    function onSubmit(data) {
        plan(
            { ...data, gender: data.gender, plan_id: id },
            {
                onSuccess: (data) => {
                    reset();
                    close?.();
                },
            }
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                label={t("name")}
                id="name"
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                disabled={isLoading}
            />
            <MyInput
                label={t("email")}
                id="email"
                reg={{
                    ...register("email", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.email}
                disabled={isLoading}
            />
            <MyInput
                label={t("age")}
                id="age"
                reg={{
                    ...register("age", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                type="number"
                error={errors?.age}
                disabled={isLoading}
            />
            <MyInput
                label={t("phone")}
                id="phone"
                reg={{
                    ...register("phone", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.phone}
                disabled={isLoading}
                style={{ direction: "ltr"}}
            />
            <MyInput
                label={t("individuals")}
                id="persons_count"
                reg={{
                    ...register("persons_count", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                type="number"
                error={errors?.persons_count}
                disabled={isLoading}
            />
            <MultiSelect
                control={control}
                fieldName={t("gender")}
                id="gender"
                error={errors?.gender}
                setFormValue={setValue}
                name="gender"
                myOptions={[
                    { value: "female", title: t("female") },
                    { value: "male", title: t("male") },
                ]}
            />{" "}
            <div>
                <Textarea
                    name="appointments"
                    setValue={setValue}
                    style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                    // editValue={faqData?.answer}
                    placeholder={t("suitable")}
                    {...register("appointments", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                ></Textarea>
                <span style={{ color: "#d32f2f" }}>
                    {errors?.appointments?.message}
                </span>
            </div>
            <MyModal.Footer>
                <Button
                    disabled={isLoading}
                    style={{
                        background: isLoading ? "var(--color-grey-300)" : "",
                    }}
                    type="submit"
                    className="second"
                >
                    {t("save")}
                </Button>
                <Button className="third" onClick={close} type="button">
                    {t("cancel")}
                </Button>
            </MyModal.Footer>
        </form>
    );
};

export default PlanForm;
