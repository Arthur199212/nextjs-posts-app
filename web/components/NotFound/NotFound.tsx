import { Layout } from '../'
import { Typography } from '@material-ui/core'

const NotFound = () => (
  <Layout>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        style={{
          position: 'relative',
          top: '40%',
          padding: 30,
          textAlign: 'center'
        }}
      >
        Error 404: page not found
      </Typography>
    </div>
  </Layout>
)

export default NotFound
