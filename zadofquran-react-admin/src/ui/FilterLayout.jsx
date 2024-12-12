import React from "react";
import styled from "styled-components";
import Heading from "./Heading";

const StyleFilterLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-bottom: 3rem;
`;
const FilterLayout = ({ children, title = "لائحة" }) => {
    return (
        <StyleFilterLayout>
            <Heading color="var(--color-brand-700)" size="3.2" weight="700">
                {title}
            </Heading>
            {children}
        </StyleFilterLayout>
    );
};

export default FilterLayout;
