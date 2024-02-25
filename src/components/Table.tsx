/* eslint-disable @next/next/no-img-element */
import { Brightness1 } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../pages/api/getAllCharacters";
import { getFilteredCharacter } from "../pages/api/getFilteredCharacter";

const columns = [
  {
    id: "image",
    label: "Imagem",
    minWidth: 70,
    align: "center",
  },
  {
    id: "name",
    label: "Nome",
    minWidth: 110,
    align: "center",
  },
];

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const TableAndModal = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [characters, setCharacters] = useState([]);
  const [oneCharacter, setOneCharacter] = useState<Character | null>(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCharacters(page + 1);
        setCharacters(data?.results);
        setCount(data?.info?.count);
      } catch (error) {
        // Trate o erro conforme necessário
      }
    }
    if (search === "") {
      fetchData();
    } else {
      searchCharacter(search);
    }
  }, [page, search]);

  const searchCharacter = async (name: string) => {
    try {
      const data = await getFilteredCharacter(name, page + 1);
      setCharacters(data?.characters?.results);
      setCount(data?.characters?.info?.count);
    } catch (error) {
      // Trate o erro conforme necessário
    }
  };

  return (
    <Box
      className="vidro"
      sx={{
        padding: 6,
        borderRadius: 6,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        height: 500,
      }}
    >
      <input
        placeholder="Pesquise um personagem..."
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      ></input>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
        <TableContainer
          sx={{
            maxHeight: 400,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align as "center"}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      backgroundColor: "#41b5c9",
                      textShadow:
                        "1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {characters?.map((row: any, index: number) => {
                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => {
                      setOneCharacter(row);
                      setOpen(true);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {columns.map((column, index2: number) => {
                      return (
                        <>
                          <TableCell
                            key={index2}
                            align={column.align as "center"}
                            style={{
                              fontSize: "16px",
                              fontFamily: "Poppins",
                            }}
                          >
                            {column.id === "name" ? (
                              row?.name
                            ) : (
                              <img
                                src={row?.image}
                                width={80}
                                height={80}
                                alt="foto"
                              ></img>
                            )}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          sx={{ bgcolor: "#bfde42" }}
        />
      </Paper>
      <Dialog sx={{ borderRadius: 30 }} open={open} onClose={handleClose}>
        <DialogContent sx={{ bgcolor: "#41B4C9", color: "white" }}>
          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <img
                style={{
                  borderRadius: 10,
                }}
                src={oneCharacter?.image}
                width={300}
                height={300}
                alt="foto do personagem"
              ></img>
            </Grid>
            <Grid
              sx={{ bgcolor: "#41B4C9" }}
              item
              md={6}
              xs={12}
              fontFamily={"poppins"}
            >
              <Box
                sx={{
                  paddingX: 2,
                }}
              >
                <h1
                  style={{
                    textShadow:
                      "1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
                  }}
                >
                  {oneCharacter?.name}
                </h1>
                <Divider sx={{ bgcolor: "white" }}></Divider>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    mb: -2,
                  }}
                >
                  <Brightness1
                    sx={{
                      mr: 2,
                      color:
                        oneCharacter?.status == "Alive"
                          ? "green"
                          : oneCharacter?.status == "Dead"
                          ? "red"
                          : "gray",
                    }}
                  />
                  <p>{oneCharacter?.status}</p>{" "}
                  <p style={{ marginInline: 10 }}>-</p>
                  <p>{oneCharacter?.species}</p>
                </Box>
                <Typography sx={{ mt: 1 }} fontFamily={"poppins"}>
                  Origin:<br></br>
                  {oneCharacter?.origin?.name}
                </Typography>
                <Typography sx={{ marginY: 2 }} fontFamily={"Poppins"}>
                  Last known location:<br></br>
                  {oneCharacter?.location?.name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#BFDE42" }}>
          <Button
            sx={{ bgcolor: "#203745", ":hover": { bgcolor: "#172731" } }}
            variant={"contained"}
            onClick={handleClose}
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableAndModal;
