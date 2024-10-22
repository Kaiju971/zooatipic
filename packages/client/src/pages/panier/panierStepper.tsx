import Panier from "./panier";
import Livraison from "./livraison";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Routes } from "../../app/routes";

import * as S from "./panierStepper.styled";
import Paiement from "./paiement";

const PanierStepper: React.FC = () => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState(0);
  const screensRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = (index: number) => {
    setActiveScreen(index + 1);
  };

  useEffect(() => {
    if (screensRef.current[activeScreen]) {
      screensRef.current[activeScreen]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeScreen]);

  return (
    <S.MainContainer>
      <div
        ref={(el) => (screensRef.current[0] = el)}
        style={{ height: "100vh" }}
      >
        <Panier onNext={() => handleNext(0)} />
      </div>

      {activeScreen > 0 && (
        <div
          ref={(el) => (screensRef.current[1] = el)}
          style={{ height: "100vh" }}
        >
          <Livraison onNext={() => handleNext(1)} />
        </div>
      )}

      {activeScreen >= 2 && (
        <div
          ref={(el) => (screensRef.current[2] = el)}
          style={{ height: "100vh" }}
        >
          <Paiement />
        </div>
      )}

      {activeScreen >= 3 && (
        <div
          ref={(el) => (screensRef.current[3] = el)}
          style={{ height: "100vh" }}
        >
          <h2>Screen 4: Fin</h2>
          <button onClick={() => navigate(Routes.accueil)}>Continue</button>
        </div>
      )}
    </S.MainContainer>
  );
};

export default PanierStepper;
