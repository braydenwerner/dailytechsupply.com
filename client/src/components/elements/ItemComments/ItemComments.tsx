import React from 'react'

interface ItemCommentsProps {
  signedIn: boolean
}

export const ItemComments: React.FC<ItemCommentsProps> = ({ signedIn }) => {
  return (
    <div>
      {signedIn
        ? 'You are signed in and can make a comment'
        : 'You are not signed in so you cant make a comment'}
    </div>
  )
}
