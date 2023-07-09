import { FC, ReactNode, useState } from "react";
import { Container } from "../../common/Container/Container";
import { Footer } from "../Footer/Footer";
import { Logotype } from "../../../assets/icons";

interface IPageTemplate {
  children?: ReactNode;
}

export const PageTemplate: FC<IPageTemplate> = ({ children }) => (
  <>
    
    <Container>
      {children}
      <Footer />
    </Container>
  </>
);
