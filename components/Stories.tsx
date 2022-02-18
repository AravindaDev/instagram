import faker from '@faker-js/faker'
import { useSession } from 'next-auth/react'

import { useEffect, useState } from 'react'
import Story from './Story'

const Stories = () => {
  const { data: session } = useSession()
  const [suggestion, setSuggestion] = useState()
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestion(suggestions)
  }, [])

  return (
    <div className="border-gray-20 mt-8 flex space-x-2 overflow-x-scroll rounded-sm border bg-white p-6 scrollbar-thin scrollbar-thumb-black">
      {suggestion && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {suggestion &&
        suggestion.map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        ))}
    </div>
  )
}

export default Stories
