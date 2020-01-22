import { Layout, Posts, Poster } from '../components'
import { withApollo } from '../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TEST_QUERY = gql`
  {
    hello
  }
`

const Home = () => {
  const { data } = useQuery(TEST_QUERY)

  console.log(data)

  return (
    <Layout>
      <Poster />
      <Posts />
    </Layout>
)}

export default withApollo(Home)
