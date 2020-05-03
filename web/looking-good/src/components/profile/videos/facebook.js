import React from 'react'

export default function Facebook({ url }) {
  return (
    <iframe
      src={`https://www.facebook.com/plugins/video.php?href=${encodeURI(url)}&show_text=0&width=560`}
      width={560}
      height={305}
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling={'no'}
      frameBorder={0}
      allowFullScreen={true}
    >
    </iframe>
  )
}
