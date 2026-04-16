import { forwardRef } from "react";
import styled from "styled-components";
import { DogRatings, CoupleRatings } from "../../app/dog-rating";
import { DogType } from "../../components/DogContext";
import { QuizType } from "./quiz-data";

import gold from "../../assets/gold.svg";
import silver from "../../assets/silver.svg";
import bronze from "../../assets/bronze.svg";
import white from "../../assets/white.svg";
import paw from "../../assets/paw.svg";

// Fixed-dimension A4-ish sheet (portrait, 96dpi: 794 x 1123) sized for
// single-page export, with the rendered content scaled to fit the page.
const SHEET_WIDTH = 794;

const Sheet = styled.div`
  width: ${SHEET_WIDTH}px;
  background: #ffffff;
  color: #1d5d9b;
  padding: 56px 56px 80px 56px;
  font-family: "Kumbh Sans", sans-serif;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 2px solid #daf0ff;
  margin-bottom: 32px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const BrandName = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: #75c2f6;
`;

const DateText = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #75c2f6;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 6px;
  color: #1d5d9b;
`;

const Subtitle = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 16px;
  color: #75c2f6;
  margin-bottom: 36px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0 18px 0;
`;

const SectionPaw = styled.img`
  width: 22px;
  height: 22px;
`;

const SectionTitle = styled.div`
  font-size: 22px;
  font-weight: 650;
  color: #1d5d9b;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 28px;
  border-bottom: 1px solid #75c2f6;
  margin-bottom: 4px;
`;

const HeaderCell = styled.div<{ $flex: number; $align?: string }>`
  flex: ${({ $flex }) => $flex};
  font-family: "Jost", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #1d5d9b;
  text-align: ${({ $align }) => $align || "left"};
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const Row = styled.div<{ $even: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 58px;
  background: ${({ $even }) => ($even ? "transparent" : "#daf0ff")};
  border-radius: 10px;
`;

const RankCell = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const AwardImg = styled.img`
  width: 38px;
  height: 38px;
`;

const AwardNumber = styled.div<{ $white: boolean }>`
  position: absolute;
  top: 50%;
  left: 19px;
  transform: translate(-50%, -50%);
  font-family: "Jost", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${({ $white }) => ($white ? "#ffffff" : "#75c2f6")};
`;

const ThumbCell = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Thumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  background: #e6e6e6;
`;

const NameCell = styled.div`
  flex: 2.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RowName = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1d5d9b;
`;

const RowSubtle = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 10px;
  color: #75c2f6;
  margin-top: 2px;
`;

const PercentCell = styled.div`
  flex: 0.8;
  font-family: "Jost", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #1d5d9b;
  text-align: center;
`;

const TraitsCell = styled.div`
  flex: 2.6;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Trait = styled.div`
  padding: 3px 10px;
  border: 1px solid #1d5d9b;
  border-radius: 6px;
  font-family: "Jost", sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #1d5d9b;
  background: #ffffff;
  white-space: nowrap;
`;

const Footer = styled.div`
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #daf0ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-size: 12px;
  color: #75c2f6;
`;

const awardFor = (place: number) =>
  place === 1 ? gold : place === 2 ? silver : place === 3 ? bronze : white;

interface Props {
  ratings: DogRatings;
  quiz: QuizType;
  coupleRatings?: CoupleRatings | null;
  dogs: DogType[];
}

const PrintableResults = forwardRef<HTMLDivElement, Props>(
  ({ ratings, quiz, coupleRatings, dogs }, ref) => {
    const isCouple = quiz.mode === "couple" && !!coupleRatings;
    const names = quiz.coupleNames;

    const ranked = [...dogs]
      .sort((a, b) => ratings[b.id].percent - ratings[a.id].percent)
      .slice(0, 10);

    const today = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const titleText = isCouple && names
      ? `${names[0]} & ${names[1]}'s Perfect Match`
      : "Your Perfect Match";

    const subtitleText = isCouple
      ? "A compatibility report for the two of you"
      : "Your personal dog compatibility report";

    return (
      <Sheet ref={ref}>
        <TopBar>
          <Brand>
            <BrandIcon src={paw} alt="paw" crossOrigin="anonymous" />
            <BrandName>dogmatch</BrandName>
          </Brand>
          <DateText>{today}</DateText>
        </TopBar>

        <Title>{titleText}</Title>
        <Subtitle>{subtitleText}</Subtitle>

        <SectionHeader>
          <SectionPaw src={paw} alt="paw" crossOrigin="anonymous" />
          <SectionTitle>Top 10 most compatible dogs</SectionTitle>
        </SectionHeader>

        <TableHeader>
          <HeaderCell $flex={0.8}>Rank</HeaderCell>
          <HeaderCell $flex={0.8}>Photo</HeaderCell>
          <HeaderCell $flex={2.2}>Breed</HeaderCell>
          <HeaderCell $flex={0.8} $align="center">
            Match
          </HeaderCell>
          <HeaderCell $flex={2.6}>Key Characteristics</HeaderCell>
        </TableHeader>

        {ranked.map((dog, index) => {
          const place = index + 1;
          const pct = Math.round(ratings[dog.id].percent * 100);
          return (
            <Row key={dog.id} $even={place % 2 === 1}>
              <RankCell>
                <AwardImg
                  src={awardFor(place)}
                  alt={`award ${place}`}
                  crossOrigin="anonymous"
                />
                <AwardNumber $white={place <= 3}>{place}</AwardNumber>
              </RankCell>
              <ThumbCell>
                <Thumb
                  src={dog.images.small.outdoors}
                  alt={dog.general.name}
                  crossOrigin="anonymous"
                />
              </ThumbCell>
              <NameCell>
                <RowName>{dog.general.name}</RowName>
                {isCouple && names && coupleRatings && (
                  <RowSubtle>
                    {names[0]}:{" "}
                    {Math.round(coupleRatings.person1[dog.id].percent * 100)}%{" · "}
                    {names[1]}:{" "}
                    {Math.round(coupleRatings.person2[dog.id].percent * 100)}%
                  </RowSubtle>
                )}
              </NameCell>
              <PercentCell>{pct}%</PercentCell>
              <TraitsCell>
                {dog.general.personalityTraits.slice(0, 4).map((trait) => (
                  <Trait key={trait}>{trait.toLowerCase()}</Trait>
                ))}
              </TraitsCell>
            </Row>
          );
        })}

        <Footer>
          <div>Generated at dogmatch.me</div>
          <div>Find your perfect dog match</div>
        </Footer>
      </Sheet>
    );
  }
);

PrintableResults.displayName = "PrintableResults";

export default PrintableResults;
