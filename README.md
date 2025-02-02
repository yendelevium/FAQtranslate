# FAQtranslate

An FAQ translator which dynamically translates FAQs to your desired language. It leverages the google cloud translation API for translation and fast retrieval via Redis. It has a sleek admin dashboard to manage FAQs as well.

#### Tech Stack 
```
- Node.js (Express)
- React
- MongoDB
- Redis (Caching)
- Jest and Supertest (Testing)
```


## Installation and Setup

#### Prerequisites
The following tools/technologies must be installed in your pc to ensure a smooth experience for installation and deployment of this project
- npm 
- node.js
- mongoDB
- redis

#### Installation steps
1. Clone the repository
```bash
  git clone https://github.com/yendelevium/FAQtranslate.git
```

2. cd into the `FAQtranslate`
```bash
cd FAQtranslate
```

3. Create a `.env` file at the root of the project, and add the folllowing variables
```env
API_KEY=your_api_key
NODE_ENV=production
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
MONGO_URI="mongodb://localhost:27017/dbname"
PORT=8080
```

4. Run the build command to install all the dependencies
```bash
npm run build
```

5. Run the project
```bash
npm run start
```

The project is now running on `http://localhost:PORT`
You can either type the URL in you preferred web-browser, or `Ctrl` + `Click` the URL in the terminal after running this instruction

## Docker Support
This project includes **Docker** and **Docker Compose** support for containerization.
1. Change your `.env` file to conform to docker images of mongoDB and redis
```env
API_KEY=your_api_key
NODE_ENV=production
REDIS_HOST=redis <=HERE
REDIS_PORT=6379
MONGO_URI="mongodb://mongodb:27017/FAQtranslate" <=HERE
PORT=8080
```

2. Run `docker compose` command
```bash
docker-compose up -d --build 
```
The project is now running on `http://localhost:PORT`
You can either type the URL in you preferred web-browser, or `Ctrl` + `Click` the URL in the terminal after running this instruction

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

#### Get all FAQs(in english)

```http
  GET /api/faq
```
This will return an array of JSON object with all the FAQs
#### Get all FAQs(translated)

```http
  GET /api/faq?lang=<code>
```

| QueryString | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lang`      | `string` | The language code. You can see all available codes [here](https://cloud.google.com/translate/docs/languages) |

This will return an array of JSON object with all the FAQs translated in your respective language

#### Add an FAQ
```http
  POST /api/faq/admin
```
Your body must be of Content-Type application/json, with the fields: question and answer
```
{
    "question": "Are you going to read this in the SEA of submissions?",
    "answer": "Thank you for taking the time to checkout my project. I learnt a lot while makeing this(redis from scratch, jest and supertest, and docker)"
}
```
This will add the FAQ (translated to english from the source language) to the database
#### Delete an FAQ
```http
  DELETE /api/faq/admin/:faqId
```

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `faqId`      | `string` | The `_id` of the FAQ you want to delete  |

This will delete the particular FAQ from the database
## Contributing
Thank you for your interest in contributing to this project! To ensure a smooth and effective review process, please follow these guidelines when submitting a pull request (PR).

### Forking Model Workflow

1. **Fork the Repository**: Create your own fork of the Rodent repository on GitHub.
2. **Clone Your Fork**:

    ```sh
    git clone https://github.com/yendelevium/FAQtranslate.git
    cd FAQtranslate
    ```

3. **Add Upstream Remote**: Add the original repository as a remote named `upstream`.

    ```sh
    git remote add upstream https://github.com/yendelevium/FAQtranslate.git
    ```

4. **Fetch Upstream Changes**: Fetch the latest changes from the upstream repository.

    ```sh
    git fetch upstream
    ```

5. **Rebase Your Fork**: Rebase your fork's main branch with the upstream main branch.

    ```sh
    git checkout main
    git pull --rebase upstream main
    ```

6. **Create a Branch**: Create a new branch for your feature or bugfix.

    ```sh
    git checkout -b feature/api-module
    ```

7. **Make Your Changes**: Write your code and tests.
8. **Run Tests**: Ensure all tests pass before committing.

    ```sh
    npm run test
    ```

9. **Commit Your Changes**: Commit your changes with a descriptive message.

    ```sh
    git add .
    git commit -a 
    ```

10. **Push to Your Fork**: Push your branch to your fork on GitHub.

    ```sh
    git push origin feature/api-module
    ```

11. **Create a Pull Request**: Go to the original repository on GitHub and create a pull request from your fork.

### Pull Request Checklist

Before submitting your pull request, please ensure the following:

1. **Descriptive Title and Description**: Provide a clear and concise title and description for your pull request. Explain the purpose and motivation behind your changes.
2. **Reference Issues**: If your pull request addresses any open issues, reference them in the description using the format `Fixes #issue_number` or `Updates/Related to #issue_number`.
3. **Code Style**: Ensure your code adheres to the project's coding standards and style guidelines.
4. **Tests**: Add tests for your changes and ensure all existing tests pass.
5. **Documentation**: Update any relevant documentation to reflect your changes.
6. **Review Your Changes**: Double-check your code for any errors or improvements before submitting.
7. **Follow [Git Hygiene](https://cbea.ms/git-commit/)**

### During the Review Process

1. **Be Responsive**: Be available to respond to any questions or feedback from the reviewers.
2. **Make Necessary Changes**: If requested, make the necessary changes and update your pull request.
3. **Keep Commits Clean**: Squash or rebase your commits if necessary to keep the commit history clean and meaningful.
