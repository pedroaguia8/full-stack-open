
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)



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

// test('there are two blogs', async () => {
//     const response = await api.get('/api/blogs')

//     assert.strictEqual(response.body.length, initialBlogs.length)
// })

// test('a valid blog can be added ', async () => {
//     const newBlog = {
//         title: "title",
//         author: "author",
//         url: "url",
//         likes: 25,
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const response = await api.get('/api/blogs')

//     const titles = response.body.map(r => r.title)

//     assert.strictEqual(response.body.length, initialBlogs.length + 1)

//     assert(titles.includes('title'))
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