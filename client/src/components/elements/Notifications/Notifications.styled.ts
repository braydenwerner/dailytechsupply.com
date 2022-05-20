import { BiMessageDetail } from 'react-icons/bi'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
`

export const Title = styled.div`
  margin-top: 15px;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

export const Notification = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
  cursor: pointer;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const NotificationIcon = styled(BiMessageDetail)``

export const NotificationTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0px 15px 0px 15px;
`

export const NotificationDate = styled.div`
  font-size: 1rem;
  color: rgb(72, 72, 72);
`

export const NotificationText = styled.div`
  font-size: 1rem;
  margin: 20px 0px 20px 0px;
`

export const LoadMoreButton = styled.button`
  margin-bottom: 30px;
  color: white;
  margin-right: 10px;
  font-weight: 700;
  font-size: 1rem;
  width: 120px;
  height: 37px;
  border-radius: 5px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: rgb(0, 142, 147);
  }
`
