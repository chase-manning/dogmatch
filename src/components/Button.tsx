import styled from "styled-components";

const StyledButton = styled.button<{ $primary?: boolean }>`
  height: 6.7rem;
  border-radius: 1rem;
  font-size: 2.4rem;
  font-weight: 650;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 23rem;
  font-family: "Jost", sans-serif;

  background: ${(props) => (props.$primary ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$primary ? "var(--bg)" : "var(--main)")};
  border: solid 2px var(--main);
`;

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

const Button = ({ children, primary, onClick }: Props) => {
  return (
    <StyledButton $primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
