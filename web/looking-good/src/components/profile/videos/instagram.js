import React from 'react'
import InstagramEmbed from 'react-instagram-embed'

export default function Instagram({ url }) {
  return (
    <InstagramEmbed url={url} />
  )
}
