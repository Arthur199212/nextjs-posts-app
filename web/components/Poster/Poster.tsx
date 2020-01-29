import React from 'react'

const styles = {
  poster: {
    marginTop: '-25px',
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
    <img style={styles.image} src='https://picsum.photos/2600/1056' />
  </div>
)

export default Poster
