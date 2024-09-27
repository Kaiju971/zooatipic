// import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import * as S from "./panier.styled";
import { getBasket } from "../../utils/basket";
import { Basket } from "../../types/panier";
import { useQuery } from "@tanstack/react-query";
import { CommandesReponse } from "../../types/commandes";
import { fetchCommande } from "../../api/fetchers/commande";

const Panier: React.FC = () => {
  const [dataPanier, setDataPanier] = useState<Basket[]>();

  useEffect(() => {
    setDataPanier(getBasket());
  }, []);

  // const {
  //   data: commandesdata,
  //   isLoading,
  //   isError,
  // } = useQuery<CommandesReponse>({
  //   params: {data: dataPanier},
  //   queryKey: ["createcommande"],
  //   queryFn: fetchCommande,
  // });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <S.Page variant="h1">PANIER</S.Page>
      <S.Title>Liste du panier</S.Title>

      {dataPanier?.map((item) => (
        <div key={item.id_article}>
          {item.id_article}
          <br />
          {item.article}
          <br />
          {item.prix}
          <br />
          {item.quantité}
          <br />
        </div>
      ))}
    </S.MainContainer>
  );
};

export default Panier;
