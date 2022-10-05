import React from "react";
import {
  CheckboxInput,
  CheckBoxLabel,
  DivFlexContainer,
  DivHelper,
} from "./ModalPopupStyle";

type Props = {
  label: string;
  status?: (e: any) => any;
  id: string;
};
const Checkbox: React.FC<Props> = ({ label, status, id }) => {
  return (
    <DivFlexContainer>
      <DivHelper>
        <CheckboxInput
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            status!(e.currentTarget.checked)
          }
          id={id}
          type="checkbox"
          name="checkbox"
        />
      </DivHelper>
      <CheckBoxLabel htmlFor={id}>{label}</CheckBoxLabel>
    </DivFlexContainer>
  );
};
export default Checkbox;
