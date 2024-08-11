import styled from "styled-components";

import searchIcon from "../assets/search.svg";

const StyledSearch = styled.div<{ width: string }>`
  border: solid 1px var(--light);
  border-radius: 1rem;
  padding: 0.7rem 1.4rem;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
`;

const Icon = styled.img`
  height: 2.4rem;
`;

const Input = styled.input`
  font-size: 2.4rem;
  font-weight: 400;
  height: 3rem;
  flex: 1;
  padding-left: 1rem;
  font-family: "Jost", sans-serif;
  color: var(--main);

  &::placeholder {
    color: var(--light);
  }
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  width: string;
}

const Search = ({ value, setValue, placeholder, width }: Props) => {
  return (
    <StyledSearch width={width}>
      <Icon src={searchIcon} alt="search" />
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </StyledSearch>
  );
};

export default Search;
