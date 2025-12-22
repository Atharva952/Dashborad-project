import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axiosNew from "../Axios/axiosNew";
import { useState } from "react";

export const AddCategory = () => {
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryImage: "",
      categoryDescription: "",
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newCategory = {
        CategoryName: values.categoryName,
        Image: values.categoryImage,
        description: values.categoryDescription,
      };
      axiosNew
        .post("/Category-list", newCategory)
        .then((response) => {
          console.log(response.data);

          setSuccess(true);
          resetForm();

          setTimeout(() => setSuccess(false), 3000);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(values);
      setSubmitting(false);
    },
  });
  return (
    <>
     
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
            <legend className="text-sm text-gray-700 px-1">
              Category Name
            </legend>
            <input
              id="categoryName"
              type="text"
              className="w-full outline-none"
              placeholder="Category Name"
              {...formik.getFieldProps("categoryName")}
            />
          </fieldset>

          <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
            <legend className="text-sm text-gray-700 px-1">
              Category Image
            </legend>
            <input
              id="categoryImage"
              type="text"
              className="w-full outline-none"
              placeholder="Category Image"
              {...formik.getFieldProps("categoryImage")}
            />
          </fieldset>
        </div>

        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">
            Category Description
          </legend>
          <input
            id="categoryDescription"
            type="text"
            className="w-full outline-none"
            placeholder="Category Description"
            {...formik.getFieldProps("categoryDescription")}
          />
        </fieldset>

         {success && (
        <div className="w-full bg-green-100 text-green-500 border border-green-200 px-4 py-3 rounded flex items-center gap-2">
          <span>Category Added Successfully</span>
        </div>
      )}

        <button
          type="submit"
          className="bg-gray-200 text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 border border-teal-600"
        >
          SUBMIT
        </button>
      </form>
    </>
  );
};
