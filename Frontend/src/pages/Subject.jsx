import Layout from "../components/Layout";
import styled from "styled-components";
import Chip from "../components/Chip";
import ChipGroup from "../components/ChipGroup";

const SubjectWrapper = styled.div`
    .title-text {
        font-size: 30px;
        text-align: center;
        margin-top: 0px; /* 상단 마진 추가 */
        font-weight: 600;
    }

    /* ChipGroup을 가운데 정렬하고, 여러 줄로 배치하기 위한 스타일 */
    .chip-group-container {
        margin: 80px 0;
        display: flex;
        flex-direction: column; /* 열 방향으로 배치 */
        align-items: center; /* 가운데 정렬 */
        gap: 32px; /* ChipGroup 사이의 간격 */
    }
`;

const Subject = () => {
    return (
        <Layout>
            <SubjectWrapper>
                <div className="title-text">어떤 과목의 퀴즈를 풀고 싶은지<br/>선택해 주세요!</div>
                <div className="chip-group-container">
                    <ChipGroup>
                        <Chip subject='HTML' />
                        <Chip subject='CSS' />
                        <Chip subject='JavaScript' />
                    </ChipGroup>
                    <ChipGroup>
                        <Chip subject='Git' />
                        <Chip subject='AI' />
                    </ChipGroup>
                    <ChipGroup>
                        <Chip subject='Node' />
                        <Chip subject='MongoDB' />
                        <Chip subject='Express' />
                        <Chip subject='React' />
                    </ChipGroup>
                </div>
            </SubjectWrapper>
        </Layout>
    );
};

export default Subject;
