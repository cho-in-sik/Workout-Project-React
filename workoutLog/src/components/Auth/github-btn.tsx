import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import githubLogo from '../assets/github-logo.svg';

const Button = styled.span`
  margin-top: 50px;
  background-color: black;
  font-weight: 500;
  width: 100%;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
      console.log(auth.currentUser);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src={githubLogo} />
      Continue with Github
    </Button>
  );
}
