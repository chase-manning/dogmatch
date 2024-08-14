import styled from "styled-components";

import { Link } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";
import Logo from "./Logo";
import useDogs from "../app/use-dogs";
import levenshtein from "../app/levenshtein";
import { DogType } from "./DogContext";

interface NavItemType {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItemType[] = [
  {
    label: "dogmatch quiz",
    path: "quiz",
  },
  {
    label: "all dogs",
    path: "breeds",
  },
];

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
`;

const HeaderBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: calc(100% - 8rem);
  transform: translateX(-50%);
  border-bottom: solid 1px var(--sub);
`;

const NavItems = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10rem;
`;

const NavItem = styled(Link)`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--main);
`;

const SearchContainer = styled.div`
  position: relative;
`;

const Results = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: 1rem;
  background: var(--bg);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
`;

const Result = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  color: var(--main);
  padding: 1.5rem 2rem;
  background: var(--bg);

  &:hover {
    background: var(--bg-blue);
  }
`;

const Header = () => {
  const [searchValue, setSearchValue] = useState(""); // TODO
  const { dogs } = useDogs();

  const searchScore = (dog: DogType) => {
    const lowerSearchValue = searchValue.toLowerCase();
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
    dogs && searchValue
      ? dogs.sort((a, b) => searchScore(a) - searchScore(b)).slice(0, 5)
      : null;

  return (
    <StyledHeader>
      <Logo />

      <NavItems>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} to={item.path}>
            {item.label}
          </NavItem>
        ))}
      </NavItems>

      <HeaderBorder />
      <SearchContainer>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          placeholder="search"
          width="31rem"
        />
        {topResults && (
          <Results>
            {topResults.map((dog) => (
              <Result
                key={dog.id}
                to={`/breeds/${dog.id}`}
                onClick={() => setSearchValue("")}
              >
                {dog.generalInformation.name}
              </Result>
            ))}
          </Results>
        )}
      </SearchContainer>
    </StyledHeader>
  );
};

export default Header;
