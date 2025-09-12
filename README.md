# CS Nades - Clean Architecture

This project is a web application for Counter-Strike grenade spots and strategies, built using Clean Architecture principles.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd goosenades-bad
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following content:
```
API_URL=<your-api-url>
```

### Running the Project

#### Development Mode
```bash
yarn dev
# or
npm run dev
```
This will start the development server at `http://localhost:5173` (default Vite port).

#### Building for Production
```bash
yarn build
# or
npm run build
```

#### Preview Production Build
```bash
yarn preview
# or
npm run preview
```

### Testing

#### Run Tests
```bash
yarn watch
# or
npm run watch
```

#### Test Coverage
```bash
yarn coverage
# or
npm run coverage
```
