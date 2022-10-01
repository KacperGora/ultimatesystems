import React from "react";
import { StyledButton } from "../../../styles/styles";

interface EditInfoModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isModalVisible,
  onBackdropClick,
}) => {
  return (
    <div>
      <form>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "50px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>* E-mail</label>
            <input
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>*Imię</label>
            <input
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>* Nazwisko</label>
            <input
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "50px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>* Data urodzenia</label>
            <input
              type="date"
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>*Telefon</label>
            <input
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "24px" }}
          >
            <label style={{ fontSize: "10px" }}>* Nazwisko</label>
            <input
              style={{
                border: "none ",
                outline: "none",
                borderBottom: "1px solid #ccc",
              }}
            ></input>
          </div>
        </div>
        <StyledButton small>Anuluj</StyledButton>
        <StyledButton small>Zapisz</StyledButton>
      </form>
    </div>
  );
};
export default EditInfoModal;
