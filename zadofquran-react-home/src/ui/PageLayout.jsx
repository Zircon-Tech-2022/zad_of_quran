const PageLayout = ({ children }) => {
    return (
        <div className="animated fade2" style={{ overflow: "hidden" }}>
            {children}
        </div>
    );
};

export default PageLayout;
