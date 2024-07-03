import { styled } from 'styled-components';

const App = () => {
  return (
    <>
      <Wrapper>
        <Title>Opowiadania z Ventrilo</Title>
      </Wrapper>
    </>
  );
};

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  display: block;
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default App;
