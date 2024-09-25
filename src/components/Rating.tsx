import styled from "styled-components";
import Tooltip from "./Tooltip";
import Skeleton from "./Skeleton";
import { getItemMetadata } from "../app/item-metadata";

const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 900px) {
    gap: 0.7rem;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 2.4rem;
  font-weight: 650;
  font-family: "Jost", sans-serif;
  white-space: nowrap;

  @media (max-width: 900px) {
    font-size: 2.3rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;

  @media (max-width: 900px) {
    gap: 1.5rem;
  }
`;

const RatingItem = styled.div<{ $active: boolean; $color: string }>`
  flex: 1;
  height: 1.4rem;
  border-radius: 7rem;
  border: solid 1px ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? $color : "var(--bg)")};

  @media (max-width: 900px) {
    height: 1.2rem;
  }
`;

interface Props {
  category: string;
  trait: string;
  value: number | null;
  color: string;
}

const Rating = ({ category, trait, value, color }: Props) => {
  const metadata = getItemMetadata(category, trait);
  if (!metadata) throw new Error("no metadata found");

  let tooltip = metadata.tooltip;

  if (metadata.min && metadata.max) {
    tooltip += `\n(1 = ${metadata.min}, 5 = ${metadata.max})`;
  }

  return (
    <StyledRating>
      <LabelContainer>
        <Label>{metadata.label}</Label>
        <Tooltip>{tooltip}</Tooltip>
      </LabelContainer>
      <RatingContainer>
        {value ? (
          [1, 2, 3, 4, 5].map((index) => (
            <RatingItem key={index} $active={index <= value} $color={color} />
          ))
        ) : (
          <Skeleton width="100%" height="1.4rem" />
        )}
      </RatingContainer>
    </StyledRating>
  );
};

export default Rating;
