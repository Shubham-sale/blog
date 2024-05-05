import React, { useEffect, useState } from "react";
import appwriteDatabseService from "../appwrite/database";
import { Container, PostCard } from "../components";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteDatabseService.getAllPost().then((posts) => {
     console.log("post",posts );
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full font-bold hover:text-gray-500">
              Login to read posts
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
            {posts.map((post) =>(
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
  return <div>Home</div>;
}

export default Home;
