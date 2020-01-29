import { Layout, Posts, Poster, BottomPagintion } from '../../components'
import { withApollo, withRedux } from '../../lib'
import { compose } from 'redux'

const Page = () => (
  <Layout>
    <Poster />
    <Posts />
    <BottomPagintion />
  </Layout>
)

export default compose(withRedux, withApollo)(Page)
