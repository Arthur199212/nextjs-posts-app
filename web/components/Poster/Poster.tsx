import React from 'react'

const styles = {
  poster: {
    width: '100%',
    maxHeight: 630,
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    verticalAlign: 'middle',
  },
}

const Poster = () => (
  <div style={styles.poster}>
    <img style={styles.image} src='https://blog.logrocket.com/wp-content/uploads/2019/05/logrocket-blog.jpg' />
  </div>
)

export default Poster
