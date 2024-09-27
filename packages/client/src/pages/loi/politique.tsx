import React from "react";
import * as S from "./loi.styled";
import { Typography } from "@mui/material";

const Politique: React.FC = () => {
  return (
    <S.MainContainer>
      <Typography variant="h3" sx={{ color: "primary.main", width: "100%" }}>
        Politique de confidentialité
      </Typography>
      <Typography variant="h4" sx={{ color: "primary.main", width: "100%" }}>
        Politique de protection des données à caractère personnel
      </Typography>
      <Typography variant="body1" sx={{ color: "primary.main", width: "100%" }}>
        1. Qui est le responsable de traitement ? Toutes les données que vous
        saisissez sur la billetterie en ligne du Parc Zoologique ZooAtipic sont
        collectées par : Parc Zoologique ZooAtipic.SA au capital social de
        €.Siège social : Paris 2. Quelles sont les données collectées ? Les
        informations que nous collectons nous aident à la création de comptes et
        à améliorer votre expérience sur la billetterie en ligne du Parc
        Zoologique de Thoiry. Les données à caractère personnel recueillies :
        Pour accéder à nos services, vous devez créer un compte. Dans ce cas,
        vous fournissez des informations personnelles telles que votre nom,
        votre adresse e-mail, votre numéro de téléphone, …Les professionnels
        fournissent aussi des informations de sociétés comme le numéro de TVA
        intracommunautaire, le numéro de Siret et le nom de la société. Les
        traitements liés à ces données : Les traitements ci-dessous sont
        nécessaires à l’exécution d’un contrat passé entre le Parc Zoologique
        ZooAtipic et ses clients pour l’accès au parc.– Gestion des comptes
        clients, des paniers d’achats et des dossiers (commandes).– Détection de
        fraudes pour permettre à une entité juridique adaptée de localiser le
        fraudeur et ainsi de protéger les comptes des utilisateurs contre une
        utilisation malveillante. 3. Quelles sont les finalités de ces
        traitements ? Les données liées à l’état civil (civilité, prénom, nom)
        sont collectées pour permettre à l’utilisateur d’avoir un affichage
        personnalisé lorsqu’il est connecté. Ces données servent notamment lors
        de l’impression de la facture pour qu’elle puisse être nominative. Elle
        permettent aussi de retrouver un dossier et de rééditer des billets en
        cas de perte par exemple.L’adresse mail est demandée pour permettre au
        client de se connecter et d’imprimer ses billets à tout moment depuis
        son espace personnel (menu « Votre Compte »), mais aussi pour la
        procédure de récupération de mot de passe qui nécessite une adresse
        mail.Les données postales ainsi que le nom de la société et le numéro de
        TVA intracommunautaire sont demandés pour des raisons légales de
        facturation et de comptabilité.Le numéro de téléphone est conservé pour
        une prise de contact rapide ou une information ponctuelle si nécessaire,
        en particulier par sms.L’adresse IP est stockée à des fins de protection
        contre la fraude et le piratage des comptes. Elle peut être utilisée à
        des fins juridiques. 4. Qui sont les destinataires des données ? Les
        données vous concernant sont stockées sur les serveurs internes du Parc
        Zoologique ZooAtipic. Elles sont exclusivement utilisées par le Parc
        Zoologique ZooAtipic. 5. Quels sont vos droits et comment les exercer ?
        Les personnes faisant l’objet du traitement de leur donnée personnelle
        disposent du droit : • D’accès aux données à caractère personnel, • De
        rectification, d’effacement de celles-ci (droit à l’oubli), à la
        limitation du traitement des données personnelles ou le droit de
        s’opposer au traitement, • À la portabilité des données, • De retirer
        son consentement à l’utilisation des données ou traitements facultatifs
        à tout instant, • De définir des directives relatives à la conservation,
        à l’effacement et à la communication des données à caractère personnel
        après le décès et de s’opposer au démarchage téléphonique en
        s’inscrivant sur la liste BLOCTEL. • Le droit d’introduire une
        réclamation auprès de la CNIL ou de l’Autorité de Contrôle du lieu de
        résidence. Le Client peut faire sa demande par mail
        à info@zooatipic.net.Un justificatif d’identité en cours de validité est
        susceptible d’être demandé. 6. Combien de temps mes données sont-elles
        conservées ? Vos données sont conservées jusqu’à ce que vous fassiez
        valoir votre droit à l’effacement qui vous permet d’effacer de nos bases
        de données toutes informations en lien avec vous.Nous devons cependant
        conserver certaines informations personnelles vous concernant pour
        respecter les diverses obligations légales et comptables. Les factures
        et commandes seront sauvegardés 10 ans. Après quoi, elles seront
        totalement supprimées. 7. Quelles sont les mesures de sécurité prises
        pour protéger mes données ? La société Parc Zoologique ZooAtipic, prend
        toutes les précautions utiles pour préserver la sécurité et la
        confidentialité des données et notamment, empêcher qu’elles soient
        déformées, endommagées, ou que des tiers non autorisés y aient accès.
        Aucun sous-traitant n’a accès à ces données.Nous faisons appel à un
        prestataire extérieur pour le paiement en ligne, il s’agit de PAYZEN.
        Nous ne disposons d’aucunes données liées à votre carte bancaire. La
        solution de paiement bancaire que nous vous proposons est sécurisée
        grâce au système normalisé de cryptage, le « protocole SSL » qui
        garantit qu’aucune information ne peut être interceptée par un tiers
        pendant la durée du traitement. 8. Utilisation des cookies La
        billetterie en ligne du Parc Zoologique ZooAtipic utilise des cookies
        pour mémoriser votre panier et pour assurer le bon fonctionnement du
        processus d’achat. Les cookies sont automatiquement supprimés à la
        fermeture du navigateur.
      </Typography>
    </S.MainContainer>
  );
};

export default Politique;
