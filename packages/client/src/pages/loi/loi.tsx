import React from "react";
import { Loi } from "../../types/loi";
import { useQuery } from "@tanstack/react-query";
import { fetchLoi } from "../../api/fetchers/getLoi";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";

import * as S from "./loi.styled";

interface ReponseData {
  results: Loi[];
}

const LoiTextes: React.FC = () => {
  const { titreLoi } = useParams<{ titreLoi: string }>(); // Récupération du paramètre dynamique

  const {
    data: loidata,
    isLoading,
    isError,
  } = useQuery<ReponseData>({
    queryKey: ["getloi", titreLoi],
    queryFn: () => fetchLoi({ titreLoi: titreLoi ?? "" }),
    enabled: !!titreLoi,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <S.Title variant="h1">{loidata?.results[0].titre_loi}</S.Title>

      <ReactMarkdown>
        {loidata?.results && loidata.results[0].texte_loi}
      </ReactMarkdown>
    </S.MainContainer>
  );
};

export default LoiTextes;
