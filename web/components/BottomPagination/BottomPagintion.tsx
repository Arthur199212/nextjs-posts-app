import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button, Container } from '@material-ui/core'
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon
} from '@material-ui/icons'
import { POSTS_COUNT } from '../../queries'
import Link from 'next/link'
import { MAX_POSTS_ON_PAGE } from '../../config'

const BottomPagintion = () => {
  const chunk = MAX_POSTS_ON_PAGE
  
  const { data } = useQuery(POSTS_COUNT)

  let count
  if (data) count = Math.ceil(data.postsCount / chunk)

  const list = new Array(count).fill('')

  return (
    <Container maxWidth='md' style={{ margin: '20px auto'}}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 10, borderTop: '1px solid #e2e2e2' }}>
        <Link href='/page/[page]' as={`/page/${0}`}>
          <Button color='primary'>
            <ArrowBackIosIcon />
          </Button>
        </Link>
        {list.map((_, i) => (
          <Link key={`list-paggination-${i}`} href='/page/[page]' as={`/page/${i}`}>
            <Button color='primary'>
              {i + 1}
            </Button>
          </Link>
        ))}
        <Link href='/page/[page]' as={`/page/${count}`}>
          <Button color='primary'>
            <ArrowForwardIosIcon />
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default BottomPagintion
