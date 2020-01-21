import CssBaseline from '@material-ui/core/CssBaseline'
import { Header, Posts, Poster } from '../components'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const TEST_QUERY = gql`
  {
    hello
  }
`

const Home = () => {
  const { data } = useQuery(TEST_QUERY);

  console.log(data)

  return (
    <>
      <CssBaseline />
      <Header />
      <Poster />
      <Posts />
    </>
)}

export default Home
