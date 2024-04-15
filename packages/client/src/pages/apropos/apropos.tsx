import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingSection from "../../components/connexion/LoadingSection";
// import FlipCard from "../../components/flipCard/flipCard";
import imgCharpente from "../../images/Peau de girafe.png";
import imgFaconnage from "../../images/_082f2876-d440-4e29-96fb-f9aa7fc45922.jpg";
import imgFenetre from "../../images/_14a87201-9d6a-4823-b8a8-369a13e7e60d.jpg";
import imgEntretien from "../../images/_de50ab7d-f314-4a12-bf9e-a858867df3cf.jpg";

import * as S from "./apropos.styled";
// import { Routes } from "../../app/routes";

const Apropos: React.FC = () => {
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un délai de chargement (par exemple, 2 secondes) pour le formulaire
    const formLoadingTimeout = setTimeout(() => {
      setFormLoading(false);
    }, 2000);

    // Nettoyer les timeouts lorsqu'un composant est démonté
    return () => {
      clearTimeout(formLoadingTimeout);
    };
  }, []);

  return (
    <div>
      {formLoading ? (
        <LoadingSection />
      ) : (
        <S.MainContainer>
          <Helmet>
            <title>A propos de nous</title>
            <meta
              name="A propos de nous - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="Dépannage, Entretien, Charpente ossature bois, Pose de fenêtre de toit - ABS Couverture"
              content="Entreprise générale de couverture"
            />
          </Helmet>
          <S.Container>
            {/* <FlipCard
              couleurDeFront="red"
              couleurDeBack="red"
              couleurDePolice="white"
              frontContent="POSE DE FENETRE DE TOIT"
              backContent="Nous posons des Fenêtre là où vous souhaitez pour plus de clarté "
              linkToPages={Routes.produits}
            /> */}
            <S.BannerContainer imageUrl={imgFenetre} />
          </S.Container>
          <S.Container>
            <S.BannerContainer imageUrl={imgCharpente} />
            {/* <FlipCard
              couleurDeFront="White"
              couleurDeBack="white"
              couleurDePolice="darkred"
              frontContent="CHARPENTE OSSATURE BOIS"
              backContent="Nous réalisons aussi bien de la charpente intérieur qu’exterieur"
              linkToPages={Routes.produits}
            /> */}
          </S.Container>
          <S.Container>
            {/* <FlipCard
              couleurDeFront="black"
              couleurDeBack="black"
              couleurDePolice="white"
              frontContent="ENTRETIEN / DEPANNAGE"
              backContent="Une tempête, les tuiles se sont envolées. Appelez-nous."
              linkToPages={Routes.produits}
            /> */}
            <S.BannerContainer imageUrl={imgEntretien} />
          </S.Container>
          <S.Container>
            <S.BannerContainer imageUrl={imgFaconnage} />
            {/* <FlipCard
              couleurDeFront="rougeFoncé"
              couleurDeBack="rougeFoncé"
              couleurDePolice="white"
              frontContent="FACONNAGE"
              backContent="Façonnage Tel un grand couturié nous faisons du sur mesure"
              linkToPages={Routes.façonnage}
            /> */}
          </S.Container>
        </S.MainContainer>
      )}
    </div>
  );
};

export default Apropos;
