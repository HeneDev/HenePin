import React from "react";

const NewPinForm = ({ handleSubmit, setTitle, setDescription, setRating }) => {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input placeholder="Enter a title" onChange={handleTitleChange}></input>
      <label>Description</label>
      <textarea
        placeholder="Describe this place"
        onChange={handleDescriptionChange}
      ></textarea>
      <label>Rating</label>
      <select onChange={handleRatingChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit" className="submitButton" onClick={handleSubmit}>
        Add Pin
      </button>
    </form>
  );
};

export default NewPinForm;
