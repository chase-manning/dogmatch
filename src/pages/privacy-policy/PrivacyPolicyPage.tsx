import styled from "styled-components";
import { Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";

const StyledPrivacyPolicyPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  padding: 10rem 3rem;
  max-width: 120rem;
  margin: auto;
  gap: 2rem;
`;

const Header = styled.h1`
  font-size: 9.6rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 6rem;
  }
`;

const SubHeader = styled.h2`
  font-size: 4rem;
  font-weight: 650;
  width: 100%;
  margin-top: 3rem;

  @media (max-width: 900px) {
    font-size: 3.2rem;
    font-weight: 600;
  }
`;

const PrivacyPolicyPage = () => {
  return (
    <StyledPrivacyPolicyPage>
      <Seo title="Privacy Policy" description="Privacy Policy of Dogmatch" />
      <Header>Privacy Policy</Header>
      <SubHeader>1. Introduction</SubHeader>
      <Paragraph>
        Welcome to Dogmatch! We are committed to protecting your privacy while
        you find your dream dog through our quiz. This privacy policy explains
        our practices regarding the use of cookies and Google Analytics on our
        website.
      </Paragraph>
      <SubHeader>2. Cookies</SubHeader>
      <Paragraph>
        We use cookies to enhance your experience on our site. These cookies are
        strictly used to save your quiz progress locally on your browser. This
        allows us to restore your quiz results if you refresh the page or return
        later. No personal data is collected through these cookies.
      </Paragraph>
      <SubHeader>3. Google Analytics</SubHeader>
      <Paragraph>
        Dogmatch uses Google Analytics to collect anonymized and aggregated data
        about how users interact with our website. This includes general
        analysis of site visits and high-level demographic information. We do
        not collect personal information through Google Analytics.
      </Paragraph>
      <SubHeader>4. No Personal Data Collection</SubHeader>
      <Paragraph>
        We do not collect any personal information from our users (except if you
        you have given us your email address on the "Say hi" page). Therefore,
        there is no need for user consent regarding data collection, and there
        are no data security risks associated with personal data.
      </Paragraph>
      <SubHeader>5. Changes to This Policy</SubHeader>
      <Paragraph>
        Since we do not collect personal information, we will not notify users
        of changes to our privacy policy through direct communication. We
        encourage users to revisit this policy periodically to stay informed of
        any updates.
      </Paragraph>
      <SubHeader>6. Contact Us</SubHeader>
      <Paragraph>
        If you have any questions or concerns about our privacy practices,
        please feel free to reach out to us via the "Say hi" page accessible
        through the footer of our website.
      </Paragraph>
      <SubHeader>7. No Age Restrictions</SubHeader>
      <Paragraph>
        Dogmatch does not have age restrictions and is accessible to users of
        all ages, as we do not collect personal data.
      </Paragraph>
    </StyledPrivacyPolicyPage>
  );
};

export default PrivacyPolicyPage;
