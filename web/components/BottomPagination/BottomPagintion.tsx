import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import json2mq from 'json2mq'
import { Button, Container, Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { POSTS_COUNT } from '../../queries'
import Link from 'next/link'
import { POSTS_PER_PAGE } from '../../config'
import { useRouter } from 'next/router'
import { pagination } from '../../utils'

const CustomTab = ({ key, href, as, page, ...props }: any) => (
  <Link key={key} href={href} as={as}>
    <Tab {...props} label={page + 1} />
  </Link>
)

const BottomPagintion = () => {
  const router = useRouter()

  const { page } = router.query

  const { data, loading } = useQuery(POSTS_COUNT, { fetchPolicy: 'no-cache' })

  let countOfPosts = 0

  if (data) countOfPosts = Math.ceil(data.postsCount / POSTS_PER_PAGE)

  const { pagesList, selectedTab } = pagination(page ? +page : 0, countOfPosts)

  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    })
  )

  if (pagesList.length <= 1 || loading) return null

  return (
    <Container maxWidth='md' style={{ margin: '20px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 10, borderTop: '1px solid #e2e2e2' }}>
      <Link href='/page/[page]' as={`/page/${0}`}>
        <Button color='primary'>
          First
        </Button>
      </Link>

      <Tabs
        value={selectedTab}
        indicatorColor='primary'
        textColor='primary'
        variant={!matches ? 'scrollable' : undefined}
        scrollButtons={!matches ? 'on' : undefined}
      >
        {pagesList.map(page => (
          <CustomTab
            key={`list-paggination-${page}`}
            href='/page/[page]'
            as={`/page/${page}`}
            page={page}
          />
        ))}
      </Tabs>

      <Link href='/page/[page]' as={`/page/${countOfPosts ? countOfPosts - 1 : 0}`}>
        <Button color='primary'>
          Last
        </Button>
      </Link>
      </div>
    </Container>
  )
}

export default BottomPagintion
