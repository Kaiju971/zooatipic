import React, { useState, useEffect } from "react";
import DevisForm from "../../components/contact/devisForm";
import MapComponent from "../../components/map/localisationMap";
import * as S from "./contact.styled";
import * as SI from "../../components/banner/banner.styled";
import LoadingSection from "../../components/connexion/LoadingSection";
import Banner from "../../components/banner/Banner";
import imgVehicule from "../../images/vehiculeABS.jpg";
import InfoEntreprise from "../../components/infoEntreprise/infoEntreprise";
import { Helmet } from "react-helmet";

const Contact: React.FC = () => {
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
            <title>Nous contacter</title>
            <meta
              name="Nous contacter - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="Nos horaires, devis, géolocalisation, téléphone, email, logo, adresse - ABS Couverture"
              content="Entreprise générale de couverture"
            />
          </Helmet>
          <Banner />
          <S.FlexContainer>
            <MapComponent />
            <S.Texte>
              <div style={{ width: "100%" }}>
                <SI.BannerContainer imageUrl={imgVehicule}>
                  <SI.Overlay />
                  <SI.TitleContainer>
                    <h3>
                      Nous nous déplaçons <br /> partout en ile de France
                    </h3>
                  </SI.TitleContainer>
                </SI.BannerContainer>
              </div>
            </S.Texte>
          </S.FlexContainer>
          <S.FlexContainer>
            <S.InerContainer>
              <InfoEntreprise />
            </S.InerContainer>
            <S.InerContainer>
              <DevisForm />
            </S.InerContainer>
          </S.FlexContainer>
        </S.MainContainer>
      )}
    </div>
  );
};

export default Contact;
