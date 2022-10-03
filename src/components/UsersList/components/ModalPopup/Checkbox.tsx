import React, { useState } from "react";
import styled from "styled-components";
const Label = styled.label`
  font-size: 16px;
`;
const CheckboxInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  margin: 0;
  font: inherit;
  color: black;
  width: 24px;
  height: 24px;
  border: 1px solid brown;
  border-radius: 6px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  /* position: relative; */
  &::before {
    content: "";
    width: 14px;
    height: 14px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

    background-color: #676767;
  }
  &:checked::before {
    transform: scale(1);
  }
`;
const DivHelp = styled.div`
  border: 0.5px solid #676767;
  border-radius: 8px;
  width: 25px;
  height: 25px;
`;
type Props = {
  label: string;
  status?: (e: any) => any;
};
const Checkbox: React.FC<Props> = ({ label, status }) => {
  const [checked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <DivHelp>
          <CheckboxInput
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              status!(e.currentTarget.checked)
            }
            type="checkbox"
            name="checkbox"
          />
        </DivHelp>
        <Label>{label}</Label>
      </div>
    </>
  );
};
export default Checkbox;
