import styled from "styled-components";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { BiCloudUpload } from "react-icons/bi";
const FileInput = ({ reg, getValues, isSubmitted, id, ...props }) => {
    return (
        <div>
            <Button>
                <BiCloudUpload />
                <span>ارفع الصورة</span>
                <input {...reg} {...props} type="file" />
            </Button>
            {/* {getValues(id)[0].name} */}
        </div>
    );
};

export default FileInput;
