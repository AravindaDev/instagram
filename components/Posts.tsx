import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import SinglePost from './SinglePost'

const postList = [
  {
    id: '1',
    userName: 'jane',
    userImage: 'https://randomuser.me/api/portraits/lego/1.jpg',
    img: 'https://source.unsplash.com/random',
    caption: "I'm Jane",
  },
  {
    id: '2',
    userName: 'john',
    userImage: 'https://randomuser.me/api/portraits/lego/2.jpg',
    img: 'https://source.unsplash.com/random',
    caption: "I'm John",
  },
  {
    id: '3',
    userName: 'jane',
    userImage: 'https://randomuser.me/api/portraits/lego/3.jpg',
    img: 'https://source.unsplash.com/random',
    caption: "I'm Jane",
  },
  {
    id: '4',
    userName: 'john',
    userImage: 'https://randomuser.me/api/portraits/lego/4.jpg',
    img: 'https://source.unsplash.com/random',
    caption: "I'm John",
  },
]

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )
  // console.log(posts)
  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
