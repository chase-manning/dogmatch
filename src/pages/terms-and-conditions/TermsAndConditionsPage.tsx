import styled from "styled-components";
import { Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";

const StyledTermsAndConditionsPage = styled.div`
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
    font-size: 6.2rem;
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
    text-align: center;
  }
`;

const TermsAndConditionsPage = () => {
  return (
    <StyledTermsAndConditionsPage>
      <Seo
        title="Terms and Conditions"
        description="Terms and Conditions of Dogmatch"
      />
      <Header>Terms and Conditions</Header>
      <SubHeader>1. Introduction</SubHeader>
      <Paragraph>
        Welcome to Dogmatch! Our website allows you to take a quiz to find the
        perfect dog breed match based on a variety of traits and preferences.
        This service is provided at no cost and is intended for use as is.
      </Paragraph>
      <SubHeader>2. Content on Dogmatch</SubHeader>
      <Paragraph>
        The information regarding dog breeds (including data and images) is
        sourced from the Open Dog Registry, which is covered under the MIT
        license. The website's design, HTML, CSS, and JavaScript are also
        open-source under the MIT license. Users may freely use and share this
        content in accordance with the terms of these licenses.
      </Paragraph>
      <SubHeader>3. Intellectual Property</SubHeader>
      <Paragraph>
        All intellectual property rights for the quiz algorithm, website design,
        and any other original content on Dogmatch are owned by us or licensed
        to us and are also protected under the MIT license.
      </Paragraph>
      <SubHeader>4. Use of the Website</SubHeader>
      <Paragraph>
        Users are invited to utilize our website and its contents for personal,
        non-commercial purposes. While we strive to provide valuable and
        accurate information, we make no guarantees regarding the suitability of
        any dog breed matched to you through our quiz.
      </Paragraph>
      <SubHeader>5. Prohibited Activities</SubHeader>
      <Paragraph>
        You are prohibited from engaging in activities that can cause harm to
        our website, such as attempting unauthorized access, distributing
        viruses, or conducting denial-of-service attacks.
      </Paragraph>
      <SubHeader>6. Reporting Issues</SubHeader>
      <Paragraph>
        If you encounter any issues or have concerns regarding the content or
        functionality of our website, please contact us via the form available
        in the footer section under "Say hi."
      </Paragraph>
      <SubHeader>7. Disclaimers</SubHeader>
      <Paragraph>
        Dogmatch is provided on an "as is" and "as available" basis. We
        expressly disclaim all warranties of any kind, whether express or
        implied, including, but not limited to, the implied warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
        We do not warrant that the website will always be uninterrupted, timely,
        secure, or error-free.
      </Paragraph>
      <SubHeader>8. Limitation of Liability</SubHeader>
      <Paragraph>
        You acknowledge that you are solely liable for any decisions that you
        make based on the information on this website. In no event shall we be
        liable to you for anything arising out of or in any way connected with
        your use of this website. We shall not be liable for any indirect,
        consequential, or special liability arising out of or in any way related
        to your use of this website.
      </Paragraph>
      <SubHeader>9. Changes to Terms and Conditions</SubHeader>
      <Paragraph>
        We reserve the right to modify these terms at any time. As there is no
        account system in place, we encourage you to review our terms
        periodically for any changes. Changes to these terms are effective when
        they are posted on this page.
      </Paragraph>
      <SubHeader>10. Governing Law</SubHeader>
      <Paragraph>
        These terms shall be governed by and construed in accordance with the
        laws of the United Kingdom, without regard to its conflict of law
        provisions.
      </Paragraph>
      <SubHeader>11. Contact Us</SubHeader>
      <Paragraph>
        For any questions or suggestions about our Terms and Conditions, please
        contact us through the form provided on our website.
      </Paragraph>
    </StyledTermsAndConditionsPage>
  );
};

export default TermsAndConditionsPage;
