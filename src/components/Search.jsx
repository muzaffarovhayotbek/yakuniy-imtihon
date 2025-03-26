import React from 'react';
import { Form } from 'react-router-dom';
import FormInput from './FormInput';

function Search() {
  return (
    <div>
      <Form method="post" className="flex gap-2 max-w-96 w-full mx-auto">
        <FormInput type="text" placeholder="Search" name="search" required />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </Form>
    </div>
  );
}

export default Search;
