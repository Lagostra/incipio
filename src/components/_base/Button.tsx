import styled from "@emotion/styled";

interface IProps {
  type: "primary" | undefined;
}
export const Button = styled.button<IProps>`
  padding: 10px 8px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  background: ${(props: IProps) => {
    switch (props.type) {
      case "primary":
        return "#00aaff";
      default:
        return "#ddd";
    }
  }};
  color: ${(props: IProps) => {
    switch (props.type) {
      case "primary":
        return "#fff";
      default:
        return "#000";
    }
  }}};
`;
