import { Layout, Posts, Poster } from '../components'
import { withApollo } from '../lib/apollo'

const Home = () => (
    <Layout>
      <Poster />
      <Posts />
    </Layout>
)

export default withApollo(Home)
