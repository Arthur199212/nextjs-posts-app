import { Layout, Posts, Poster } from '../components'
import { withApollo, withRedux } from '../lib'
import { compose } from 'redux'

const Home = () => (
  <Layout>
    <Poster />
    <Posts />
  </Layout>
)

export default compose(withRedux, withApollo)(Home)
