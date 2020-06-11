import {createClient} from 'contentful'

export default createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
})