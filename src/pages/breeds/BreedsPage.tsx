import styled from "styled-components";

import paws from "../../assets/paws.svg";
import { Link } from "react-router-dom";
import { QUIZ_PATH } from "../../app/paths";
import Search from "../../components/Search";
import { useState } from "react";
import useDogs from "../../app/use-dogs";
import DogCard from "../../components/DogCard";
import { DogType } from "../../components/DogContext";
import levenshtein from "../../app/levenshtein";
import Button from "../../components/Button";
import Seo from "../../components/Seo";

const RESULTS_PER_PAGE = 12;

const StyledBreedsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
  padding: 2.5rem;
`;

const Paws = styled.img`
  width: 43rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Header = styled.h1`
  font-family: "Jost", sans-serif;
  font-size: 9.6rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 6.2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  text-align: center;
  max-width: 125rem;
  margin-top: 3rem;
  line-height: 1.4;

  @media (max-width: 900px) {
    font-size: 2.2rem;
    font-weight: 400;
  }
`;

const StyledLink = styled(Link)`
  font-size: 2.4rem;
  font-weight: 600;
  text-decoration: underline;
  color: var(--main);

  @media (max-width: 900px) {
    font-size: 2.2rem;
    font-weight: 400;
  }
`;

const SearchContainer = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

const Dogs = styled.div`
  width: 100%;
  max-width: 151.1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(47.7rem, 1fr));
  gap: 4rem;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 151.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 10rem;
`;

const BreedsPage = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { dogs, loading } = useDogs();

  const searchScore = (dog: DogType) => {
    const lowerSearchValue = search.toLowerCase();
    const lowerDogName = dog.generalInformation.name.toLowerCase();
    const startsWith = lowerDogName.startsWith(lowerSearchValue);
    const includes = lowerDogName.includes(lowerSearchValue);

    return (
      (startsWith ? 0 : 100_000) +
      (includes ? 0 : 1_000) +
      levenshtein(lowerDogName, lowerSearchValue)
    );
  };

  const topResults =
    dogs && search
      ? dogs.sort((a, b) => searchScore(a) - searchScore(b))
      : dogs.sort((a, b) =>
          a.generalInformation.name.localeCompare(b.generalInformation.name)
        );

  const setPageAndScroll = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <StyledBreedsPage>
      <Seo
        title="Dog breeds"
        description="Explore our full directory of dog breeds. Find your perfect dog!"
      />
      <Paws src={paws} alt="paws" />
      <Header>Dog directory</Header>
      <Paragraph>
        Explore our full directory of dog breeds here. Whether you're looking
        for an affectionate companion or a faithful guardian for your home, use
        our filters to find the key characteristics that you're looking for.
      </Paragraph>
      <Paragraph>
        Alternatively, take the{" "}
        <StyledLink to={`/${QUIZ_PATH}`}>dogmatch quiz</StyledLink> to find your
        perfect dog, personalised just for you based on your answers.
      </Paragraph>
      <SearchContainer>
        <Search
          value={search}
          setValue={setSearch}
          placeholder="Search by name"
          width="57rem"
          mobileWidth="43rem"
        />
      </SearchContainer>
      <Dogs>
        {!loading
          ? topResults
              .slice(page * RESULTS_PER_PAGE, (page + 1) * RESULTS_PER_PAGE)
              .map((dog) => <DogCard key={dog.id} dog={dog} />)
          : Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
              <DogCard key={index} dog={null} />
            ))}
      </Dogs>
      <ButtonContainer>
        {page === 0 ? (
          <div />
        ) : (
          <Button
            sub
            action={() => {
              setPageAndScroll(page - 1);
            }}
          >
            Previous page
          </Button>
        )}
        {page * RESULTS_PER_PAGE + RESULTS_PER_PAGE >= topResults.length ? (
          <div />
        ) : (
          <Button primary sub action={() => setPageAndScroll(page + 1)}>
            Next page
          </Button>
        )}
      </ButtonContainer>
    </StyledBreedsPage>
  );
};

export default BreedsPage;
