import { test, expect } from '@playwright/test';
import { loginWith,createBlog } from './helper';

test.describe('Blog app', () => {
  test.beforeEach(async ({ page,request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'sivakumar',
        username: 'siva',
        password: '123456789'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByPlaceholder('username')).toBeVisible()
    await expect(page.getByPlaceholder('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
  test('Login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'wronguser', 'wrongpassword')
    const errorMessage = await page.getByText('wrong username or password')
    await expect(errorMessage).toBeVisible()
  })
  test('Login succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'siva', '123456789')
    const welcomeMessage = await page.getByText('sivakumar logged-in')
    await expect(welcomeMessage).toBeVisible()
  })
  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'siva', '123456789')
    })
    test('A new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
      const successMessage = await page.getByText("'Test Blog' by Test Author is added to the BlogList")
      await expect(successMessage).toBeVisible()
      const blog = await page.getByText('Test Blog - Test Author')
      await expect(blog).toBeVisible()
    })
    test.describe('when a blog exists', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
      })
      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        const likeButton = page.getByRole('button', { name: 'Like' })
        await likeButton.click()
        const successMessage = await page.getByText("You liked 'Test Blog' by Test Author")
        await expect(successMessage).toBeVisible()
      })
      test('it can be deleted by the creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.once('dialog', dialog => dialog.accept())
        const deleteButton = page.getByRole('button', { name: 'delete' })
        await deleteButton.click()
        const successMessage = await page.getByText('Blog deleted successfully')
        await expect(successMessage).toBeVisible()
      })
      test('it cannot be deleted by another user', async ({ page, request }) => {
        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'anotheruser',
            username: 'another',
            password: '123456789'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'another', '123456789')
        await page.getByRole('button', { name: 'view' }).click()
        const deleteButton = page.getByRole('button', { name: 'delete' })
        await expect(deleteButton).not.toBeVisible()
      })
      test('it can be sorted by likes', async ({ page }) => {
        await createBlog(page, 'Another Blog', 'Another Author', 'http://anotherblog.com')
        await page.getByRole('button', { name: 'view' }).click()
        const likeButton = page.getByRole('button', { name: 'Like' })
        await likeButton.click()
        await page.reload()
        const blogs = await page.locator('.blog')
        const firstBlog = await blogs.nth(0).textContent()
        const secondBlog = await blogs.nth(1).textContent()
        expect(firstBlog).toContain('Test Blog - Test Author')
        expect(secondBlog).toContain('Another Blog - Another Author')
      })
    })
  })
})
