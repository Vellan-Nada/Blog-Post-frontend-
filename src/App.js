import React, {useState, useEffect} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Blog from "./Blog"
import "./style.css"; 

function App(){

    const [blog,setBlog] = useState({title:"", content:""})
    const [blogs,setBlogs] = useState([])
    const [createPost, setCreatePost] = useState(false)

    // load item (frontend only)
    const loadBlogs = async ()=>{
        try {
            setBlogs([])
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{loadBlogs()},[])

    // add item
    function newPost(event) {
      const { name, value } = event.target;

      setBlog((prev) => {
        return { ...prev, [name]: value };
      });
    }

    const submitPost = async ()=>{
      try {
        if(blog.title==="" || blog.content==="") return

        const newBlog = { id: Date.now(), ...blog }
        setBlogs([...blogs, newBlog])

        setCreatePost(false)
        setBlog({title:"", content:""})
      } catch (error) {
        console.error(error.message)
      }
    }

    // edit item
    async function editBlog(id,editedBlog){
        try {
            let changed = blogs.map((item)=>item.id===id?{...item, ...editedBlog}:item)
            setBlogs(changed)
        } catch (error) {
            console.error(error.message)
        }
    }

    // delete item
    async function deleteBlog(id){
        try {
            let remain = blogs.filter((item)=>item.id!==id)
            setBlogs(remain)
        } catch (error) {
            console.error(error.message)
        }
    }

    return(<div>
        <Header/>
        {(!createPost) && (
            <button onClick={()=>{setCreatePost(!createPost)}}>+ Create New Blog My Guy</button>
        )}
        {createPost && (
          <div>
            <input name="title" type="text" value={blog.title} onChange={newPost} placeholder="Title..."></input>
            <textarea name="content" rows="5" value={blog.content} onChange={newPost} placeholder="Content..."></textarea>
            <button onClick={()=>{submitPost()}}>Save</button>
            <button onClick={()=>{setCreatePost(!createPost);setBlog({title:"", content:""})}}>Cancel</button>
           </div>
        )}
        
        <hr/>
        <h2>Blog List</h2>
        {blogs.map((blog)=>(
            <Blog key={blog.id} id={blog.id} title={blog.title} content={blog.content} onDelete={deleteBlog} onEdit={editBlog}/>))}
        <Footer/> 
    </div>)
}

export default App
