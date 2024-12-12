import styled from "styled-components";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { BiCloudUpload } from "react-icons/bi";
import { useRef } from "react";
import { useEffect } from "react";
const FileButtn = styled.label`
    background: var(--color-brand-600);
    color: var(--color-grey-0);
    border-radius: 1.2rem;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    cursor: pointer;
`;
const FileInput = ({ reg, getValues, isSubmitted, id, ...props }) => {
    return (
        <div>
            <FileButtn for="inp">
                <BiCloudUpload />
                <span>ارفع الصورة</span>
                <input id="inp" {...reg} {...props} type="file" />
            </FileButtn>
            {/* {getValues(id)[0].name} */}
        </div>
    );
};

export default FileInput;
