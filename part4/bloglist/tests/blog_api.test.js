
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
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
        const response = await api.get('/api/blogs');

        const blogs = response.body;
        blogs.forEach(blog => {
            assert.ok(blog.id, 'Blog post should have an id property'); // Check if 'id' is defined
            assert.strictEqual(blog._id, undefined, 'Blog post should not have an _id property'); // Check '_id' is not present
        });
    });

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