import { useQuery, useMutation } from "react-query";

const fetchComments = async(postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

const deletePost = async(postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

const updatePost = async(postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export const PostDetail = ({ post }) => {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation(postId => deletePost(postId));

  if(isLoading) return <h3>Loading...</h3>
  if(isError) return <h3>{error.toString()}</h3>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>
      {deleteMutation.isError && <p style={{color: "red"}}>Error deleting the post</p>}
      {deleteMutation.isLoading && <p style={{color: "purple"}}>Deleting the post</p>}
      {deleteMutation.isSuccess && <p style={{color: "green"}}>Post has (not) been deleted</p>}
      <button>
        Update title
      </button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
