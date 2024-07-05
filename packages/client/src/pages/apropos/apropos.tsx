import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import LoadingSection from "../../components/formConnexion/LoadingSection";



import * as S from "./apropos.styled";


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
          {/* <Helmet>
            <title>A propos de nous</title>
            <meta
              name="A propos de nous - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="Dépannage, Entretien, Charpente ossature bois, Pose de fenêtre de toit - ABS Couverture"
              content="Entreprise générale de couverture"
            />
          </Helmet> */}
          
          
         
          
        </S.MainContainer>
      )}
    </div>
  );
};

export default Apropos;
