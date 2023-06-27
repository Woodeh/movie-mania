import { FC, ReactNode, useState } from 'react';
import { Container } from '../Container/Container';
import { Footer } from '../Footer/Footer';
import { Logotype } from '../../assets/icons';



interface IPageTemplate {
    children?: ReactNode
}



export const PageTemplate: FC<IPageTemplate> = ({children}) => (



    <>
<div className="mainLogo">
      <Logotype/>
      <div className="logo-title">MovieMania</div>
      </div>
        <Container>
            
            {children}
            <Footer />
        </Container>
    </>
)
function handleFilterMovie(): void {
    throw new Error('Function not implemented.');
}

function handleMoveMain(): void {
    throw new Error('Function not implemented.');
}


function handleTitleFilm(newValue: string): void {
    throw new Error('Function not implemented.');
}

