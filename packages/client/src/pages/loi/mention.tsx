import React from "react";
import * as S from "./loi.styled";
import { Typography } from "@mui/material";

const Mention: React.FC = () => {
  return (
    <S.MainContainer>
      <Typography variant="h3" sx={{ color: "primary.main", width: "100%" }}>
        Mentions légales
      </Typography>
      <Typography variant="body1" sx={{ color: "primary.main", width: "100%" }}>
        Le site ZooAtipic.fr est édité et exploité par la société par
        KRAKENDCODE (Parc Zoologique et de Loisirs de ZooAtipic), Siège social :
        Paris, Paris 75008immatriculée au RCS Versailles Site enregistrée à la
        CNIL sous le numéro Directeur Général : Xavier GUSTAVEWebmaster : Tina
        SEMASHKO et Xavier GUSSTAVETéléphone : +33(0)1 00 00 00 00Email : par
        formulaireHébergement : O2switchEn consultant ce site vous acceptez
        les conditions d’utilisation décrites ci-dessous. La société KRAKENDCODE
        se réserve le droit de modifier ces conditions à tout moment sans
        préavis. Conception et développement Agence digitale KRAKENDCODE
        Copyright La loi française du 11 mars 1957 n’autorise, aux termes des
        alinéas 2 et 3 de l’article 41, d’une part, que les « copies ou
        reproductions strictement réservées à l’usage privé du copiste et non
        destinées à une utilisation collective » et, d’autre part, que les
        analyses et les courtes citations dans un but d’exemple et
        d’illustration (« toute représentation ou reproduction intégrale, ou
        partielle, faite sans le consentement de l’auteur ou de ses ayants droit
        ou ayants cause, est illicite » – alinéa 1er de l’article 40). Toute
        représentation ou reproduction abusive du site ZooAtipic.fr, par quelque
        procédure que ce soit, constituerait donc une contrefaçon sanctionnée
        par les articles 425 et suivants du Code pénal. Les textes mis en lignes
        sur le site ZooAtipic.fr, sauf mentions particulières, sont la propriété
        intellectuelle et légale de son auteur. Sauf accord express, le site
        ZooAtipic.fr n’autorise que la reproduction du titre des articles
        produits et non du texte qui l’accompagne (résumé du sommaire ou début
        de l’article) avec un lien direct sur le site de ZooAtipic.net
        (https://www.ZooAtipic.fr sans utiliser de frame ou de redirection). Les
        liens présents sur ce site peuvent orienter l’utilisateur sur des sites
        extérieurs dont le contenu ne peut en aucune manière engager la
        responsabilité de la rédaction du site ZooAtipic.fr « ZooAtipic » est
        une marque déposée. Respect de la vie privée et des données personnelles
        ZooAtipic.fr ne garde aucune donnée qui vous concerne, mais fait usage
        de cookies dans l’exploitation de son site internet. Ils ont pour but de
        signaler votre passage sur notre site. Les informations relatives à
        votre visite ne sont stockées que pour permettre les traitements
        statistiques. Ils nous permettent d’améliorer les fonctionnalités et les
        informations fournies par notre site pour mieux répondre à vos besoins.
        Ils ne sont en aucun cas cédés à des tiers. Conformément à la loi
        Informatique et Libertés en date du 6 janvier 1978, vous disposez d’un
        droit d’accès, de rectification, de modification et de suppression
        concernant les données qui vous concernent. Vous pouvez exercer ce droit
        en envoyant un courrier à l’adresse suivante : info@zooatipic.net
      </Typography>
    </S.MainContainer>
  );
};

export default Mention;
