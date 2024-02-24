import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import TableAndModal from "./Table";

const Content = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Image
            // className="teste"
            src={"/rick.svg"}
            width={300}
            height={300}
            alt={"portal"}
          ></Image>
        </Grid>
        <Grid item xs={4}>
          <TableAndModal></TableAndModal>
        </Grid>
        <Grid item xs={4}>
          <Image
            // className="teste"
            src={"/morty.svg"}
            width={300}
            height={300}
            alt={"portal"}
          ></Image>
        </Grid>
      </Grid>
    </>
  );
};

export default Content;
