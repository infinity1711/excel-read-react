import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { DropzoneDialog } from 'material-ui-dropzone';
import * as XLSX from 'xlsx';

const fs = require('fs')


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



function add(arg1, arg2) {
  alert(arg1 + ' ' + arg2)
}

function App() {

  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)
  const [data, setData] = useState([])

  function readFile(e) {
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      /* read workbook */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

      console.log(data)
      setData(data)
    };
    reader.readAsBinaryString(f);
  }


  return (
    <div className="App">

      <input type="file" id="file-data" onChange={readFile} />


      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {data.map((row, i) => (
              <>
                {row.length > 0 ?
                  <TableRow key={i}>
                    {row.map(value => (

                      <TableCell component="th" scope="row">
                        {value}
                      </TableCell>

                    ))}
                    <TableCell align="right">
                      {i != 0 ? <button onClick={() => { add(row[1], row[2]) }}>Add</button> : null}
                    </TableCell>

                  </TableRow>
                  : null}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
