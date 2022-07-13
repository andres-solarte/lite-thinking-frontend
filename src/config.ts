export const Amplify = {
  API: {
    endpoints: [
      {
        name: 'CompanyAPI',
        endpoint: process.env.REACT_APP_API_BASE_URL,
      }
    ]
  }
}
