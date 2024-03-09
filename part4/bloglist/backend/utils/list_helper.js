const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
}

const mostBlogs = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    const authorWithMostBlogs = Object.keys(authors).reduce((max, author) => authors[author].length > authors[max].length ? author : max, Object.keys(authors)[0])
    return (authors[authorWithMostBlogs] === undefined) ? undefined :
    {
        author: authorWithMostBlogs,
        blogs: authors[authorWithMostBlogs].length
    }
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    const authorWithMostLikes = Object.keys(authors).reduce((max, author) => {
        const likes = authors[author].reduce((sum, blog) => sum += blog.likes, 0)
        return (likes > authors[max].reduce((sum, blog) => sum += blog.likes, 0)) 
            ? author 
            : max
    }, Object.keys(authors)[0])
    return (authors[authorWithMostLikes] === undefined) 
    ? undefined 
    : {
        author: authorWithMostLikes,
        likes: authors[authorWithMostLikes].reduce((sum, blog) => sum += blog.likes, 0)
      }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
