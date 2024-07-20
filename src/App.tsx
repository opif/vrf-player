import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <TopRow>
        <Title>Opowiadania z Ventrilo</Title>
      </TopRow>
      <Wrapper2>
        <Outlet />
      </Wrapper2>
    </>
  );
};

const Title = styled.h1`
  font-size: 2.4rem;
  line-height: 1.1;
  display: block;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2em 1em;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2em;
`;

export default App;
