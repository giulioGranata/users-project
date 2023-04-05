import { useEffect, useState } from "react";
import { splitArrayIntoChunks } from "../../utils";

import "./style.css";

export const ToggleBar = ({ apiData, selectedUser, setSelectedUser }) => {
  // rowData is a matrix: each child will represent a single row to
  // display in the ToggleBar.
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const maxRowSize = 5;
    if (!apiData.length) return;

    // Check if the data length is less or equal then the max size per row.
    // In this case, return a matrix with only the first row filled.
    if (apiData.length <= maxRowSize)
      return setRowData(splitArrayIntoChunks(apiData, maxRowSize));

    // Get the number of rows which are filled as maxSize
    const maxSizeRowsCount = parseFloat(apiData.length / maxRowSize).toFixed(0);

    // Get the row size
    let rowsSize = maxRowSize;

    // Get the last row size
    let lastRowSize = apiData.length % rowsSize;

    // Check if the last row size is 0, in this case return a matrix with all rows
    // filled as maxSize
    if (lastRowSize === 0)
      return setRowData(splitArrayIntoChunks(apiData, maxRowSize));

    for (let index = 1; index < 5; index++) {
      // Calculate the new row size subtracting at row size the index value
      const newRowsSize = rowsSize - index;

      // Get the elements count to add to the last row
      const elementsToAddLastRow = index * maxSizeRowsCount;

      // Get the new last row size
      const newLastRowSize = lastRowSize + elementsToAddLastRow;

      if (newLastRowSize <= newRowsSize) {
        // The new value of the last row size is LESS or EQUAL than the new row size:
        // save the new values into the variables and continue the loop
        rowsSize = newRowsSize;
        lastRowSize = newLastRowSize;
      } else {
        // The new value of the last row size is BIGGER than the new row size:
        // get the last value (i-1) of the rowsSize and calculate the matrix result.
        // The matrix result will be an array of chunks, each chunks size will be
        // rowsSize. The last chunk size will be LESS or EQUAL than rowsSize.
        setRowData(splitArrayIntoChunks(apiData, rowsSize));
      }
    }
  }, [apiData]);

  return (
    <div>
      {rowData.map((row, rowI) => (
        <div className="toggle-bar-row" key={rowI}>
          {row.map((user, userI) => (
            <button
              key={userI}
              className={selectedUser?.id === user.id ? "selected" : ""}
              onClick={() =>
                setSelectedUser(selectedUser?.id === user.id ? null : user)
              }
            >
              {user.first_name} {user.last_name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
