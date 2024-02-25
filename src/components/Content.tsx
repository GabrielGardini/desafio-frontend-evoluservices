import { Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import TableAndModal from "./Table";

const Content = () => {
  const desktop = useMediaQuery("(min-width:600px)");
  const GridStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: desktop ? 20 : 10,
  };

  return (
    <>
      <Grid container sx={GridStyle}>
        <Grid sx={{ display: "flex", justifyContent: "right" }} item xs={4}>
          <Image
            className="ghost-animation-rick"
            src={"/rick.svg"}
            width={300}
            height={300}
            alt={"Rick Flutuando"}
          ></Image>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={4}>
          <TableAndModal></TableAndModal>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "left" }} item xs={4}>
          <Image
            className="ghost-animation-morty"
            src={"/morty.svg"}
            width={300}
            height={300}
            alt={"Morty Flutuando"}
          ></Image>
        </Grid>
      </Grid>
    </>
  );
};

export default Content;
