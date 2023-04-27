const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('totallikes1', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  it('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes1(listWithOneBlog)).toBe(5)
  })
})


describe('totallikes', () => {
  const posts = [    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },    {
    title: 'Macbeth',
    author: 'William Shakespeare',
    url: 'www.cambridge.com',
    likes: 78,
    id: '6448e96fc3f364d4fd73cca4'
  },
  {
    title: 'Love is blind',
    author: 'Chimamanda Adichie',
    url: 'www.unn.com',
    likes: 45,
    id: '6448e992c3f364d4fd73cca6'
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  } ]


  it('should return 0 when given an empty array', () => {
    expect(listHelper.totalLikes([])).toEqual(0)
  })

  it('should return the total number of likes in the array of blog posts', () => {
    expect(listHelper.totalLikes(posts)).toEqual(133)
  })


})


describe('favoriteblog', () => {


  test('returns an empty object if the list of blogs is empty', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBeNull()
  })

  test('returns the blog with the most likes', () => {

    const blogs = [    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },    {
      title: 'Macbeth',
      author: 'William Shakespeare',
      url: 'www.cambridge.com',
      likes: 78,
      id: '6448e96fc3f364d4fd73cca4'
    },
    {
      title: 'Love is blind',
      author: 'Chimamanda Adichie',
      url: 'www.unn.com',
      likes: 45,
      id: '6448e992c3f364d4fd73cca6'
    },  ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Macbeth',
      author: 'William Shakespeare',
      likes: 78
    })
  })

  test('returns the first blog with the most likes if there are many', () => {
    const blogs = [    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 95,
      __v: 0
    },    {
      title: 'Macbeth',
      author: 'William Shakespeare',
      url: 'www.cambridge.com',
      likes: 78,
      id: '6448e96fc3f364d4fd73cca4'
    },
    {
      title: 'Love is blind',
      author: 'Chimamanda Adichie',
      url: 'www.unn.com',
      likes: 95,
      id: '6448e992c3f364d4fd73cca6'
    },  ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 95,
    })
  })

})

describe('mostBlogs', () => {
  test('returns the author with the most blogs', () => {
    const blogs = [      { author: 'Robert C. Martin', blogs: 1 },      { author: 'Martin Fowler', blogs: 2 },      { author: 'Robert C. Martin', blogs: 2 },      { author: 'Kent Beck', blogs: 1 },      { author: 'Robert C. Martin', blogs: 1 },    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('returns any one of the top bloggers if there are many', () => {
    const blogs = [      { author: 'Robert C. Martin', blogs: 3 },      { author: 'Martin Fowler', blogs: 3 },      { author: 'Kent Beck', blogs: 2 },    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toMatchObject({ author: expect.any(String), blogs: 3 })
  })

  test('returns an empty object if the input array is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})

describe('mostLikes', () => {
  test('returns the author with the most likes', () => {
    const blogs = [      { title: 'Blog 1', author: 'John Doe', likes: 10 },      { title: 'Blog 2', author: 'Jane Doe', likes: 20 },      { title: 'Blog 3', author: 'John Doe', likes: 30 },      { title: 'Blog 4', author: 'Jane Doe', likes: 5 },      { title: 'Blog 5', author: 'John Doe', likes: 15 },    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'John Doe', likes: 55 })
  })

  test('returns any one of the top authors if there are many with the most likes', () => {
    const blogs = [      { title: 'Blog 1', author: 'John Doe', likes: 10 },      { title: 'Blog 2', author: 'Jane Doe', likes: 20 },      { title: 'Blog 3', author: 'John Doe', likes: 30 },      { title: 'Blog 4', author: 'Jane Doe', likes: 5 },      { title: 'Blog 5', author: 'John Doe', likes: 15 },      { title: 'Blog 6', author: 'Jane Doe', likes: 35 },    ]

    const result = listHelper.mostLikes(blogs)
    expect(['John Doe', 'Jane Doe']).toContain(result.author)
    expect([55, 60]).toContain(result.likes)
  })

  test('returns an empty object if the input array is empty', () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({})
  })
})
