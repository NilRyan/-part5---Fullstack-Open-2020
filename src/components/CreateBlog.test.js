import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import CreateBlog from './CreateBlog';

describe('Create a blog', () => {
  test('test if new blog matches', () => {
    const createBlog = jest.fn();
    const newBlog = jest.fn();
    const component = render(
      <CreateBlog
        handleSubmitBlog={createBlog}
        newBlog={newBlog}
      />
    )

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const blog = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'Mockingjay'}
    })

    fireEvent.change(author, {
      target: { value: 'Neil'}
    })

    fireEvent.change(url, {
      target: { value: 'mockingjay.com'}
    })

    fireEvent.submit(blog)
    expect(title).toHaveValue('Mockingjay');
    expect(author).toHaveValue('Neil');
    expect(url).toHaveValue('mockingjay.com');

  })

})
