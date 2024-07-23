export const getBlogs = (req, res) => {
    // Example: retrieve blogs from database (mock data used here)
    const blogs = [
        { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
        { id: 2, title: 'Second Blog', content: 'This is the second blog post.' }
    ];
    res.status(200).json(blogs);
};
export const createBlog=(req,res,next)=>{
    
}