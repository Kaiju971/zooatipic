import { IconButton, makeStyles } from "@material-ui/core";
import * as S from "./scrollButton.styled";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCallback, useEffect, useState } from "react";

interface ScrollButtonProps {
  showBelow?: number;
}

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 100,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "red",
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.5s",
      color: "red",
      backgroundColor: "black",
    },
    right: "5%",
  },
}));

const ScrollButton: React.FC<ScrollButtonProps> = ({ showBelow = 200 }) => {
  const classes = useStyles();
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  }, [show, setShow, showBelow]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Après le clic, mettez à jour l'état pour cacher le bouton
    setShow(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 9000);

    if (showBelow) {
      window.addEventListener("scroll", handleScroll);

      // Nettoie l'écouteur d'événements lorsque le composant est démonté
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [showBelow, show, handleScroll]);

  return (
    <S.MainContainer>
      {show && (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </S.MainContainer>
  );
};

export default ScrollButton;
