import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function Home() {
  
  const router = useRouter();
  const { postId } = router.query;
  
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    } else {
      fetchPosts();
      setPost({});
    }
  }, [postId]);



  const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public'
  const request = '&q='
  const question = 'chicken'
  const questiona = 'aaa'
  const apiKey = process.env.RECIPE_API_KEY
  const appId = process.env.RECIPE_APP_ID
  
  const fetchUrl = baseUrl + request + question + '&app_id=' + appId + '&app_key=' + apiKey

  let fetchPosts = () => {
    fetch('https://gorest.co.in/public/v1/posts')
      .then((response) => response.json())
      .then((response) => {
        setPosts(response.data);
      });
  };

  let fetchPost = (postId) => {
    fetch(`https://gorest.co.in/public/v1/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        setPost(response.data);
      });
  };

  let appendQuery = (id) => {
    router.query.postId = id;
    router.push(router);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.buttonContainer}>
          <Link href="/">Home page</Link>
        </div>
        {posts.map((item) => {
          return (
            <div className={styles.card} onClick={() => appendQuery(item.id)}>
              <div className={styles.number}>{item.id}</div>
              <h2>{item.title}</h2>
            </div>
          );
        })}
      </div>
      {post.id ? (
        <div className={styles.right}>
          <div className={styles.fixedCard}>
            <div className={styles.number}>{post.id}</div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}