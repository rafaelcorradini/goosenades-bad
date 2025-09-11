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
cd csnades-clean
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

## Project Architecture

This project follows Clean Architecture principles, which promotes separation of concerns and dependency inversion. The architecture is organized into the following layers:

### Domain Layer

The domain layer contains the core business logic and entities of the application. It defines interfaces that other layers implement.

- **domain/**: Contains all business entities, use cases, and interfaces
  - **domain/game-map/**: Game map entities and interfaces
  - **domain/nade/**: Grenade entities and interfaces
  - **domain/user/**: User entities and interfaces
  - **domain/errors/**: Error definitions
  - **domain/router/**: Routing interfaces

### Adapters Layer

The adapters layer implements the interfaces defined by the domain layer. It handles external concerns like API communication.

- **adapters/**: Contains implementations of domain interfaces
  - **adapters/game-map/**: Implements GameMapAdapter interface
  - **adapters/nade/**: Implements NadeAdapter interface
  - **adapters/router/**: Implements RouterAdapter interface

### Services Layer

The services layer acts as a bridge between the domain and UI layers. It provides use cases to the UI layer.

- **services/**: Contains service implementations
  - **services/game-map/**: Game map related services
    - **useGameMapList**: Service for listing game maps
    - **useNadeList**: Service for listing nades for a game map
    - **useNadeRate**: Service for rating nades

### UI Layer

The UI layer contains all presentation logic. It's organized into components, containers, and screens.

- **ui/**: Contains all UI-related code
  - **ui/components/**: Reusable UI components (Box, Button, Card, etc.)
  - **ui/containers/**: Container components that connect UI components to services
  - **ui/screens/**: Screen components that represent entire pages

### Common Layer

The common layer contains shared utilities and configurations.

- **common/**: Contains shared utilities
  - **common/api/**: API utilities (Axios client, error handling)
  - **common/query/**: Query utilities (useApiQuery hook)
  - **common/env/**: Environment configuration

## Clean Architecture Benefits

The Clean Architecture approach provides several benefits:

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Dependency Inversion**: High-level modules (domain) don't depend on low-level modules (adapters)
3. **Testability**: Business logic can be tested independently of external dependencies
4. **Flexibility**: Implementation details can be changed without affecting the core business logic
5. **Maintainability**: Code is organized in a way that makes it easier to understand and maintain

## Technology Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool
- **Jest**: Testing framework
- **React Testing Library**: Testing utilities for React
- **Material UI**: UI component library
- **Zustand**: State management
- **React Query**: Data fetching and caching
- **Axios**: HTTP client
