import styled from 'styled-components';

const LayoutWrapper = styled.div`
    width: 1300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    padding: 70px 50px;
    height: 80vh; /* 높이를 줄임 */

    .content {
        background: white;
        height: 100%; /* 부모 요소의 높이를 채우도록 설정 */
    }
`;

const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <main className="content">
                {children}
            </main>
        </LayoutWrapper>
    )
};

export default Layout;
