import { Post } from '../typings'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HearIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

interface Props {
  post: Post
}
const SinglePost = ({ post }: Props) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', post.id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, post.id]
  )
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', post.id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, post.id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )
  console.log('HasLikes', hasLiked)
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user?.uid))
    } else {
      await setDoc(doc(db, 'posts', post.id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }
  // console.log(hasLiked)
  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    const docRef = await addDoc(collection(db, 'posts', post.id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  // console.log(post.id)
  return (
    <div className="my-7 rounded-sm border bg-white">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={post.data().profileImg}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{post.data().username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={post.data().image} alt="" className="w-full object-cover" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HearIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <div>
        <p className="truncate p-5">
          {likes.length > 0 && (
            <p className="mb-1 font-bold">{likes.length} Likes</p>
          )}
          <span className="mr-1 font-bold">{post.data().username}</span>
          {post?.data()?.caption}
        </p>
      </div>
      {/* comments */}
      {comments.length > 0 && (
        <div className="h-20, ml-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex items-center space-x-2">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt="Profile Image"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>
                {'  ' + comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-sm">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className="flex place-items-center">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="pr-2 font-semibold text-blue-600"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default SinglePost
