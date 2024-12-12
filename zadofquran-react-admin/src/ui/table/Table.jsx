import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    min-width: 1200px;
    /* min-width: 1900px; */
    min-width: ${(props) => props.minWidth};
`;

const CommonRow = styled.div`
    display: grid !important;
    grid-template-columns: ${(props) => props.columns};
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

const StyledHeader = styled(CommonRow)`
    padding: 1.6rem 2.4rem;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 700;
    color: var(--color-grey-700);
    font-size: 1.6rem;
`;

const StyledRow = styled(CommonRow)`
    padding: 1.8rem 2.4rem;
    font-size: 1.5rem;

    font-weight: 600;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section`
    margin: 0.4rem 0;
`;

const Footer = styled.footer`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
    &:not(:has(*)) {
        display: none;
    }
`;

const MyLol = styled.div`
    /* width: 1500px; */
    overflow: auto;
`;
const Empty = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
`;
const TableContext = createContext();
const Table = ({ columns, children }) => {
    return (
        <TableContext.Provider value={{ columns }}>
            <MyLol>
                <StyledTable role="table">{children}</StyledTable>
            </MyLol>
        </TableContext.Provider>
    );
};

function Header({ children }) {
    const { columns } = useContext(TableContext);
    return (
        <StyledHeader role="row" columns={columns} as="header">
            {children}
        </StyledHeader>
    );
}

function Row({ children }) {
    const { columns } = useContext(TableContext);
    return (
        <StyledRow role="row" columns={columns}>
            {children}
        </StyledRow>
    );
}

function Body({ data, render }) {
    if (!data?.length) return <Empty>لا يوجد بيانات حاليا</Empty>;
    return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
Table.defaultProps = {
    minWidth: "150rem",
};
export default Table;
