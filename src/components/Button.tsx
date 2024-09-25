import { Link } from "react-router-dom";
import styled from "styled-components";
import triggerEvent from "../app/trigger-event";

const StyledButton = styled.button<{
  $primary?: boolean;
  $wide?: boolean;
  $sub?: boolean;
}>`
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

  background: ${(props) =>
    props.$primary ? (props.$sub ? "var(--sub)" : "var(--main)") : "var(--bg)"};
  color: ${(props) =>
    props.$primary ? "var(--bg)" : props.$sub ? "var(--sub)" : "var(--main)"};
  border: solid 2px ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};
`;

const StyledLink = styled(Link)<{
  $primary?: boolean;
  $wide?: boolean;
  $sub?: boolean;
}>`
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

  background: ${(props) =>
    props.$primary ? (props.$sub ? "var(--sub)" : "var(--main)") : "var(--bg)"};
  color: ${(props) =>
    props.$primary ? "var(--bg)" : props.$sub ? "var(--sub)" : "var(--main)"};
  border: solid 2px ${(props) => (props.$sub ? "var(--sub)" : "var(--main)")};

  @media (max-width: 900px) {
    height: 7rem;
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
          onClick={() => {
            action();
            if (event) triggerEvent(event);
          }}
          $wide={wide}
        >
          {children}
        </StyledButton>
      )}
      {link && (
        <StyledLink
          to={link}
          $primary={primary}
          $sub={sub}
          target={isInternalLink ? "" : "_blank"}
          $wide={wide}
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
