// Dependencies
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// Externals
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
`;

export const StyledCropper = styled(ReactCrop)`
  flex-grow: 1;
`;

export const StyledActions = styled.div`
  align-items: center;
  background: ${theme.main.colors.greys.shade};
  border-radius: ${theme.main.borderRadii.round};
  display: flex;
  margin: 50px 0;
`;

export const CancelButton = styled.div`
  border-right: 1px solid ${theme.main.colors.black};
  box-sizing: border-box;
  color: ${theme.main.colors.white};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  padding: 10px 20px;
`;

export const SaveButton = styled.div`
  box-sizing: border-box;
  color: ${theme.main.colors.blue.normal};
  cursor: pointer;
  font-size: ${theme.main.fontSizes.normal};
  font-weight: ${theme.main.fontWeights.bold};
  padding: 10px 20px;
`;
