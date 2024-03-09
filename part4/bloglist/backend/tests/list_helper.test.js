const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
  })

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Canonical string reduction',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'First class tests',
            likes: 10,
            __v: 0
        }
    ]

    test('of empty list is undefined', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, undefined)
    })

    test('when list has only one blog, equals the blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
    })

    test('when list has multiple blogs, equals the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, listWithMultipleBlogs[2])
    })
})

describe('most blogs', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            author: 'Edsger W. Dijkstra',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            author: 'Edsger W. Dijkstra',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            author: 'Edsger W. Dijkstra',
            title: 'Canonical string reduction',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            author: 'Robert C. Martin',
            title: 'First class tests',
            likes: 10,
            __v: 0
        }
    ]

    test('of empty list is undefined', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, undefined)
    })

    test('when list has only one blog, equals the author of that blog', () => { 
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('when list has multiple blogs, equals the author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})

describe('most likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            author: 'Edsger W. Dijkstra',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            author: 'Edsger W. Dijkstra',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            author: 'Edsger W. Dijkstra',
            title: 'Canonical string reduction',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            author: 'Robert C. Martin',
            title: 'First class tests',
            likes: 10,
            __v: 0
        }
    ]

    test('of empty list is undefined', () => {
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, undefined)
    })

    test('when list has only one blog, equals the author of that blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('when list has multiple blogs, equals the author with the most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 12 })
    })
})