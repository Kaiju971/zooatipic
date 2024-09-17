// // import {  useMediaQuery } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import ifaw from "../images/ifaw.png";
// import spa from "../images/SPA.png";
// import wwf from "../images/WWF.png";
// import hirobot from "../images/hi-robot.gif";

// // import { Helmet } from "react-helmet";
// // import { useLocation } from "react-router-dom";
// // import { Routes } from "../app/appRoutes";
// // import { theme } from "../../app/app";
// import React from "react";

// import * as S from "./footer.styled";
// import { Typography, useMediaQuery } from "@mui/material";
// import { theme } from "../app/app";
// // import { useNavigate } from "react-router";
// // import { Route, Routes } from "react-router";

// const getCurrentYear = (): number => {
//   const currentDate = new Date();
//   return currentDate.getFullYear();
// };

// const Footer: React.FC = () => {
//   // const navigate = useNavigate();
//   // const location = useLocation();
//   const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

//   // if (location.pathname === Routes.cartproduit) {
//   //   return null;
//   // }

//   return (
//     <S.MainContainer>
//       {/* <Helmet>
//         <title>ZooAtipic</title>
//         <meta
//           name="ZOO ATIPIC"
//           content="Parc animalier"
//         />
//         <meta
//           name="email, sponsor,copyright - ZooAtipic"
//           content="zoo"
//         />
//       </Helmet> */}
//       <Grid
//         container
//         sx={{
//           " & .MuiGrid-root": {
//             padding: 0,
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignItems: "center",
//           },
//         }}
//       >
//         <Grid xs={1.5}>
//           <S.Item>
//             <S.ImgContainer>
//               <img src={ifaw} alt="ifaw" width="70%" />
//             </S.ImgContainer>
//           </S.Item>
//         </Grid>
//         <Grid xs={1.5}>
//           <S.Item>
//             <S.ImgContainer>
//               <img src={wwf} alt="wwf" width="70%" />
//             </S.ImgContainer>
//           </S.Item>
//         </Grid>
//         <Grid xs={1.5}>
//           <S.Item>
//             <S.ImgContainer>
//               <img src={spa} alt="spa" width="60%" />
//             </S.ImgContainer>
//           </S.Item>
//         </Grid>
//         <Grid xs={2.5}>
//           <S.TextContainer>
//             <Typography
//               variant="h4"
//               sx={{ color: "primary.main", width: "100%" }}
//             >
//               CONTACT
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{ color: "primary.main", width: "100%" }}
//             >
//               informations générales:
//               <br />
//               info@zooatipic.net
//             </Typography>
//           </S.TextContainer>
//         </Grid>
//         <Grid xs={2}>
//           <S.Robot src={hirobot} alt="chatbot" />
//         </Grid>
//       </Grid>
//       <Grid
//         // onClick={() => navigate(Routes.vente)}
//         container
//         sx={{
//           " & .MuiGrid-root": {
//             paddingTop: 1,
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignItems: "center",
//           },
//         }}
//       >
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             Mentions légales
//           </Typography>
//         </Grid>
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             CGV Billetterie
//           </Typography>
//         </Grid>
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             CGV Hébergement
//           </Typography>
//         </Grid>
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             Règlement Intérieur
//           </Typography>
//         </Grid>
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "10%" }}
//           >
//             FAQ
//           </Typography>
//         </Grid>
//         <Grid xs={1.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             Politique de Confidentialité
//           </Typography>
//         </Grid>
//         <Grid xs={2.5}>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", width: "100%" }}
//           >
//             © {getCurrentYear()} ZooAtipic. {mediumScreen && <br />} Tous Droits
//             Réservés.
//           </Typography>
//         </Grid>
//       </Grid>
//     </S.MainContainer>
//   );
// };

// export default Footer;

// import {  useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import ifaw from "../images/ifaw.png";
import spa from "../images/SPA.png";
import wwf from "../images/WWF.png";
import hirobot from "../images/hi-robot.gif";

// import { Helmet } from "react-helmet";
// import { useLocation } from "react-router-dom";
// import { Routes } from "../../app/routes";
// import { theme } from "../../app/app";
import React from "react";

import * as S from "./footer.styled";
import { Typography, useMediaQuery } from "@mui/material";
import { theme } from "../app/app";

const getCurrentYear = (): number => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

const Footer: React.FC = () => {
  // const location = useLocation();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // if (location.pathname === Routes.cartproduit) {
  //   return null;
  // }

  return (
    <S.MainContainer>
      {/* <Helmet>
        <title>ABS Couverture</title>
        <meta
          name="ABS Couverture"
          content="Entreprise générale de couverture"
        />
        <meta
          name="téléphone, email, logo, adresse, copyright - ABS Couverture"
          content="Entreprise générale de couverture"
        />
      </Helmet> */}
      <Grid
        container
        sx={{
          " & .MuiGrid-root": {
            padding: 0,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          },
        }}
      >
        <Grid item xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={ifaw} alt="ifaw" width="70%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid item xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={wwf} alt="wwf" width="70%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid item xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={spa} alt="spa" width="60%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid item xs={2.5}>
          <S.TextContainer>
            <Typography
              variant="h4"
              sx={{ color: "primary.main", width: "100%" }}
            >
              CONTACT
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "primary.main", width: "100%" }}
            >
              informations générales:
              <br />
              info@zooatipic.net
            </Typography>
          </S.TextContainer>
        </Grid>
        <Grid item xs={2}>
          <S.Robot src={hirobot} alt="chatbot" />
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ color: "primary.main", width: "100%" }}>
        © {getCurrentYear()} ZooAtipic. {mediumScreen && <br />} Tous Droits
        Réservés.
      </Typography>
    </S.MainContainer>
  );
};

export default Footer;
