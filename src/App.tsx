import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Title>Opowiadania z Ventrilo</Title>
      <Outlet />
    </>
  );
};

const Title = styled.h1`
  margin: 0;
  padding: 0.5rem;
  color: #aebda4;
  background: #272433;
  font-size: 2.4rem;
  text-align: center;
  line-height: 1;
  display: block;

  @media (min-height: 900px) {
    padding: 1rem 0.5rem 1.5rem;
  }
`;

export default App;
