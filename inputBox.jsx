import React from "react";

function InputBox({ label, name, type, value, onChange, error }) {
  return (
    <div className="field">
      <label>{label}</label><br />

      <input
        className={`text-input ${error ? "error-input" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputBox;
