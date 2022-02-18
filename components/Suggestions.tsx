import faker from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { Suggestion } from '../typings'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  useEffect(() => {
    const suggestion: Suggestion[] = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestion)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>
      {suggestions &&
        suggestions.map((profile) => (
          <div
            className="mt-3 flex items-center justify-between"
            key={profile.id}
          >
            <img
              src={profile.avatar}
              className="h-10 w-10 rounded-full border p-[2px]"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-sm font-semibold">{profile.username}</h2>
              <h3 className="text-xm text-gray-400">
                Works at {profile.company.name}
              </h3>
            </div>
            <button className="text-xm font-bold text-blue-400">Follow</button>
          </div>
        ))}
    </div>
  )
}

export default Suggestions
