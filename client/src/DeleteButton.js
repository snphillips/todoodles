import React from 'react';

export default function DeleteButton(props) {
  return (
    <>
      <input
        className="button"
        type="submit"
        value="remove from list"
        onClick={props.handleSubmitDelete}
      />
    </>
  );
}
