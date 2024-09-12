

const dummy = () => {
  return 1
}


const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {

  if (blogs.length === 0)
    return undefined

  const reducer = (fav, item) => {
    return item.likes > fav.likes
      ? item
      : fav
  }
  const favorite = blogs.reduce(reducer)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}

