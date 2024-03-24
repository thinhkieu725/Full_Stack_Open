const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.waitForSelector('form')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongpassword')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      const testblog = { 
        title: 'test title', 
        author: 'test author', 
        url: 'test url' 
      }
      await createBlog(page, testblog)
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      const testblog = { 
        title: 'test title', 
        author: 'test author', 
        url: 'test url' 
      }
      await createBlog(page, testblog)
      await page.getByText('view').click()
      await page.getByText('like').click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('user can delete a blog', async ({ page }) => {
      const testblog = { 
        title: 'test title', 
        author: 'test author', 
        url: 'test url' 
      }
      await createBlog(page, testblog)
      await page.getByText('view').click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByText('remove').click()
      await expect(page.getByText('test title test author')).not.toBeVisible()
    })

    test('only the user who created the blog can delete it', async ({ page, request }) => {
      const testblog = { 
        title: 'test title', 
        author: 'test author', 
        url: 'test url' 
      }
      await createBlog(page, testblog)
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Another User',
          username: 'anotheruser',
          password: 'anotherpassword'
        }
      })
      await page.getByText('logout').click()
      await loginWith(page, 'anotheruser', 'anotherpassword')
      await page.getByText('view').click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      const testblog1 = { 
        title: 'test title 1',
        author: 'test author 1',
        url: 'test url 1',
      }
      const testblog2 = { 
        title: 'test title 2',
        author: 'test author 2',
        url: 'test url 2',
      }
      const testblog3 = { 
        title: 'test title 3',
        author: 'test author 3',
        url: 'test url 3',
      }
      await createBlog(page, testblog1)
      await createBlog(page, testblog2)
      await createBlog(page, testblog3)
      
      const testBlog1locator = await page.getByText('test title 1 test author 1').locator('..')
      await testBlog1locator.getByRole('button', { name: 'view' }).click()
      await testBlog1locator.getByText('like').click()
      await testBlog1locator.getByText('like').click()

      const testBlog2locator = await page.getByText('test title 2 test author 2').locator('..')
      await testBlog2locator.getByRole('button', { name: 'view' }).click()
      await testBlog2locator.getByText('like').click()

      const testBlog3locator = await page.getByText('test title 3 test author 3').locator('..')
      await testBlog3locator.getByRole('button', { name: 'view' }).click()
      await testBlog3locator.getByText('like').click()
      await testBlog3locator.getByText('like').click()
      await testBlog3locator.getByText('like').click()

      const blogs = await page.locator('.blog').all()
      console.log(blogs)
      await expect(blogs[0]).toHaveText(/test title 3 test author 3/)
      await expect(blogs[1]).toHaveText(/test title 1 test author 1/)
      await expect(blogs[2]).toHaveText(/test title 2 test author 2/)
    })
  })
})