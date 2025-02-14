# text-analyzer-tool
This is a web application tool for for large text analyze using Node-Express-TypeScript, MongoDB, Redis



# Text Analyzer

This project provides a set of APIs to analyze text, including word count, character count, sentence count, paragraph count, and finding the longest words.

## Features

- User Signup
- User Login
- User's text store, analyze & manage

- Word count API
- Character count API
- Sentence count API
- Paragraph count API
- Longest words API

## Dependencies
1. Node 12 or later
2. MongoDB 5 or later
3. Redis 3 or later

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.dev` as `.env` Set up MAX_THROTTL_LIMIT (As your preference), MongoDB & Redis connection in `.env`
4. Run the app with `npm run dev`
5. Run the app with `npm run watch` for watch mode
6. Run the app with `npm run build` for build project

## Run Tests
1. Run the app with `npm run watch` for testing


Note: You must set MAX_THROTTL_LIMIT to at least 10 to avoid throttling limitations. By default, it is set to 1, meaning a specific IP can make only one request