import { FC } from "react";
import "./Textarea.scss";
import { ITextArea } from "../../../utils/interfaces/ITextArea";

export const Textarea: FC<ITextArea> = ({
  value,
  handleChange,
  title,
  placeholder,
}) => {
  return (
    <div className="textarea-wrapper">
      <label className="label" htmlFor="textarea-text">
        {title}
      </label>
      <textarea
        className="textarea"
        placeholder={placeholder}
        id="textarea-text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
