
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    // The promises will be executed in parallel so there's
    // no guarantee that the order will be kept, to guarantee
    // use for example a for...of block
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.status, 200)
    // regex: result contains 'application/json'
    assert(response.type.match(/application\/json/))
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog posts have an id property instead of _id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body
    blogs.forEach(blog => {
      assert.ok(blog.id, 'Blog post should have an id property') // Check if 'id' is defined
      assert.strictEqual(blog._id, undefined, 'Blog post should not have an _id property') // Check '_id' is not present
    })
  })

  // describe('viewing a specific blog', () => {

  //     test('succeeds with a valid id', async () => {
  //         const blogsAtStart = await helper.blogsInDb()
  //         console.log(blogsAtStart);


  //         const blogToView = blogsAtStart[0]
  //         console.log(blogToView);
  //         console.log(blogToView.id);

  //         const resultBlog = await api
  //             .get(`/api/blogs/${blogToView.id}`)
  //             .expect(200)
  //             .expect('Content-Type', /application\/json/)

  //         assert.deepStrictEqual(resultBlog.body, blogToView)
  //     })

  //     test('fails with statuscode 404 if note does not exist', async () => {
  //         const validNonexistingId = await helper.nonExistingId()

  //         await api
  //             .get(`/api/notes/${validNonexistingId}`)
  //             .expect(404)
  //     })

  //     test('fails with statuscode 400 id is invalid', async () => {
  //         const invalidId = '5a3d5da59070081a82a3445'

  //         await api
  //             .get(`/api/notes/${invalidId}`)
  //             .expect(400)
  //     })
  // })
})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    // The promises will be executed in parallel so there's
    // no guarantee that the order will be kept, to guarantee
    // use for example a for...of block
    await Promise.all(promiseArray)
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 25,
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    // The new blog added to the database should be in the postResponse.body
    const addedBlog = postResponse.body

    // Assert that the added blog has the same title, author, url, and likes as the one sent
    assert.strictEqual(addedBlog.title, newBlog.title)
    assert.strictEqual(addedBlog.author, newBlog.author)
    assert.strictEqual(addedBlog.url, newBlog.url)
    assert.strictEqual(addedBlog.likes, newBlog.likes)
  })

  test('succeeds if likes are missing and they should default to 0', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // The new blog added to the database should be in the postResponse.body
    const addedBlog = postResponse.body

    assert.strictEqual(addedBlog.likes, 0)
  })

  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: 'author',
      url: 'url',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})


describe('deletion of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    // The promises will be executed in parallel so there's
    // no guarantee that the order will be kept, to guarantee
    // use for example a for...of block
    await Promise.all(promiseArray)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})



// test('there are two blogs', async () => {
//     const response = await api.get('/api/blogs')

//     assert.strictEqual(response.body.length, initialBlogs.length)
// })



// test('blog without title is not added', async () => {
//     const newBlog = {
//         author: "author",
//         url: "url",
//         likes: 25,
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)

//     const response = await api.get('/api/blogs')

//     assert.strictEqual(response.body.length, initialBlogs.length)
// })


// test('the first blog is from x', async () => {
//     const response = await api.get('/api/blogs')

//     const contents = response.body.map(e => e.author)
//     assert(contents.includes('author name'))
// })





after(async () => {
  await mongoose.connection.close()
})