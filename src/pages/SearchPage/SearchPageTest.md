// import React from 'react';
// import { render, waitFor, screen } from '@testing-library/react';
// import fetchMock from 'jest-fetch-mock';
// import { MemoryRouter } from 'react-router-dom';
// import { Search } from './SearchPage';

// describe('Search component', () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });

//   test('should fetch and display movies correctly', async () => {
//     const mockData = {
//       Search: [
//         { imdbID: '1', Title: 'Movie 1' },
//         { imdbID: '2', Title: 'Movie 2' },
//       ],
//       totalResults: 2,
//     };

//     fetchMock.mockResponseOnce(JSON.stringify(mockData));

//     render(
//       <MemoryRouter>
//         <Search />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.stringContaining('https://api.example.com/search?')
//       );

//       expect(screen.getByText('Movie 1')).toBeInTheDocument();
//       expect(screen.getByText('Movie 2')).toBeInTheDocument();
//     });
//   });

//   test('should handle pagination correctly', async () => {
//     const mockData = {
//       Search: [
//         { imdbID: '1', Title: 'Movie 1' },
//         { imdbID: '2', Title: 'Movie 2' },
//       ],
//       totalResults: 10,
//     };

//     fetchMock.mockResponse(JSON.stringify(mockData));

//     render(
//       <MemoryRouter>
//         <Search />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.stringContaining('https://api.example.com/search?')
//       );
//     });

//     const prevButton = screen.getByText('Prev');
//     const nextButton = screen.getByText('Next');

    
//     expect(prevButton).toBeInTheDocument();
//     expect(nextButton).toBeInTheDocument();

   
//     expect(prevButton).toBeDisabled();

  
//     expect(nextButton).not.toBeDisabled();

//     fetchMock.mockResponse(JSON.stringify(mockData));
//     nextButton.click();

//     await waitFor(() => {
//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.stringContaining('https://api.example.com/search?page=2')
//       );
//     });

//     expect(prevButton).not.toBeDisabled();

//     expect(nextButton).not.toBeDisabled();

 
//     fetchMock.mockResponse(JSON.stringify(mockData));
//     prevButton.click();

//     await waitFor(() => {
//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.stringContaining('https://api.example.com/search?page=1')
//       );
//     });

//     expect(prevButton).toBeDisabled();
//   });
// });