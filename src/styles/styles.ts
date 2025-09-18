import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f6b60d;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid #372800;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #5a4b2f;
    color: #fff;
  }
`;

export const PresentationText = styled.section `
  width: 100%;
  max-width: 400px;
  font-size: 30px;
  font-weight: 500;
`

export const UploadSection =styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100vh;
`;

export const UploadBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    border: 2px dashed #ddd;
    border-radius: 12px;
    text-align: center;
    max-width: 400px;
    margin: auto;
`;

export const UploadButton = styled.label`
  background-color: #372800;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #5a4b2f ;
  }
`;

export const ExampleImagesHolder = styled.section `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;

  p {
    font-size: 18px;
  }
`;

export const ExampleImages = styled.section`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const ExampleImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  &:hover{
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const LoadingHolder = styled.section `
  margin-top: 20px;
`;

export const UserActionButtonHolder = styled.section `
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;