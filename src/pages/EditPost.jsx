import React, { useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteDatabaseService from '../appwrite/database'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteDatabaseService.getPost(slug).then((post) => {
                if(post) {
                    setPosts(post)
                }
            }) 
        } else{
            navigate('/')
        }
    } , [slug,navigate])
  return post ? (
    <div className=' py-8'>
        <Container>
            <PostForm  post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost