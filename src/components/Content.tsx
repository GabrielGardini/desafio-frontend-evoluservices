import { Grid } from "@mui/material";
import Image from "next/image";
import TableAndModal from "./Table";

const Content = () => {
  const GridStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
        <Grid sx={GridStyle} item xs={4}>
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
