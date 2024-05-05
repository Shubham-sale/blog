import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/database'

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() =>{
      
      databaseService.getAllPost([]).then((posts) =>{
        // console.log("Allposts.jsx    " ,posts);
          if (posts){
          setPosts(posts.documents)}
          })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
          <div className='flex flex-wrap'>

            {posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post}/>
                {/* <h1>{post.$id} 1</h1> */}
              </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost


