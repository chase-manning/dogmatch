import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledSkeleton = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: linear-gradient(90deg, #f0f0f0, #f8f8f8, #f0f0f0);
  background-size: 200% 100%;
  animation: ${animation} 1.5s infinite linear;
  border-radius: 1rem;
`;

interface Props {
  width: string;
  height: string;
}

const Skeleton = ({ width, height }: Props) => {
  return <StyledSkeleton width={width} height={height} />;
};

export default Skeleton;
