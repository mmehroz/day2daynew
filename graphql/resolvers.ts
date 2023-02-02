export const resolvers = {
  Query: {
    users: () => {
      return [
        {
          id: "1",
          name: "Harisiqbal",
          email: "haris6072@gmail.com"
        }
      ]
    }
  }
}