import styled from "styled-components";
import Logo from "./Logo";
import {
  API_CONTRIBUTE,
  DOGMATCH_CONTRIBUTE,
  DOGMATCH_LICENSE,
  DONATE,
} from "../app/links";
import {
  PRIVACY_POLICY_PATH,
  SAY_HI_PATH,
  TERMS_AND_CONDITIONS_PATH,
} from "../app/paths";
import { Link } from "react-router-dom";
import triggerEvent, { DONATE_EVENT } from "../app/trigger-event";

interface LinkType {
  label: string;
  link: string;
  event?: string;
}

interface SectionType {
  header: string;
  items: LinkType[];
}

const SECTIONS: SectionType[] = [
  {
    header: "Support dogmatch",
    items: [
      {
        label: "Buy us a coffee",
        link: DONATE,
        event: DONATE_EVENT,
      },
      {
        label: "Say hi",
        link: SAY_HI_PATH,
      },
    ],
  },
  {
    header: "Contribute",
    items: [
      {
        label: "Contribute to Website",
        link: DOGMATCH_CONTRIBUTE,
      },
      {
        label: "Contribute to API",
        link: API_CONTRIBUTE,
      },
    ],
  },
  {
    header: "Boring legal stuff",
    items: [
      {
        label: "Privacy Policy",
        link: PRIVACY_POLICY_PATH,
      },
      {
        label: "Terms & Conditions",
        link: TERMS_AND_CONDITIONS_PATH,
      },
      {
        label: "License",
        link: DOGMATCH_LICENSE,
      },
    ],
  },
];

const StyledFooter = styled.div`
  width: 100%;
  padding: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-blue);

  @media (max-width: 900px) {
    padding: 6rem 4rem;
  }

  @media (max-width: 388px) {
    padding: 4rem 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 160rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;

    :last-child {
      border: none;
    }
  }
`;

const SectionHeader = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const SectionItem = styled(Link)`
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--main);
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 900px) {
    font-size: 2.2rem;
    border-right: solid 1.5px var(--main);
    padding-right: 1rem;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <Section>
          <Logo />
        </Section>
        {SECTIONS.map((section) => (
          <Section key={section.header}>
            <SectionHeader>{section.header}</SectionHeader>
            {section.items.map((item) => {
              const isInternalLink =
                !item.link.startsWith("http") &&
                !item.link.startsWith("mailto");
              return (
                <SectionItem
                  key={item.label}
                  to={item.link}
                  target={isInternalLink ? "" : "_blank"}
                  onClick={() => {
                    if (item.event) triggerEvent(item.event);
                  }}
                >
                  {item.label}
                </SectionItem>
              );
            })}
          </Section>
        ))}
      </Content>
    </StyledFooter>
  );
};

export default Footer;
