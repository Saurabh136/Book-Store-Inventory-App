import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {

  

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Title:</label>
          <input
            type="text"
            placeholder="Book Title"
            name="title"
            value={product?.title}
            onChange={handleInputChange}
          />

          <label>Product Genre:</label>
          <input
            type="text"
            placeholder="Book Genre"
            name="genre"
            value={product?.genre}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Book Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Book Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product Series:</label>
          <input
            type="text"
            placeholder="Book Series"
            name="series"
            value={product?.series}
            onChange={handleInputChange}
          />
          <label>Product Serial Number:</label>
          <input
            type="text"
            placeholder="Book Serial Number"
            name="serialnumber"
            value={product?.serialnumber}
            onChange={handleInputChange}
          />
          <label>Product Primary Author:</label>
          <input
            type="text"
            placeholder="Book Primary Author"
            name="primaryauthor"
            value={product?.primaryauthor}
            onChange={handleInputChange}
          />
          <label>Product Secondary Author:</label>
          <input
            type="text"
            placeholder="Book Secondary Author"
            name="secondaryauthor"
            value={product?.secondaryauthor}
            onChange={handleInputChange}
          />
          <label>Product Editor:</label>
          <input
            type="text"
            placeholder="Book Editor"
            name="editor"
            value={product?.editor}
            onChange={handleInputChange}
          />
          <label>Product Publisher:</label>
          <input
            type="text"
            placeholder="Book Publisher"
            name="publisher"
            value={product?.publisher}
            onChange={handleInputChange}
          />
          <label>Product Edition:</label>
          <input
            type="text"
            placeholder="Book Edition"
            name="edition"
            value={product?.edition}
            onChange={handleInputChange}
          />
          <label>Product Condition:</label>
          <input
            type="text"
            placeholder="Book Condition"
            name="condition"
            value={product?.condition}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
