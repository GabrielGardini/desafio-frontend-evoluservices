import MenuIcon from "@mui/icons-material/Menu";
import { Slide, useMediaQuery, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";

const pages = [
  { title: "Personagens" },
  { title: "Lugares" },
  { title: "Episódios" },
];

function HideOnScroll(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  //ESTILOS DO HEADER
  const biggerThan900px = useMediaQuery("(min-width:900px)");

  const box1 = {
    // css do menu hamburguer
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
    justifyContent: "flex-end",
  };
  const box2 = {
    // css do menu normal (desktop)
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    justifyContent: "flex-end",
  };
  const option = {
    // css das opções do menu desktop
    color: "#EFF1F6",
    textShadow:
      "1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
    display: "block",
    fontSize: 24,
    textDecoration: "none",
    margin: 30,
    cursor: "pointer",
    fontWeight: "bold",
  };
  const optionSmall = {
    // css das opções do menu mobile
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ backgroundColor: "#41B4C9" }} elevation={2}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Image
                priority
                src={"/logo.svg"}
                width={biggerThan900px ? 250 : 250}
                height={biggerThan900px ? 100 : 100}
                alt={"Rick and Morty Logo"}
              ></Image>
              <Box sx={box1}>
                <IconButton
                  size="large"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.title}>
                      <Typography
                        sx={{ optionSmall }}
                        fontFamily={"Poppins"}
                        textAlign="center"
                      >
                        <a style={optionSmall}>{page.title}</a>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={box2}>
                {pages.map((page, index) => (
                  <div key={index}>
                    <Typography fontFamily={"Poppins"} textAlign="center">
                      <a style={option}>{page.title}</a>
                    </Typography>
                  </div>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default Header;
