import { useEffect, useState } from "react";
import { useGetUsers } from "../../hooks";
import { splitArrayIntoChunks } from "../../utils";

import "./style.css";

export const ToggleBar = ({ selectedUser, setSelectedUser }) => {
  const [rowData, setRowData] = useState([]);
  const { data: apiData } = useGetUsers();

  useEffect(() => {
    const maxRowSize = 5;
    if (!apiData.length) return;
    if (apiData.length <= maxRowSize)
      return setRowData(splitArrayIntoChunks(apiData, maxRowSize));

    const maxSizeRowsCount = parseFloat(apiData.length / maxRowSize).toFixed(0);

    let rowsSize = maxRowSize;
    let lastRowSize = apiData.length % rowsSize;

    if (lastRowSize === 0)
      return setRowData(splitArrayIntoChunks(apiData, maxRowSize));

    for (let index = 1; index < 5; index++) {
      const newRowsSize = rowsSize - index;
      const elementsToAddLastRow = index * maxSizeRowsCount;
      const newLastRowSize = lastRowSize + elementsToAddLastRow;

      if (newLastRowSize <= newRowsSize) {
        rowsSize = newRowsSize;
        lastRowSize = newLastRowSize;
      } else {
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
