const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "First blog of User 1",
        author: "User 1",
        user: "65f335c4e08e2750e59a59da",
        url: "someUrl",
        likes: 90,
        id: "65f366d7877be1d38e477500"
    },
    {
        title: "First blog of User 2",
        author: "User 2",
        user: "65f361f5244fd26e8f9ba3e3",
        url: "someUrl",
        likes: 100,
        id: "65f383d485ada2c2aa61dc24"
    }
]

const initialUsers = [
    {
        username: "user1",
        name: "User 1",
        // password: "user1password",
        passwordHash: "$2b$10$JNlsCqYzBYJGzIRK/t0vTueT0.7d.y9AO3OzM0idhQwut1NTt08LC",
        blogs: "65f366d7877be1d38e477500",
        id: "65f335c4e08e2750e59a59da",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3JlbmFtZSI6InVzZXIxIiwiaWQiOiI2NWY0MmUzNDM4YzMxYjg5YTE0NmYxMmMiLCJpYXQiOjE3MTA1MDE2MDR9.rh1Cofi9k85U3wA7iXLqigZ_HA0cRRKdUEmuK9ti60Y"
    },
    {
        username: "user2",
        name: "User 2",
        // password: "user2password",
        passwordHash: "$2b$10$WfMA2tNyN5VBZtmQV40XbukXO4m3ojrXkvWgkFwAEuKyUbR7ZG7Xi",
        blogs: "65f383d485ada2c2aa61dc24",
        id: "65f361f5244fd26e8f9ba3e3",
        // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3JlbmFtZSI6InVzZXIyIiwiaWQiOiI2NWY0MmUzZjM4YzMxYjg5YTE0NmYxMmUiLCJpYXQiOjE3MTA1MDE4OTh9.uuiYbXq7CIunAr5cdPpOrq4c2Sf_9kNp-ttvGIgFxCg"
    }
]

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}
