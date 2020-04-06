// Dependencies
import styled from 'styled-components';
// Externals
import ColumnItemTitle from 'components/primitives/ColumnItemTitle';
import NavArrow from 'components/primitives/NavArrow';
import theme from 'assets/theme';

export default styled.div`
  align-items: center;
  background: ${({ selected }) => (selected ? theme.main.colors.blue.tint : theme.main.colors.white)};
  /* border-bottom: 1px solid ${theme.main.colors.greys.tint}; */
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 10px 20px;
  transition: background 0.5s ease;
  width: 100%;

  ${ColumnItemTitle} {
    color: ${theme.main.colors.greys.shade};
  }

  ${NavArrow} {
    visibility: ${({ selected }) => (selected ? 'hidden' : 'visible')};
  }

  &:hover {
    background: ${({ selected }) => (selected ? theme.main.colors.blue.tint : theme.main.colors.background)};
  }
`;
