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
import Dropdown from "../../components/Dropdown";
import Accordion from "../../components/Accordion";

const RESULTS_PER_PAGE = 12;

interface SortOption {
  label: string;
  category: string;
  trait: string;
  descending: boolean;
}

const SORT_OPTIONS: SortOption[] = [
  {
    label: "Alphabetically",
    category: "general",
    trait: "name",
    descending: true,
  },
  {
    label: "Alphabetically",
    category: "general",
    trait: "name",
    descending: false,
  },
  {
    label: "Popularity",
    category: "general",
    trait: "popularity",
    descending: true,
  },
  {
    label: "Popularity",
    category: "general",
    trait: "popularity",
    descending: false,
  },
  {
    label: "Size",
    category: "physical",
    trait: "size",
    descending: true,
  },
  {
    label: "Size",
    category: "physical",
    trait: "size",
    descending: false,
  },
];

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
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 5.7rem;
  width: 100%;
  max-width: 183rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 25.5rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const FilterContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--sub);
  height: 4rem;
  padding: 0 1rem;
`;

const FilterHeader = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  font-style: italic;
`;

const ClearAllButton = styled.button`
  font-size: 1.8rem;
  font-weight: 300;
  cursor: pointer;
  color: var(--main);
  font-style: italic;
`;

const DogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

const Dogs = styled.div`
  width: 100%;
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

const NameContainer = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
  width: 100%;
`;

const NameItem = styled.button<{ $selected: boolean }>`
  font-size: 1.8rem;
  font-weight: 500;
  background: var(--bg);
  border: 1px solid var(--sub);
  border-radius: 1rem;
  height: 4rem;
  width: 4rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${(props) => (props.$selected ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$selected ? "var(--bg)" : "var(--main)")};
`;

const BreedsPage = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { dogs, loading } = useDogs();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const getSortLabel = (option: SortOption) => {
    return `${option.label} (${option.descending ? "desc" : "asc"})`;
  };

  const [sort, setSort] = useState(getSortLabel(SORT_OPTIONS[0]));

  const sortOption = SORT_OPTIONS.find(
    (option) => getSortLabel(option) === sort
  ) as SortOption;

  const searchScore = (dog: DogType) => {
    const lowerSearchValue = search.toLowerCase();
    const lowerDogName = dog.general.name.toLowerCase();
    const startsWith = lowerDogName.startsWith(lowerSearchValue);
    const includes = lowerDogName.includes(lowerSearchValue);

    return (
      (startsWith ? 0 : 100_000) +
      (includes ? 0 : 1_000) +
      levenshtein(lowerDogName, lowerSearchValue)
    );
  };

  const filteredDogs = dogs.filter((dog) => {
    if (selectedLetters.length > 0) {
      return selectedLetters.includes(dog.general.name[0].toUpperCase());
    }
    return true;
  });

  const topResults =
    filteredDogs && search
      ? filteredDogs.sort((a, b) => searchScore(a) - searchScore(b))
      : filteredDogs.sort((a, b) => {
          if (
            sortOption.category === "general" &&
            sortOption.trait === "name"
          ) {
            if (sortOption.descending) {
              return a.general.name.localeCompare(b.general.name);
            }
            return b.general.name.localeCompare(a.general.name);
          }

          const category = sortOption.category as keyof DogType;
          const trait = sortOption.trait as keyof DogType[typeof category];
          if (sortOption.descending) {
            return b[category][trait] - a[category][trait];
          }
          return a[category][trait] - b[category][trait];
        });

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
          height="6rem"
        />
        <Dropdown
          options={SORT_OPTIONS.map((option) => getSortLabel(option))}
          selectedOption={sort}
          setSelectedOption={setSort}
        />
      </SearchContainer>
      <ContentContainer>
        <FilterContainer>
          <FilterContainerHeader>
            <FilterHeader>Filters</FilterHeader>
            <ClearAllButton
              onClick={() => {
                setSelectedLetters([]);
              }}
            >
              Clear all
            </ClearAllButton>
          </FilterContainerHeader>
          <Accordion title="Name">
            <NameContainer>
              {Array.from({ length: 26 }, (_, index) => (
                <NameItem
                  key={index}
                  $selected={selectedLetters.includes(
                    String.fromCharCode(65 + index)
                  )}
                  onClick={() => {
                    if (
                      selectedLetters.includes(String.fromCharCode(65 + index))
                    ) {
                      setSelectedLetters((prev) =>
                        prev.filter(
                          (letter) => letter !== String.fromCharCode(65 + index)
                        )
                      );
                    } else {
                      setSelectedLetters((prev) => [
                        ...prev,
                        String.fromCharCode(65 + index),
                      ]);
                    }
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </NameItem>
              ))}
            </NameContainer>
          </Accordion>
        </FilterContainer>
        <DogContainer>
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
        </DogContainer>
      </ContentContainer>
    </StyledBreedsPage>
  );
};

export default BreedsPage;
