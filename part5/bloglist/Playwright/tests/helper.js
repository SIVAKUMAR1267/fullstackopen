const loginWith = async (page, username, password)  => {
  await page.getByPlaceholder('username').fill(username)
  await page.getByPlaceholder('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New Blog' }).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith,createBlog }