import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { FaEye } from "react-icons/fa";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
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
export const ProductLsit = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [viewBox, setViewBox] = useState(null);
  const [editBox, setEditBox] = useState(null);
  const [submitNote, setSubmitNote] = useState(false);

  const processRowUpdate = async (newRow) => {
    try {
      const response = await axiosNew.put(`product-list/${newRow.id}`, newRow);
      const updatedRow = await response.data;
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow;
    } catch (error) {
      console.error("Failed to update row:", error);
    }
  };

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  // const handleEditClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  // const handleSaveClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  const handleDeleteClick = (id) => async () => {
  try {
    console.log("Deleting:", id);

    await axiosNew.delete(`/product-list/${id}`);

    setRows(prevRows => prevRows.filter(row => row.id !== id));
    
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "Image",
      headerName: "Image",
      type: "image",
      width: 120,
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
      field: "Category",
      headerName: "Category",
      width: 120,
      editable: true,
    },
    {
      field: "Material",
      headerName: "Material",
      width: 100,
      editable: true,
    },
    {
      field: "Price",
      headerName: "Price",
      width: 100,
      editable: true,
    },
    {
      field: "Dis",
      headerName: "Discount",
      width: 100,
      editable: true,
    },
    {
      field: "Sold",
      headerName: "Sold",
      width: 100,
      editable: true,
    },
    {
      field: "Tags",
      headerName: "Tags",
      width: 120,
      editable: true,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 230,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 180,
      cellclassName: "actions",
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
              //   onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              //   onClick={handleCancelClick(id)}
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
              console.log("Clicked row:", row);
              setViewBox(row);
            }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              const row = rows.find((r) => r.id === id);
              setEditBox(row);
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
    const getProductData = async () => {
      try {
        const response = await axiosNew.get("/product-list");
        setRows(response.data);
        console.log("getProducts",response);
      } catch (error) {
        console.error(error);
      }
    };
    getProductData();
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  return (
    <>
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
          <Dialog open={!!viewBox} onClose={() => setViewBox(null)}>
            <DialogContent className="p-6">
              {viewBox && (
                <>
                  <h2 className="text-3xl font-semibold text-center mb-6">
                    {viewBox.name} {viewBox.Category}
                  </h2>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1 flex justify-center">
                      <img
                        src={viewBox.Image}
                        alt="product"
                        className="w-66 h-64 object-cover rounded shadow-md"
                      />
                    </div>

                    <div className="col-span-2 space-y-3">
                      <div>
                        <p className="text-green-600 text-xl font-bold">
                          {viewBox.Dis}% &nbsp; ₹{viewBox.Price}
                        </p>
                        <p className="text-gray-500 line-through text-sm">
                          M.R.P.: ₹{viewBox.Price + 200}
                        </p>
                      </div>

                      <p>
                        <strong>Material:</strong> {viewBox.Material}
                      </p>
                      <p>
                        <strong>Category:</strong> {viewBox.Category}
                      </p>
                      <p>
                        <strong>Quantity Sold:</strong> {viewBox.Sold}
                      </p>
                      <p>
                        <strong>Average Rating:</strong> {viewBox.Rating}
                      </p>
                      <p>
                        <strong>Total Revenue:</strong> ₹{viewBox.Revenue}
                      </p>
                      <p>
                        <strong>Tags:</strong> {viewBox.Tags}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-gray-700 leading-relaxed">
                    {viewBox.Description}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        }
        {
          <Dialog
            open={!!editBox}
            onClose={() => setEditBox(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className="text-lg font-bold">
              Update Men's Clothings
            </DialogTitle>

            <DialogContent>
              {editBox && (
                <div className="max-w-4xl mx-auto bg-white  rounded-lg p-6 space-y-8">
                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Product Information
                    </legend>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Men's Clothings"
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Image
                        </label>
                        <input
                          type="text"
                          defaultValue="https://prod-img.thesouledstore.com/put"
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Description
                        </label>
                        <textarea
                          defaultValue="Men's clothing encompasses a wide range of apparel, from formal suits and dress shir"
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Material
                        </label>
                        <input
                          type="text"
                          defaultValue="Premium Heavy Gauge I"
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Price
                        </label>
                        <input
                          type="number"
                          defaultValue={1200}
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Product Discount
                        </label>
                        <input
                          type="number"
                          defaultValue={2}
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Product Category
                    </legend>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Men's Clothings"
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                    />
                  </fieldset>

                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Sales Information
                    </legend>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Quantity Sold
                        </label>
                        <input
                          type="number"
                          defaultValue={10}
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Total Revenue
                        </label>
                        <input
                          type="number"
                          defaultValue={11760}
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="border border-teal-600 rounded-md p-4">
                    <legend className="text-teal-600 font-medium px-2">
                      Additional Information
                    </legend>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Tags
                        </label>
                        <input
                          type="text"
                          defaultValue="oversize, t-shirt, casual"
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Average Rating
                        </label>
                        <input
                          type="number"
                          defaultValue={4}
                          className="w-full border border-gray-300 px-3 py-2 rounded focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div className="text-left">
                    <button
                      className="bg-gray-200 border border-teal-600 text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 transition"
                      onClick={() =>
                        processRowUpdate(editBox) && setEditBox(null) && setSubmitNote(true)
                      }
                    >
                      SUBMIT
                    </button>
                    {submitNote && (
                    <div className="w-full bg-green-100 text-green-500 border border-green-200 px-4 py-3 rounded flex items-center gap-2">
                      <span>Product Edited Successfully</span>
                    </div>
                  )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        }

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        />
      </Box>
    </>
  );
};
