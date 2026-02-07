import styled from "styled-components";

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0;
    width: 100%;
    justify-content: center;
    transition: 0.3s all ease;
`;

export const Type = styled.span`
    color: var(--color-sec-600);
    font-weight: 600;
    transition: 0.3s all ease;
    transform: scale(0);
    opacity: 0;
    font-size: 0;
`;
export const Zircon = styled.h1`
    color: var(--color-brand-700);
    font-weight: 700;
    transition: 0.3s all ease;
    transform: scale(0);
    opacity: 0;
    font-size: 0;
`;
export const BrandImg = styled.div`
    width: 4rem;
    transition: 0.3s all ease;
`;
const SideBarBrand = () => {
    return (
        <Brand>
            <BrandImg>
                <img src="/imgs/colorfulLogo.svg" alt="" />
            </BrandImg>
            <div>
                <Zircon>Zircon tech</Zircon>
                <Type>admin panel</Type>
            </div>
        </Brand>
    );
};

export default SideBarBrand;
