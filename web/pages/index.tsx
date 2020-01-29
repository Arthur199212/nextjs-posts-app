import { compose } from 'redux'
import { withApollo, withRedux } from '../lib'
import { Layout, Posts, Poster, BottomPagintion } from '../components'

const Home = () => (
  <Layout>
    <Poster />
    <Posts />
    <BottomPagintion />
  </Layout>
)

export default compose(withRedux, withApollo)(Home)
