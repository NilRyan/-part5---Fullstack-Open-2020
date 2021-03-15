import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders the blog\'s title and author, but not its url or number of likes', () => {
  const blog = {
      title: "hahaha",
      author: "gsa",
      url: "safa.com",
      user: {
      username: "neil",
      name: "Neil Ryan",
      id: "6046dfe700dcb32851e71bd7"
      },
      likes: 0,
      id: "604b6f22d5002721fe9cffd9"
    };

  const user = {
    username: "neil",
    name: "Neil Ryan",
    id: "6046dfe700dcb32851e71bd7"
  }
   

  const component = render(
      <Blog
        blog={blog}
        user={user} 
      />
    )
  
  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')
  
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
  
  expect(component.container).toHaveTextContent(
      'hahaha')
  expect(component.container).toHaveTextContent(
    'gsa')

})
