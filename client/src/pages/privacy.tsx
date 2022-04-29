import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import { Navbar } from '../components/modules'

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy at DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar small />
        <PolicyWrapper>
          <Title>Privacy Policy</Title>
          <Header>What data do we collect?</Header>
          <List>
            <ListElement>Email</ListElement>
            <ListElement>Name</ListElement>
            <ListElement>Reviews</ListElement>
          </List>
          <Header>How do we collect your data?</Header>
          <List>
            <ListElement>Create an account</ListElement>
            <ListElement>Write a review</ListElement>
          </List>
          <Header>How do we use your data?</Header>
          <List>
            <ListElement>Save your settings</ListElement>
            <ListElement>Display profile</ListElement>
            <ListElement>Display reviews</ListElement>
          </List>
          <Header>How do we store your data?</Header>
          <StandardText>
            dailytechsupply.com securely stores your data in PostreSQL
          </StandardText>
          <Header>What are your data protection rights?</Header>
          <List>
            <ListElement>
              The right to access – You have the right to request
              dailytechsupply.com for copies of your personal data. We may limit
              the number of times this request can be made to depending on the
              size of the request.
            </ListElement>
            <ListElement>
              The right to rectification – You have the right to request that
              dailytechsupply.com correct any information you believe is
              inaccurate. You also have the right to request dailytechsupply.com
              to complete the information you believe is incomplete.
            </ListElement>
            <ListElement>
              The right to erasure – You have the right to request that
              dailytechsupply.com erase your personal data, under certain
              conditions..
            </ListElement>
            <ListElement>
              The right to restrict processing – You have the right to request
              that dailytechsupply.com restrict the processing of your personal
              data, under certain conditions..
            </ListElement>
            <ListElement>
              The right to object to processing – You have the right to object
              to dailytechsupply.com processing of your personal data, under
              certain conditions.
            </ListElement>
            <ListElement>
              The right to data portability – You have the right to request that
              dailytechsupply.com transfer the data that we have collected to
              another organization, or directly to you, under certain
              conditions.
            </ListElement>
          </List>
          <Header>Changes to our privacy policy</Header>
          <StandardText>
            dailytechsupply.com keeps its privacy policy under regular review
            and places any updates on this web page. The dailytechsupply.com
            privacy policy may be subject to change at any given time without
            notice. This privacy policy was last updated on 29 April 2022.
          </StandardText>
          <Header>How to contact us</Header>
          <StandardText>email: dailytechsupply.com@gmail.com</StandardText>
        </PolicyWrapper>
      </main>
    </>
  )
}

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: auto;
`

const Title = styled.div`
  margin-top: 15px;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
  margin-top: 35px;
`

const StandardText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
  padding: 5px;
`

const List = styled.ul``

const ListElement = styled.li`
  padding: 5px;
`

export default PrivacyPage
