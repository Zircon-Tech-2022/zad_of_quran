import { Tooltip } from "@mui/material";
import styled from "styled-components";

const StyledCell = styled.div`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    white-space: nowrap;
`;

export const Cell = ({ children, title, ...props }) => {
    return (
        <StyledCell {...props}>
            <Tooltip
                sx={{
                    "&": {
                        padding: "10.5px 14px 10.5px 50px !important",
                        maxHeight: "20rem",
                        overflowY: "auto",
                        fontSize: "3rem",
                    },
                }}
                title={title}
                placement="top-start"
            >
                {children}
            </Tooltip>
        </StyledCell>
    );
};
