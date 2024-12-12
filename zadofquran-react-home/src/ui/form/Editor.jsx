import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";

const Editorr = ({
    reg,
    editValue,
    isEditSession,
    name,
    control,
    setValue,
}) => {
    const [content, setContent] = useState("");
    useEffect(() => {
        if (isEditSession) {
            setContent(editValue);
        }
    }, []);
    const config = {
        readonly: false,
        placeholder: "ابدأ بالكتابة ....",
    };

    const handleBlur = (newContent) => {
        setValue(name, newContent);
        setContent(newContent);
    };

    return (
        <>
            <Controller
                render={({ field, fieldState }) => {
                    const { onChange, value, ref } = field;
                    return (
                        <JoditEditor
                            ref={ref}
                            name={name}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={handleBlur}
                        />
                    );
                }}
                control={control}
                {...reg}
            />
        </>
    );
};

export default Editorr;
