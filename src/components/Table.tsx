import { use, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { getAllCharacters } from "../pages/api/getAllCharacters";
import { getFilteredCharacter } from "../pages/api/getFilteredCharacter";
import Image from "next/image";

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
    minWidth: 170,
    align: "center",
  },
];

function createData(image: string, name: string) {
  return { image, name };
}

const TableAndModal = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [characters, setCharacters] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCharacters(page + 1);
        console.log(data);
        setCharacters(data?.results);
      } catch (error) {
        // Trate o erro conforme necessário
      }
    }

    fetchData();
    console.log(characters);
  }, [page]);

  const searchCharacter = async (name: string) => {
    try {
      const data = await getFilteredCharacter(name);
      console.log(data);
      setCharacters(data?.characters?.results);
    } catch (error) {
      // Trate o erro conforme necessário
    }
  };

  return (
    <Box
      className="vidro"
      sx={{
        padding: 6,
        bgcolor: "white",
        borderRadius: 6,
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(e) => searchCharacter(e.target.value)}
      ></input>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
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
                    onClick={() => console.log(row)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {columns.map((column) => {
                      //   const value = row[column.id];
                      return (
                        <>
                          <TableCell
                            key={column.id}
                            align={column.align as "center"}
                            style={{ fontSize: "16px", fontFamily: "Poppins" }}
                          >
                            {/* {row?.name} */}
                            {column.id === "name" ? (
                              row?.name
                            ) : (
                              <img
                                src={row?.image}
                                width={50}
                                height={50}
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
          count={"826"}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default TableAndModal;
