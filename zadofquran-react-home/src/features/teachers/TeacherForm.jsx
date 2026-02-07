import { useContext } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateTeacher } from "./useCreateTeacher";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
const TeacherForm = () => {
    const { isCreating, createTeacher } = useCreateTeacher();
    const {
        register,
        handleSubmit,
        reset,

        formState,
        control,

        setValue,
    } = useForm({
        // defaultValues: isEditSession ? editValues : {},
        defaultValues: {},
    });
    const { errors } = formState;
    const { close } = useContext(ModalContext);
    function onSubmit(data) {
        // const image =
        // typeof data.image === "string" ? data.image : data.image[0];
        //  if (isEditSession) {
        //  editCabin(
        //      { newCabinData: { ...data, image: image }, id: editId },
        //      {
        //          onSuccess: (data) => {
        //              reset();
        //              onCloseModal?.();
        //          },
        //      }
        //  );
        //  } else {
        createTeacher(
            { data },
            {
                onSuccess: (data) => {
                    reset();
                    close();
                },
            }
        );
        //  }
    }

    function onError(errors) {}
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} id="lol">
            <MyInput
                label="اسم المدرس"
                id="teacherName"
                reg={{
                    ...register("teacherName", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.teacherName}
                disabled={isCreating}
            />
            <br />
            <br />
            <MultiSelect
                control={control}
                type="multi"
                fieldName="اختر مراحل المدرس"
                id="courses"
                error={errors?.courses}
                setFormValue={setValue}
                name="courses"
            />
            <MyModal.Footer>
                <Button
                    disabled={isCreating}
                    style={{
                        background: isCreating ? "var(--color-grey-300)" : "",
                    }}
                    type="submit"
                >
                    حفظ
                </Button>
                <Button onClick={close} variation="third" type="button">
                    الغاء
                </Button>
            </MyModal.Footer>
        </form>
    );
};

export default TeacherForm;
