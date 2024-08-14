import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button<{ $primary?: boolean; $wide?: boolean }>`
  height: 6.7rem;
  border-radius: 1rem;
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${(props) => (props.$wide ? "100%" : "23rem")};
  font-family: "Jost", sans-serif;

  background: ${(props) => (props.$primary ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$primary ? "var(--bg)" : "var(--main)")};
  border: solid 2px var(--main);
`;

const StyledLink = styled(Link)<{ $primary?: boolean; $wide?: boolean }>`
  height: 6.7rem;
  border-radius: 1rem;
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${(props) => (props.$wide ? "100%" : "23rem")};
  font-family: "Jost", sans-serif;

  background: ${(props) => (props.$primary ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$primary ? "var(--bg)" : "var(--main)")};
  border: solid 2px var(--main);
`;

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  link?: string;
  submit?: boolean;
  wide?: boolean;
}

const Button = ({ children, primary, onClick, link, submit, wide }: Props) => {
  const isInternalLink = !link?.startsWith("http");

  return (
    <>
      {submit && (
        <StyledButton $primary={primary} type="submit" $wide={wide}>
          {children}
        </StyledButton>
      )}
      {onclick && (
        <StyledButton $primary={primary} onClick={onClick} $wide={wide}>
          {children}
        </StyledButton>
      )}
      {link && (
        <StyledLink
          to={link}
          $primary={primary}
          target={isInternalLink ? "" : "_blank"}
          $wide={wide}
        >
          {children}
        </StyledLink>
      )}
    </>
  );
};

export default Button;
