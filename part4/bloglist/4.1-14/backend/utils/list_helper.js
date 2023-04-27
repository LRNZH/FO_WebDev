const dummy = (blogs) => {
  return 1
}

const totalLikes1 = (listWithOneBlog) => {
  return listWithOneBlog.reduce((total, list) => total + list.likes, 0)
}

const totalLikes = (posts) => {
  return posts.reduce((total, post) => total + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikes = -1
  let maxLikesBlog = null

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      maxLikesBlog = blog
    }
  })

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const blogCount = {}
  blogs.forEach(blog => {
    if (blog.author in blogCount) {
      blogCount[blog.author] += 1
    } else {
      blogCount[blog.author] = blog.blogs
    }
  })

  const topAuthor = Object.keys(blogCount).reduce((a, b) => blogCount[a] > blogCount[b] ? a : b)

  return {
    author: topAuthor,
    blogs: blogCount[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const likesByAuthor = blogs.reduce((acc, blog) => {
    if (blog.author in acc) {
      acc[blog.author] += blog.likes
    } else {
      acc[blog.author] = blog.likes
    }
    return acc
  }, {})

  const [author, likes] = Object.entries(likesByAuthor).reduce(
    (acc, [author, likes]) => (likes > acc[1] ? [author, likes] : acc),
    ['', 0]
  )

  return { author, likes }
}



module.exports = {
  dummy,  totalLikes1, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

