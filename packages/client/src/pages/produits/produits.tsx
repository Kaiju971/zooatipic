import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  CircularProgress,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CartProduits from "./cartProduits";
import useApiServce from "../../hooks/service/useAPIservice";
import { Categorie, ProduitWithPhoto } from "../../types/produits";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LoadingSection from "../../components/connexion/LoadingSection";
import { Helmet } from "react-helmet";

import * as S from "./produits.styled";

type ProduitFilter = {
  titre: string;
  id_categorie: number;
};

type Filter = {
  selectedProduit: string;
  selectedProduitsId: number[];
  selectedCategorie: string;
  selectedCategorieId: number;
};

const Produits: React.FC = () => {
  const { request, setError } = useApiServce();
  const [categoriedata, setCategoriedata] = useState<Categorie[]>([]);
  const [produitdata, setProduitdata] = useState<ProduitWithPhoto[]>([]);
  const [produitdataDistinct, setProduitdataDistinct] = useState<string[]>([]);
  const [produitdataDistCategorie, setProduitdataDistCategorie] = useState<
    ProduitFilter[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<string>(""); //titre
  const [selectedCategorieId, setSelectedCategorieId] = useState<number>(-1);
  const [selectedProduit, setSelectedProduit] = useState<string>(""); //titre
  const [selectedProduitsId, setSelectedProduitsId] = useState<number[]>();
  const [filter, setFilter] = useState<Filter>({
    selectedProduit: "",
    selectedProduitsId: [],
    selectedCategorie: "",
    selectedCategorieId: 0,
  });

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

  useEffect(() => {
    const userFilter = localStorage.getItem("filter");
    if (userFilter) {
      const filerData = JSON.parse(userFilter);
      setSelectedCategorie(filerData.selectedCategorie);
      setSelectedCategorieId(filerData.selectedCategorieId);
      setSelectedProduit(filerData.selectedProduit);
      setSelectedProduitsId(filerData.selectedProduitsId);
      setFilter({
        ...filter,
        selectedCategorie: filerData.selectedCategorie,
        selectedCategorieId: filerData.selectedCategorieId ?? -1,
        selectedProduit: filerData.selectedProduit,
        selectedProduitsId: filerData.selectedProduitsId ?? [],
      });
    }
  }, [filter]);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target?.name === "categorie" && categoriedata !== undefined) {
      setSelectedCategorie(event.target?.value);
      const selectedItem = categoriedata.find(
        (item) => item.categorie === event.target?.value
      );
      const selectedId = selectedItem?.id;
      setSelectedCategorieId(selectedId ?? -1);

      setFilter({
        ...filter,
        selectedCategorie: event.target?.value,
        selectedCategorieId: selectedId ?? -1,
      });
    }
    if (event.target?.name === "produit" && produitdata !== undefined) {
      setSelectedProduit(event.target?.value);

      const selectedItems = produitdata.filter(
        (item) => item.titre === event.target?.value
      );

      const selectedIdArray = Array.from(
        new Set(selectedItems?.map((item) => item.id))
      );
      setSelectedProduitsId(selectedIdArray);
      setFilter({
        ...filter,
        selectedProduit: event.target?.value,
        selectedProduitsId: selectedIdArray ?? [],
      });
    }
  };

  useEffect(() => {
    if (
      filter &&
      (filter.selectedCategorie !== "" || filter.selectedProduit !== "")
    ) {
      localStorage.setItem("filter", JSON.stringify(filter));
    } else if (filter.selectedCategorie === "" && filter.selectedProduit === "")
      localStorage.removeItem("filter");
  }, [filter, selectedProduit, selectedCategorie]);

  const setHiddenCategorie = (item: Categorie) => {
    return (
      (selectedCategorieId !== -1 && item.id !== selectedCategorieId) ||
      selectedProduit !== ""
    );
  };

  const setHiddenProduit = (item: ProduitWithPhoto) => {
    return (
      (selectedProduit !== "" && !selectedProduitsId?.includes(item.id)) ||
      selectedProduit === ""
    );
  };

  const removeFilter = (name: string) => {
    if (name === "categorie") {
      setSelectedCategorie("");
      setSelectedCategorieId(-1);
      setFilter({
        ...filter,
        selectedCategorie: "",
        selectedCategorieId: -1,
      });
    }
    if (name === "produit") {
      setSelectedProduit("");
      setSelectedProduitsId([]);
      setFilter({
        ...filter,
        selectedProduit: "",
        selectedProduitsId: [],
      });
    }
  };

  const handleDrawer = (action: boolean) => {
    setOpen(action);
  };

  useEffect(() => {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      request("GET", `categorieswithphotos`, params, setCategoriedata);
    } catch (error: any) {
      setError(error.message || error);
    }
  }, [request, setError]);

  useEffect(() => {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      request("GET", `categorieproduitimage`, params, setProduitdata);
    } catch (error: any) {
      setError(error.message || error);
    }
  }, [request, setError]);

  useEffect(() => {
    if (produitdata) {
      const uniqueTitres: string[] = Array.from(
        new Set(produitdata.map((item) => item.titre))
      ).sort();

      setProduitdataDistinct(uniqueTitres);

      const uniqueValues: { titre: string; id_categorie: number }[] =
        Array.from(
          new Set(
            produitdata.map((item) =>
              JSON.stringify({
                titre: item.titre,
                id_categorie: item.id_categorie,
              })
            )
          ),
          (item) => JSON.parse(item)
        ).filter((el) => el.id_categorie !== 10);

      setProduitdataDistCategorie(uniqueValues);
    }
  }, [produitdata]);

  return (
    <div>
      {formLoading ? (
        <LoadingSection />
      ) : (
        <S.MainContainer>
          <Helmet>
            <title>page Nous réalisons</title>
            <meta
              name="Nous réalisons - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="produits - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="catégorie - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="Tuiles, Bardage, Plomb, Ardoises, Isolations, Zinc, Cuivre, Acier, Charpente - ABS Couverture"
              content="Entreprise générale de couverture"
            />
            <meta
              name="Canals, Plates, Mécaniques, Ardoises, Métal, Bois, Couvertures, Bandeaux, Balcons, Toutes toitures, Isolant mince, Laine de verre, Terrassons traditionnel, Toiture ceintrées, Joint-debout - ABS Couverture"
              content="Entreprise générale de couverture"
            />
          </Helmet>
          <CssBaseline />
          <S.Drawer variant="permanent" open={open}>
            <S.DrawerHeader>
              <IconButton onClick={() => handleDrawer(open ? false : true)}>
                <KeyboardDoubleArrowLeftIcon
                  fontSize="large"
                  color="secondary"
                />
              </IconButton>
            </S.DrawerHeader>
            <Divider />
            <List>
              <S.ListItemButtonContainer
                open={open}
                onClick={() => handleDrawer(true)}
              >
                <Typography
                  variant="h2"
                  color="secondary.main"
                  letterSpacing="20px"
                  sx={{
                    gridColumn: { xs: "1", md: "1 / span 2" },
                    textShadow: " 3px 3px 3px #9c050593,4px 4px 4px black",
                    transition: "all 1s",
                    color: "secondary.main",
                  }}
                >
                  Filtre
                </Typography>
              </S.ListItemButtonContainer>
              <ListItem
                disablePadding
                alignItems="center"
                sx={{
                  opacity: open ? 1 : 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  letterSpacing="4px"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "12vw",
                    color: "secondary.main",
                  }}
                >
                  categorie:
                  <CloseIcon
                    sx={{ color: "secondary.main", cursor: "pointer" }}
                    onClick={() => removeFilter("categorie")}
                  />
                </Typography>

                <br />
                <TextField
                  variant="standard"
                  select
                  type="text"
                  fullWidth
                  name="categorie"
                  value={selectedCategorie}
                  onChange={(e) => onInputChange(e)}
                  sx={{
                    display: open ? "block" : "none",
                    textAlign: "center",
                    width: "12vw",
                  }}
                >
                  {categoriedata
                    ?.filter((el) => el.categorie !== "Services")
                    .map((item, index) => (
                      <MenuItem
                        key={item.id * index * 0.1}
                        value={item.categorie}
                      >
                        {item.categorie}
                      </MenuItem>
                    ))}
                </TextField>
                <br />
                <br />
                <Typography
                  variant="h4"
                  letterSpacing="4px"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "12vw",
                    color: "secondary.main",
                  }}
                >
                  produit:
                  <span> </span>
                  <CloseIcon
                    sx={{ color: "secondary.main", cursor: "pointer" }}
                    onClick={() => removeFilter("produit")}
                  />
                </Typography>
                <TextField
                  variant="standard"
                  select
                  type="text"
                  fullWidth
                  name="produit"
                  value={selectedProduit}
                  onChange={(e) => onInputChange(e)}
                  sx={{
                    display: open ? "block" : "none",
                    textAlign: "center",
                    width: "12vw",
                  }}
                >
                  {selectedCategorie
                    ? produitdataDistCategorie
                        ?.filter(
                          (el) => el.id_categorie === selectedCategorieId
                        )
                        .map((item, index) => (
                          <MenuItem
                            key={index * item.id_categorie}
                            value={item.titre}
                          >
                            {item.titre}
                          </MenuItem>
                        ))
                    : produitdataDistinct.map((item, index) => (
                        <MenuItem key={index * 0.023} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                </TextField>
              </ListItem>
            </List>
          </S.Drawer>
          <S.Main open={open}>
            <S.BreadcrumbsContainer>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<DoubleArrowIcon fontSize="small" color="primary" />}
              >
                <Link underline="hover" color="inherit" href="/">
                  <Typography variant="body2" color="primary.main">
                    Accueil
                  </Typography>
                </Link>
                <Typography variant="body2">Produits</Typography>
              </Breadcrumbs>
            </S.BreadcrumbsContainer>
            <Typography
              variant="subtitle1"
              sx={{
                gridColumn: { xs: "1", md: "1 / span 2" },
                textShadow: " 3px 3px 3px #9c050593,4px 4px 4px black",
                transition: "all 1s",
                color: "colorGris.main",
              }}
            >
              Nous réalisons
            </Typography>
            <S.GridContainer>
              {!categoriedata ? (
                <CircularProgress />
              ) : (
                categoriedata
                  .filter((el) => el.categorie !== "Services")
                  .map((item, index) => (
                    <CartProduits
                      key={item.id * index * 0.61}
                      element={item}
                      hidden={setHiddenCategorie(item)}
                    />
                  ))
              )}
            </S.GridContainer>
            <S.GridContainer>
              {!produitdata ? (
                <CircularProgress />
              ) : selectedCategorie ? (
                produitdata
                  .filter(
                    (el) =>
                      el.categorie !== "Services" &&
                      el.categorie === selectedCategorie
                  )
                  .map((item, index) => (
                    <CartProduits
                      key={item.id + index * 7.3}
                      elProduit={item}
                      hidden={setHiddenProduit(item)}
                    />
                  ))
              ) : (
                produitdata
                  .filter((el) => el.categorie !== "Services")
                  .map((item, index) => (
                    <CartProduits
                      key={item.id + index * 7.3}
                      elProduit={item}
                      hidden={setHiddenProduit(item)}
                    />
                  ))
              )}
            </S.GridContainer>
          </S.Main>
        </S.MainContainer>
      )}
    </div>
  );
};

export default Produits;
