import styled from "styled-components";
import Logo from "./Logo";
import {
  API_CONTRIBUTE,
  DOGMATCH_CONTRIBUTE,
  DOGMATCH_LICENSE,
  DONATE,
} from "../app/links";
import { SAY_HI_PATH } from "../app/paths";
import { Link } from "react-router-dom";

interface LinkType {
  label: string;
  link: string;
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
      },
      {
        label: "Say hi 👋",
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
        link: "/privacy",
      },
      {
        label: "Terms of Service",
        link: "/terms",
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
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 160rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const SectionHeader = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SectionItem = styled(Link)`
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--main);
  text-decoration: none;
  cursor: pointer;
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
