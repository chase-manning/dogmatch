import styled from "styled-components";
import Button from "../../components/Button";
import { Header3 } from "../../styles/Headers";
import Seo from "../../components/Seo";

const StyledSayHiPage = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  h3 {
    margin-bottom: 2rem;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Input = styled.input`
  font-size: 2.4rem;
  font-weight: 400;
  height: 3rem;
  flex: 1;
  font-family: "Jost", sans-serif;
  color: var(--main);
  border: solid 1px var(--light);
  border-radius: 1rem;
  padding: 0.7rem 1.4rem;
  display: flex;
  align-items: center;
  width: 60rem;

  &::placeholder {
    color: var(--light);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StyledTextArea = styled.textarea`
  font-size: 2.4rem;
  font-weight: 400;
  height: 3rem;
  flex: 1;
  font-family: "Jost", sans-serif;
  color: var(--main);
  border: solid 1px var(--light);
  border-radius: 1rem;
  padding: 0.7rem 1.4rem;
  display: flex;
  align-items: center;
  width: 60rem;

  &::placeholder {
    color: var(--light);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SayHiPage = () => {
  return (
    <StyledSayHiPage>
      <Seo
        title="Say Hi"
        description="Contact us through this form to say hi!"
      />
      <StyledForm action="https://formspree.io/f/mrbzknqg" method="POST">
        <Header3>Say Hi 👋</Header3>
        <Input type="email" name="email" placeholder="Your email" />
        <StyledTextArea name="message" placeholder="Your message" rows={5} />
        <Button wide submit>
          Send
        </Button>
      </StyledForm>
    </StyledSayHiPage>
  );
};

export default SayHiPage;
