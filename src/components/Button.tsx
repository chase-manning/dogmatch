import { Link } from "react-router-dom";
import styled from "styled-components";
import triggerEvent from "../app/trigger-event";

const StyledButton = styled.button<{
  $primary?: boolean;
  $wide?: boolean;
  $sub?: boolean;
  $tiny?: boolean;
}>`
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "Jost", sans-serif;

  height: ${({ $tiny }) => ($tiny ? "4.1rem" : "6.7rem")};
  font-size: ${({ $tiny }) => ($tiny ? "2rem" : "2.4rem")};
  font-weight: ${({ $tiny }) => ($tiny ? "500" : "600")};
  width: ${(props) => (props.$wide ? "100%" : props.$tiny ? "17rem" : "23rem")};

  background: ${(props) =>
    props.$primary ? (props.$sub ? "var(--sub)" : "var(--main)") : "var(--bg)"};
  color: ${(props) =>
    props.$primary ? "var(--bg)" : props.$sub ? "var(--sub)" : "var(--main)"};
  border: solid ${({ $tiny }) => ($tiny ? "1px" : "2px")}
    ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};

  @media (max-width: 900px) {
    width: ${(props) =>
      props.$wide ? "100%" : props.$tiny ? "auto" : "23rem"};
    height: ${({ $tiny }) => ($tiny ? "auto" : "6.7rem")};
    border: solid ${({ $tiny }) => ($tiny ? "0" : "2px")}
      ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};
    text-decoration: ${({ $tiny }) => ($tiny ? "underline" : "none")};
  }
`;

const StyledLink = styled(Link)<{
  $primary?: boolean;
  $wide?: boolean;
  $sub?: boolean;
  $tiny?: boolean;
}>`
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "Jost", sans-serif;

  height: ${({ $tiny }) => ($tiny ? "4.1rem" : "6.7rem")};
  font-size: ${({ $tiny }) => ($tiny ? "2rem" : "2.4rem")};
  font-weight: ${({ $tiny }) => ($tiny ? "500" : "600")};
  width: ${(props) => (props.$wide ? "100%" : props.$tiny ? "17rem" : "23rem")};

  background: ${(props) =>
    props.$primary ? (props.$sub ? "var(--sub)" : "var(--main)") : "var(--bg)"};
  color: ${(props) =>
    props.$primary ? "var(--bg)" : props.$sub ? "var(--sub)" : "var(--main)"};
  border: solid ${({ $tiny }) => ($tiny ? "1px" : "2px")}
    ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};

  @media (max-width: 900px) {
    width: ${(props) =>
      props.$wide ? "100%" : props.$tiny ? "auto" : "23rem"};
    height: ${({ $tiny }) => ($tiny ? "auto" : "7rem")};
    border: solid ${({ $tiny }) => ($tiny ? "0" : "2px")}
      ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};
    text-decoration: ${({ $tiny }) => ($tiny ? "underline" : "none")};
  }
`;

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  sub?: boolean;
  action?: () => void;
  link?: string;
  submit?: boolean;
  wide?: boolean;
  event?: string;
  tiny?: boolean;
}

const Button = ({
  children,
  primary,
  sub,
  action,
  link,
  submit,
  wide,
  event,
  tiny,
}: Props) => {
  const isInternalLink = !link?.startsWith("http");

  return (
    <>
      {submit && (
        <StyledButton
          $primary={primary}
          $sub={sub}
          type="submit"
          $wide={wide}
          $tiny={tiny}
          onClick={() => {
            if (event) triggerEvent(event);
          }}
        >
          {children}
        </StyledButton>
      )}
      {action && (
        <StyledButton
          $primary={primary}
          $sub={sub}
          $wide={wide}
          $tiny={tiny}
          onClick={() => {
            action();
            if (event) triggerEvent(event);
          }}
        >
          {children}
        </StyledButton>
      )}
      {link && (
        <StyledLink
          to={link}
          target={isInternalLink ? "" : "_blank"}
          $primary={primary}
          $sub={sub}
          $wide={wide}
          $tiny={tiny}
          onClick={() => {
            if (event) triggerEvent(event);
          }}
        >
          {children}
        </StyledLink>
      )}
    </>
  );
};

export default Button;
