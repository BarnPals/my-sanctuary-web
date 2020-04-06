// Dependencies
import styled from 'styled-components';
// Externals
import Checkmark from 'assets/react-svgs/Checkmark';
import Notes from 'assets/react-svgs/Notes';
import Trash from 'assets/react-svgs/Trash';
import theme from 'assets/theme';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const Item = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 15px;
`;

export const StyledCounter = styled.div`
  align-items: center;
  display: flex;
  color: ${theme.main.colors.greys.normal};
  margin-right: 5px;
`;

export const ResolvedIcon = styled(Checkmark)`
  cursor: pointer;
  height: 42px;
  width: 42px;

  path {
    fill: ${({ resolved }) => (resolved ? theme.main.colors.green.tint : theme.main.colors.greys.normal)};
    transition: fill 0.5s ease;
  }
`;

export const NotesIcon = styled(Notes)`
  cursor: pointer;
  height: 26px;
  width: 26px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;

export const DeleteIcon = styled(Trash)`
  cursor: pointer;
  height: 22px;
  margin-left: 8px;
  width: 22px;

  path {
    fill: ${theme.main.colors.greys.normal};
  }
`;
