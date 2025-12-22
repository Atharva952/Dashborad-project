import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaEye } from "react-icons/fa";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import axiosNew from "../Axios/axiosNew";

function EditToolbar({ setRows, setRowModesModel }) {
  const handelClick = () => {
    const id = Date.now().toString();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        CategoryName: "",
        Image: "",
        description: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "CategoryName" },
    }));
  };

  return (
    <Box sx={{ p: 1 }}>
      <Tooltip title="Add record">
        <button onClick={handelClick}>
          <AddIcon fontSize="small" />
        </button>
      </Tooltip>
    </Box>
  );
}

export default function Categorylist() {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [viewRow, setViewRow] = useState(null);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    if (location.state?.newCategory) {
      setRows((prev) => [...prev, location.state.newCategory]);
    }
  }, [location.state?.newCategory]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // const handleEditClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

  // };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      console.log("Deleting:", id);

      await axiosNew.delete(`/Category-list/${id}`);

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const response = axiosNew.put(`/Category-list/${newRow.id}`, newRow);
      const updatedRow = await response.data;
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow;
    } catch (error) {
      console.error("Failed to update row:", error);
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "CategoryName",
      headerName: "Category",
      width: 250,
      editable: true,
    },

    {
      field: "Image",
      headerName: "Image",
      type: "image",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="category"
          className="w-[50px] h-[50px] rounded-4xl bg-cover"
        />
      ),
    },
    {
      field: "description",
      headerName: "description",
      width: 420,
      editable: true,
      type: "singleSelect",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<FaEye />}
            label="View"
            onClick={() => {
              const row = rows.find((r) => r.id === id);
              setViewRow(row);
            }}
          />,

          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              const row = rows.find((r) => r.id === id);
              setEditRow(row);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    const getListData = async () => {
      try {
        const response = await axiosNew.get("/Category-list");

        const mapped = response.data.map((item) => ({
          ...item,
          id: item.id || item._id,
        }));

        const newCat = location.state?.newCategory;

        if (newCat) {
          setRows([...mapped, newCat]);
        } else {
          setRows(mapped);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    getListData();
  }, [location.state]);

  useEffect(() => {
    console.log("Fetched rows:", rows);
  }, [rows]);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      {
        <Dialog open={!!viewRow} onClose={() => setViewRow(null)}>
          <DialogTitle>category name</DialogTitle>
          <DialogContent>
            {viewRow && (
              <div className="p-5 border border-gray-300 rounded-md bg-white shadow-sm space-y-3">
                <img
                  src={viewRow.Image}
                  alt="category"
                  className="w-[85px] h-[85px] rounded-md object-cover mb-3"
                />

                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Category:</span>{" "}
                  {viewRow.CategoryName}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Description:
                  </span>{" "}
                  {viewRow.description}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      }
      {
        <Dialog open={!!editRow} onClose={() => setEditRow(null)}>
          <DialogTitle>Category Name</DialogTitle>
          <DialogContent>
            {editRow && (
              <>
                <div className="space-y-6 p-4">
                  {/* Category Information */}
                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Category Information
                    </legend>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Category Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={editRow.CategoryName}
                          onChange={(e) =>
                            setEditRow({
                              ...editRow,
                              CategoryName: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:border-teal-600 focus:outline-none"
                        />
                      </div>

                      {/* Category Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category Image
                        </label>
                        <input
                          type="text"
                          value={editRow.Image}
                          onChange={(e) =>
                            setEditRow({ ...editRow, Image: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 
                       focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Description */}
                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Description
                    </legend>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editRow.description}
                      onChange={(e) =>
                        setEditRow({ ...editRow, description: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 
                   focus:border-teal-600 focus:outline-none"
                    />
                  </fieldset>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={() =>
                      processRowUpdate(editRow) && setEditRow(null)
                    }
                    className="bg-gray-200 border border-teal-600 text-black 
                 font-semibold px-6 py-2 rounded hover:bg-gray-300 
                 transition w-fit"
                  >
                    SUBMIT
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      }
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        showToolbar
      />
    </Box>
  );
}
