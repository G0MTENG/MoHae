import styled from 'styled-components'

export const List = styled.ul`
  width: 100%;
  height: 100vh - 56px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  & .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .user-info {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`
