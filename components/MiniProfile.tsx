import { signOut, useSession } from 'next-auth/react'

const MiniProfile = () => {
  const { data: session } = useSession()
  // console.log(session)
  return (
    <div className="mt-14 flex items-center justify-between lg:pl-5">
      <img
        className="h-16 w-16 rounded-full border object-contain p-[2px]"
        src={session?.user?.image}
        alt=""
      />
      <div className="flex1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Instagram</h3>
      </div>
      <button className="text-sm font-semibold text-blue-400" onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
