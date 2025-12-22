import {  useFormik } from "formik";
import Category from "./Category";
import { Description } from "@headlessui/react";
import axiosNew from "../Axios/axiosNew";
import { useState } from "react";
export const AddProduct = () => {
   const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      Image: "",
      Category: "",
      Material: "",
      Price: 0,
      Dis: 0,
      Sold: 0,
      Tags: "",
      Description: "",
      Revenue: 0,
      Rating: 0,
    },

    onSubmit: (values, { setSubmitting ,resetForm }) => {
      const newProduct = {
        name: values.name,
        Image: values.Image,
        Category: values.Category,
        Material: values.Material,
        Price: values.Price,
        Dis: values.Dis,
        Sold: values.Sold,
        Tags: values.Tags,
        Description: values.Description,
        Revenue: values.Revenue,
        Rating: values.Rating

      };
      
        axiosNew.post(
          "/product-list",
          newProduct
        )
        .then((response) => {
          console.log(response.data);
          setSuccess(true)
          resetForm();
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
      <form onSubmit={formik.handleSubmit}>
  <div className="max-w-4xl mx-auto p-6 bg-white space-y-6">

    
    <fieldset className="border-2 border-teal-600 rounded-md p-4">
      <legend className="text-teal-600 px-2 font-medium">Product Information</legend>

      <div className="grid grid-cols-2 gap-4">

       
        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Name</legend>
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Product Name"
            {...formik.getFieldProps("name")}
          />
        </fieldset>

        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Image</legend>
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Product Image"
            {...formik.getFieldProps("Image")}
          />
        </fieldset>

        
        <fieldset className="col-span-2 border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Description</legend>
          <textarea
            className="w-full outline-none"
            placeholder="Product Description"
            {...formik.getFieldProps("Description")}
          />
        </fieldset>

       
        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Material</legend>
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Product Material"
            {...formik.getFieldProps("Material")}
          />
        </fieldset>

        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Price</legend>
          <input
            type="number"
            className="w-full outline-none"
            placeholder="Product Price"
            {...formik.getFieldProps("Price")}
          />
        </fieldset>

        
        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Product Discount</legend>
          <input
            type="number"
            className="w-full outline-none"
            placeholder="Product Discount"
            {...formik.getFieldProps("Dis")}
          />
        </fieldset>

      </div>
    </fieldset>

    
    <div className="grid grid-cols-2 gap-4">

     
      <fieldset className="border-2 border-teal-600 rounded-md p-4">
        <legend className="text-teal-600 px-2 font-medium">Product Category</legend>

        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Category</legend>
          <select className="w-full outline-none" {...formik.getFieldProps("Category")}>
            <option>Men's Clothings</option>
            <option>Women's Clothings</option>
            <option>Accessories</option>
          </select>
        </fieldset>
      </fieldset>

      
      <fieldset className="border-2 border-teal-600 rounded-md p-4">
        <legend className="text-teal-600 px-2 font-medium">Sales Information</legend>

        <div className="grid grid-cols-2 gap-4">

          
          <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
            <legend className="text-sm text-gray-700 px-1">Quantity Sold</legend>
            <input
              type="number"
              className="w-full outline-none"
              placeholder="Quantity Sold"
              {...formik.getFieldProps("Sold")}
            />
          </fieldset>

          <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
            <legend className="text-sm text-gray-700 px-1">Total Revenue</legend>
            <input
              type="number"
              className="w-full outline-none"
              placeholder="Total Revenue"
              {...formik.getFieldProps('Revenue')}
            />
          </fieldset>

        </div>
      </fieldset>

    </div>

    <fieldset className="border-2 border-teal-600 rounded-md p-4">
      <legend className="text-teal-600 px-2 font-medium">Additional Information</legend>

      <div className="grid grid-cols-2 gap-4">

        
        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">Tags</legend>
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Tags"
            {...formik.getFieldProps('Tags')}
          />
        </fieldset>

       
        <fieldset className="border border-gray-700 rounded px-3 py-2 focus-within:border-teal-600">
          <legend className="text-sm text-gray-700 px-1">avgRating</legend>
          <input
            type="number"
            className="w-full outline-none"
            placeholder="avgRating"
            {...formik.getFieldProps('Rating')}
          />
        </fieldset>

      </div>
    </fieldset>

     {success && (
        <div className="w-full bg-green-100 text-green-500 border border-green-200 px-4 py-3 rounded flex items-center gap-2">
          <span>Product Added Successfully</span>
        </div>
      )} 

    <div>
      <button
        type="submit"
        className="bg-gray-200 text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 border border-teal-400"
      >
        SUBMIT
      </button>
    </div>

  </div>
</form>

    </>
  );
};
