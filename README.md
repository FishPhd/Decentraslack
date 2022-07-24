# Forked from [Trust Enterpises serverless-api](https://github.com/trustenterprises/hedera-serverless-api/issues)

## Developing and testing locally

- Setup your environment variables
- Run the linter and basic tests

```
yarn lint
yarn test
```

If you want to run all the tests, including the e2e tests for your config use:

```
yarn test:all
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

Have a look at the [REST API documentation](https://docs.trust.enterprises/rest-api/overview) to see how you can start sending requests to your new shiny client.
