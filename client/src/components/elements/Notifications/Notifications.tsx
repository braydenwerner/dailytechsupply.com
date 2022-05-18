import { useEffect, useState } from 'react'
import {
  useGetNotificationsLazyQuery,
  User,
  useSetReadMutation,
} from '../../../generated/graphql'

import { createDateString } from '../../../utils/utils'
import * as Styled from './Notifications.styled'

interface NotificationModalProps {
  user: User
}

export const Notifications: React.FC<NotificationModalProps> = ({ user }) => {
  const [numNotifications, setNumNotifications] = useState(10)

  const [setRead] = useSetReadMutation()

  const [getNotifications, { data }] = useGetNotificationsLazyQuery()
  const notificationData = data && data.getNotifications

  useEffect(() => {
    setRead({ refetchQueries: ['getNotifications'] })
  }, [])

  useEffect(() => {
    getNotifications({ variables: { num_notifications: numNotifications } })
  }, [numNotifications])

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Title>Notifications</Styled.Title>
        <Styled.NotificationsContainer>
          {notificationData &&
            notificationData.map((notification, i) => (
              <a href={notification.item_link}>
                <Styled.Notification key={i}>
                  <Styled.Header>
                    <Styled.NotificationIcon size={28} />
                    <Styled.NotificationTitle>
                      {notification.title}
                    </Styled.NotificationTitle>
                    <Styled.NotificationDate>
                      {createDateString(notification.created_at)}
                    </Styled.NotificationDate>
                  </Styled.Header>
                  <Styled.NotificationText>
                    {notification.text}
                  </Styled.NotificationText>
                </Styled.Notification>
              </a>
            ))}
        </Styled.NotificationsContainer>
        <Styled.LoadMoreButton
          onClick={() =>
            setNumNotifications(
              (oldNumNotifications) => oldNumNotifications + 10
            )
          }
        >
          Load more
        </Styled.LoadMoreButton>
      </Styled.Container>
    </Styled.Wrapper>
  )
}
